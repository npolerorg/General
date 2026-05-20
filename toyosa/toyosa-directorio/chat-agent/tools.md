# Chat Agent — Tools

## Schema

Cada tool expone:
- `name` — identificador
- `description` — qué hace (visible al modelo)
- `params` — argumentos requeridos
- `returns` — efecto esperado
- `audit_required` — si deja entry en chat-history.jsonl
- `permission` — quién puede invocarlo

## Tools

### `update-forecast`

```yaml
description: Ajusta el rolling forecast con un delta porcentual sobre PY, budget o run-rate.
params:
  delta: string  # "+10%", "-5%", "$120M"
  scope: enum [YE, Q3, Q4, "rest-of-year"]
  base: enum [PY, budget, run-rate]  # default: PY
  justification: string  # obligatoria
returns:
  slides_affected: [8, 5]  # rolling forecast + YTD recalc
  new_state: DRAFT-RX
audit_required: true
permission: [Edwin, GG, Juan Carlos]
```

### `propose-ideas`

```yaml
description: Genera lista priorizada de ideas sobre un tema (ventas, márgenes, inventario, etc.). NO modifica slides hasta confirmación.
params:
  tema: string  # "ventas de eléctricos", "rotación BYD", "margen Crown"
  contexto_adicional: string  # opcional
  cantidad: int  # default 5
returns:
  ideas: [{idea, impacto_estimado, esfuerzo, prioridad}]
  oferta_insertar: bool  # si true, ofrece agregar como punto a trabajar en slide 15
audit_required: false (hasta que se inserte)
permission: [Edwin, GG, Juan Carlos, Boris]
```

### `override-number`

```yaml
description: Reemplaza una cifra específica en un slide. Justificación obligatoria.
params:
  slide: int  # 0-15
  metrica: string  # "Toyota YoY", "EBITDA YTD"
  valor_nuevo: string  # "+8.2%", "$15.2M"
  justificacion: string  # obligatoria, mínimo 20 chars
returns:
  prev_value: string
  new_value: string
  audit_id: string
  new_state: DRAFT-RX
audit_required: true
permission_por_slide:  # ver chat-agent/CLAUDE.md tabla permisos
  default: [Edwin]
  slides_1_5_6_7: [Edwin, GG]
  slides_2_4_8_10_11_12: [Edwin, Juan Carlos]
  slide_9: [Edwin, Rudy]
warnings:
  - Si cifra viene de EERR auditado (Oñate CMF #77), pedir confirmación explícita.
  - Si cifra rastrea a Tableau/Alchemy, advertir que el override no se reflejará al re-fetch sin --refresh.
```

### `toggle-slide`

```yaml
description: Muestra u oculta un slide del deck.
params:
  slide: int
  visible: bool
returns:
  new_state: HIDDEN | DRAFT-RX
audit_required: true
permission: [Edwin]  # solo Edwin puede ocultar slides
```

### `explain`

```yaml
description: Descomposición de una métrica (drivers). Llama al agente owner del slide para narrativa + chart.
params:
  metrica: string  # "costo financiero", "margen Crown", "EBITDA"
  periodo: string  # YYYY-MM
  profundidad: enum [headline, detail, deep-dive]  # default: detail
returns:
  drivers: [{driver, contribucion_pp, fuente}]
  chart_propuesto: string  # opcional, si profundidad >= detail
  narrativa: string
audit_required: false
permission: [Edwin, GG, Juan Carlos, Boris, Rudy]
```

### `add-action-item`

```yaml
description: Agrega un punto a trabajar al slide 15.
params:
  texto: string  # qué hay que hacer
  owner: string  # nombre del responsable
  fecha_compromiso: string  # ISO YYYY-MM-DD
  prioridad: enum [alta, media, baja]  # default media
returns:
  slide_15_updated: true
  new_state: DRAFT-RX
audit_required: true
permission: [Edwin, GG, Juan Carlos]
```

### `what-if`

```yaml
description: Calcula impacto de un escenario hipotético. Propone insertar resultado en slide 13.
params:
  escenario: string  # "precio +5% Bolivia", "mix shift +20% Crown", "tipo cambio paralelo +10%"
  alcance: enum [revenue, margen, cash, integral]  # default integral
returns:
  impacto: {revenue: string, margen: string, ebitda: string, cash: string}
  supuestos: [string]  # qué asume el cálculo
  oferta_insertar_slide_13: bool
audit_required: false (hasta insertar)
permission: [Edwin, GG, Juan Carlos]
note: "MVP soporta what-ifs simples lineales. Engine completo viene post-MVP."
```

### `lock-deck`

```yaml
description: Freeza el deck del periodo, renderiza HTML final, genera PDF backup.
params:
  periodo: string  # YYYY-MM
  forzar: bool  # default false. Si true, lockea aun con slides en DRAFT
returns:
  estado: LOCKED
  archivo_html: final/{periodo}/deck.html
  archivo_pdf: final/{periodo}/deck.pdf
audit_required: true
permission: [Edwin]
warnings:
  - Si no todos los slides están APPROVED, pedir confirmación.
  - Post-lock cualquier edit crea deck-v2.html.
```

### `unlock-slide`

```yaml
description: Devuelve un slide a estado editable (DRAFT-R3 → DRAFT-R4, o LOCKED → DRAFT).
params:
  slide: int
  justificacion: string  # obligatoria
returns:
  prev_state: APPROVED | LOCKED | DRAFT-R3
  new_state: DRAFT-R4
audit_required: true
permission: [Edwin]
```

### `refresh-source`

```yaml
description: Re-query a una fuente específica (Tableau, Alchemy, INE, BCB, etc.).
params:
  fuente: enum [tableau, alchemy, ine, bcb, ancb, drive-excel, all]
  agente_afectado: string  # opcional, si refresh es scoped a un agente
returns:
  cifras_actualizadas: [{key, prev, new}]
  slides_marcados_stale: [int]  # slides que dependen de la cifra cambiada
audit_required: true
permission: [Edwin, Juan Carlos]
```

## Reglas de invocación

1. **Confirmación explícita** para tools con `audit_required: true` y `permission` restringido.
2. **Dry-run** opcional en `update-forecast`, `override-number`, `what-if` — el chat muestra el cambio propuesto antes de aplicar.
3. **Re-render incremental.** Solo slides afectados se regeneran; el resto queda intacto.
4. **Conflict resolution.** Si dos usuarios editan el mismo slide simultáneamente, last-write-wins con notificación al primer editor.

## Tools que NO existen (intencionalmente)

- `delete-slide` — los slides del deck-spec son lockados. Solo `toggle-slide` para ocultar.
- `add-slide` — la estructura es fija. Variantes vienen en sub-dashboards o anexos.
- `change-validator` — los validadores están en deck-spec.md, no modificables vía chat.
- `export-data` — no permitir extracción de cifras vía chat (data residency rule).
