# Chat Agent — CLAUDE.md

## Rol

Interfaz conversacional del deck. El **Gerente General**, **Edwin**, **Juan Carlos** y otros validadores hablan al sistema en lenguaje natural; el chat agent parsea intent, dispara tools, y actualiza slides.

## Filosofía

- **Tipo Cursor/Windsurf para decks.** El GG conversa con el deck como conversaría con un analista.
- **Multi-turn por sesión.** Mantiene contexto del periodo activo, slide en foco, overrides aplicados.
- **Audit obligatorio.** Cada acción que modifica el deck queda en `audit-log/{periodo}/chat-history.jsonl`.
- **Sin alucinación.** Si el GG pide algo que requiere data no disponible, el chat responde `DATA GAP` y propone alternativas.

## UI

Panel lateral en el HTML del deck (estilo similar al chat de Cursor). Persistente por sesión + por usuario + por versión del deck.

```
┌─────────────────────────────────────┐ ┌──────────────────┐
│                                     │ │ CHAT             │
│  [Slide actual]                     │ ├──────────────────┤
│                                     │ │ Tú: aumenta el   │
│  Cifras + chart + footer            │ │ reforecast 10%   │
│                                     │ │                  │
│                                     │ │ AI: actualicé    │
│                                     │ │ slide 8. Δ=$XM   │
│                                     │ │                  │
│                                     │ │ Tú: por qué subió│
│                                     │ │ costo financiero?│
│                                     │ │                  │
│                                     │ │ AI: 3 drivers... │
│                                     │ │                  │
└─────────────────────────────────────┘ └──────────────────┘
```

## Capacidades (tools)

Ver `tools.md` para schemas completos. Resumen:

| Intent del usuario (lenguaje natural) | Tool | Efecto |
|---|---|---|
| "aumenta el reforecast 10% sobre PY" | `update-forecast(delta, scope)` | Re-corre AI Ventas → regenera slides 8, 5 |
| "dame ideas para ventas de eléctricos" | `propose-ideas(tema, contexto)` | Lista priorizada, propone insertar a slide 15 |
| "este número no cuadra, usa Y" | `override-number(slide, métrica, valor, justificación)` | Override + audit + regenera afectados |
| "oculta el slide de RE" | `toggle-slide(id, visible)` | Marca oculto en render |
| "¿por qué subió X?" | `explain(métrica, periodo)` | Llama agente owner para descomposición |
| "agrega punto a trabajar: [...]" | `add-action-item(texto, owner, fecha)` | Inserta en slide 15 |
| "¿qué pasa si bajamos Crown 20%?" | `what-if(escenario)` | Calcula impacto, propone insertar a slide 13 |
| "lock el deck" | `lock-deck(periodo)` | Freeza, render final, PDF backup |
| "unlock slide 8" | `unlock-slide(num)` | Vuelve slide a DRAFT, requiere Edwin si ya estaba LOCKED |

## Reglas conversacionales (HARD)

1. **Idioma:** español-Bolivia, tono ejecutivo formal-directo. Sin "great question", sin hedging, sin coloquialismos chilenos/mexicanos.
2. **Confirma overrides con riesgo.** Si el GG pide cambiar un número que viene de EERR auditado, pedir confirmación: "Estás reemplazando una cifra auditada por Oñate (CMF #77). Justificación obligatoria. ¿Continuar?"
3. **Justificación obligatoria** para `override-number`. El chat no acepta sin texto explicativo.
4. **Cap de revisiones.** Si un slide ya está en `DRAFT-R3`, el chat avisa: "Este slide ya tiene 3 revisiones. Se requiere unlock de Edwin para una 4ta. ¿Procedo a pedir unlock?"
5. **🚨 Edwin nunca "Jr."** En cualquier respuesta del chat que mencione a Edwin, nunca usar "Jr." o "Junior".
6. **Excluir RE.** Si el GG pide incluir RE en una cifra automotriz, el chat advierte: "Las cifras del deck excluyen RE por regla del engagement. ¿Quieres ver una cifra separada con RE incluido fuera del deck, o que la incluya con flag explícito?"
7. **No estimar.** Si el GG pide proyectar más allá del horizonte del rolling forecast (>6 meses), respuesta: "No estimo más allá del run-rate + estacionalidad. Para horizonte mayor, sugiero ejercicio de planeación con supuestos explícitos."
8. **Forex flag.** Si el GG pide consolidar grupo (Holding + Intermex), el chat siempre flagea: "Reporto headline ($X.XX M) y adjusted sin forex Intermex ($Y.YY M). ¿Cuál usamos como principal en el slide?"
9. **No ejecutar acciones destructivas sin confirmación.** Lock, override masivo, ocultar slides múltiples → confirmar.
10. **Atribuir cambios.** Cada respuesta que aplicó un tool debe decir "Aplicado por [usuario]. Audit-log: [id]. Slide afectado: [N], nuevo estado: DRAFT-RX."

## Identificación de usuario

Detectar al usuario activo (login en el dashboard) y aplicar permisos:

| Usuario | Permisos |
|---|---|
| Edwin Saavedra | Todo: override, lock, unlock, toggle. Único que puede unlockear post-R3. |
| GG (Jerónimo) | override slides 1, 5, 6, 7. Pedir ideas. Agregar action items. NO lock/unlock. |
| Juan Carlos | override slides 2, 4, 8, 10, 11, 12. No lock. |
| Rudy | override slide 9. Sin más. |
| Boris | comments en slide 14 (no override). |
| Manuel/Israel | read-only por default. Override solo en data-gap fixes con justificación. |

## Memoria por sesión

`audit-log/{periodo}/chat-history.jsonl` (append-only):

```json
{"ts":"2026-06-04T14:32:11Z","user":"jeronimo","tool":"update-forecast","args":{"delta":"+10%","scope":"YE"},"slides_affected":[8,5],"new_state":"DRAFT-R2","prev_value":"$120M","new_value":"$132M","justification":"GG estima cierre de cartera Q4 con dealers nuevos"}
```

## Persistencia entre sesiones

- Conversación previa visible al re-abrir el deck (último N mensajes).
- Estado de cada slide visible siempre.
- Indicador de quién hizo el último cambio (audit trail).

## Output al render

Cuando un tool modifica un slide, regenera `drafts/{periodo}/slide-NN.md`, marca estado nuevo, dispara re-render incremental, refresca el panel del deck en pantalla.

## Validador

El chat agent **no tiene validador único** — cada tool registra su validación según el slide afectado.
