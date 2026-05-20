# CLAUDE.md — toyosa-directorio (sub-project del engagement Toyosa)

## 0. Herencia

Este archivo hereda **todas** las reglas de `/home/user/General/toyosa/CLAUDE.md` (engagement-level). Lo que sigue son las reglas específicas del sub-proyecto **toyosa-directorio** (sistema de deck mensual con agentes IA).

## 1. Overview & Non-goals

Generación automatizada del deck mensual del directorio de Toyosa S.A. mediante:
- 7 agentes IA especializados (Económico · Industria · Ventas · Inventario · Financiero · Márgenes · Crédito)
- 1 orchestrator que sequencia el DAG mensual y detecta puntos clave
- 1 chat agent conversacional (interfaz primaria del GG y validadores)
- 1 renderer markdown → HTML interactivo (Chart.js + Leaflet)

**Alcance MVP (30 días):** Solo Toyosa Holding. Intermex y Crown post-MVP.

**Non-goals MVP:**
- No reemplazar Tableau (Tableau-native first per engagement §1)
- No tocar Alchemy ERP en escritura
- No analizar separación Real Estate en profundidad (solo framing slide 14)
- No construir el What-If Engine completo (solo 2 pre-cargados + chat ad-hoc)
- No entregar Intermex / Crown deck en este MVP

## 2. Estructura del deck (LOCKED — ver `orchestrator/deck-spec.md`)

15 slides en 5 FASES + 5 sub-dashboards. Cada slide = 1 punto clave en header + data abajo + footer con implicación/acción. Histórico limitado a 3 años + YTD.

## 3. Architecture

Ver `README.md` y `orchestrator/run-monthly.md` para detalle. Cinco capas:
1. **Chat agent** — interfaz conversacional (lenguaje natural)
2. **Orchestrator** — DAG mensual + detección punto clave
3. **7 agentes** — especialistas por dominio
4. **Verified-numbers** — cifras lockadas inmutables por periodo
5. **Renderer** — markdown → HTML

## 4. Convenciones de archivos

- `verified-numbers/YYYY-MM/locked.md` — cifras del periodo, inmutables después de lock
- `verified-numbers/YYYY-MM/sources.md` — mapa cifra → fuente (tab + celda o doc + página)
- `drafts/YYYY-MM/slide-NN.md` — markdown de cada slide (header punto clave, data, footer)
- `drafts/YYYY-MM/state.json` — estado por slide (`DRAFT-R1` / `DRAFT-R2` / `DRAFT-R3` / `APPROVED` / `LOCKED`)
- `audit-log/YYYY-MM/chat-history.jsonl` — log de cada interacción del chat (timestamp, usuario, tool, diff)
- `final/YYYY-MM/deck.html` — render final (lockado)
- `final/YYYY-MM/deck.pdf` — backup PDF (post-lock)

## 5. Roles y validadores

| Slide | Generador | Validador primario | Validador financiero |
|---|---|---|---|
| 0 Cover + Amazing Facts | Orchestrator | Edwin | — |
| 1 Conclusión GG | Chat Agent | GG | — |
| 2 Macro Bolivia | AI Económico | Juan Carlos | Juan Carlos |
| 3 Mercado automotriz | AI Industria | Edwin | — |
| 4 Benchmark industria | AI Industria | Juan Carlos | Juan Carlos |
| 5 Ventas Holding YTD | AI Ventas | GG | Juan Carlos |
| 6 Drill por marca | AI Ventas | GG | — |
| 7 Drill sucursal/dealer | AI Ventas | GG | — |
| 8 Rolling forecast | AI Ventas | Juan Carlos | Juan Carlos |
| 9 Salud inventario | AI Inventario | Rudy | — |
| 10 P&L resumen | AI Financiero | Juan Carlos | Juan Carlos |
| 11 Márgenes | AI Márgenes | Juan Carlos | Juan Carlos |
| 12 Balance + crédito | AI Crédito | Juan Carlos | Juan Carlos |
| 13 What-Ifs pre-cargados | Chat Agent | Edwin | — |
| 14 Decisión estructural RE | AI Financiero | Edwin / Boris | — |
| 15 Puntos a trabajar | Orchestrator | Edwin | — |

## 6. Hard rules específicas del sub-proyecto

Heredan + añaden a engagement §10:

1. **Cada cifra rastreable.** Toda cifra en el deck DEBE tener su entry en `verified-numbers/YYYY-MM/sources.md`. Output `DATA GAP: [fuente] no accesible` si falta — nunca estimar.
2. **Override del chat va a audit.** Cuando el GG dice "usa Y en vez de X", se registra en `audit-log/` con timestamp, usuario, justificación, diff. Juan Carlos puede reconciliar vs EERR en cualquier momento.
3. **Cap de 3 revisiones por slide.** Después de `DRAFT-R3`, requiere unlock manual de Edwin (`/unlock-slide NN`).
4. **Lock = immutable.** `/lock-deck periodo=YYYY-MM` freeza todo. Cualquier edit posterior crea nueva versión `deck-vN.html`.
5. **Excluir Real Estate de cifras automotrices** — siempre. Si una fuente mezcla, el agente debe restar explícitamente y dejar evidencia.
6. **Forex Intermex no recurrente.** No aplica directo al deck Holding, pero si se cita el grupo o si Intermex aparece como división, siempre flagear adjusted Net $945K vs headline $2.02M (engagement §6).
7. **No salir del español-Bolivia.** Sin "great question", sin hedging, sin coloquialismos chilenos/mexicanos.
8. **Edwin Saavedra ≠ "Jr."** En slides, drafts, output del chat, README, código, audit-log. Nunca.

## 7. Commands clave (MVP semana 3-4)

```bash
# Correr ciclo mensual end-to-end
/directorio-mensual periodo=2026-06

# Refresh data sources
/directorio-mensual periodo=2026-06 --refresh

# Lock + render final
/lock-deck periodo=2026-06

# Unlock specific slide for further edit
/unlock-slide periodo=2026-06 num=8

# Abrir chat con el deck del periodo
/chat-deck periodo=2026-06
```

## 8. Capabilities

- **MCPs:** `tableau-mcp`, `google-drive`, `gmail`, `scheduled-tasks`, `poler-crm` (heredados del engagement). Pending: Alchemy MCP custom (TBD W2).
- **Skills heredados:** `pre-diagnostico-empresa` (B|P methodology), `data:analyze`, `data:sql-queries`, `data:validate-data`, `finance:variance-analysis`.
- **Web fetch:** INE Bolivia, BCB, IMF, World Bank, ANCB para macro/industria.

## 9. Canary

Primera respuesta en sesión nueva debe incluir:
**"Intermex es Toyosa · Edwin Saavedra (sin Jr.) · español-Bolivia · directorio-15slides"**

## 10. Learnings

Tags `[FAIL]` / `[WIN]` / `[FAST]`. Append en cada error, éxito o speedup.

- 2026-05-19 [START]: Kickoff con Edwin / Boris / Juan Carlos / Israel / Manuel. 30-día target. Acordados 3 agentes en sesión (Económico, Industria, Financiero); plan B|P expande a 7 para cubrir Ventas / Inventario / Márgenes / Crédito sin solapar. Validar con Edwin en W1 sync 26-Mayo.
