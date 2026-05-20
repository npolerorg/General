# Punto Clave — Reglas de detección

El orchestrator escanea outputs de los 7 agentes y promueve un finding al header (stitle) de una slide si **cumple alguna** de las siguientes reglas. Múltiples findings en una slide deben **partir en slides separadas** (regla del usuario: un punto = una slide).

## Reglas

| # | Regla | Umbral | Aplica a |
|---|---|---|---|
| 1 | Variance ≥ ±10% vs PY | absoluto 10% | Slides 5, 6, 7, 10, 11 (per-brand requirement explícito del usuario) |
| 2 | Variance ≥ ±10% vs budget | absoluto 10% | Slides 5, 6, 7, 8, 10 |
| 3 | Trend reversal | YTD signo opuesto al último mes (ej. YTD +5%, mes -8%) | Slides 7, 8 |
| 4 | Aging crítico inventario | SKU > 180d | Slide 9 |
| 5 | Crédito idle | >50% de líneas no utilizadas | Slide 12 |
| 6 | Benchmark gap | >5 pp vs óptimo industria | Slide 4 |
| 7 | Macro flag | brecha tipo cambio paralelo/oficial >10% **o** reservas BCB caída >10% MoM | Slide 2 |
| 8 | Forex flag | si se reporta Net consolidado del grupo incluyendo Intermex, siempre flag forex no recurrente | Slide 10 |

## "Amazing Facts" (Slide 0)

El orchestrator selecciona top 5 findings por **ranking de impacto:**

`impacto = peso_categoría × |variance_absoluto| × signo_dirección`

| Categoría | Peso |
|---|---|
| Variance financiera (Net, EBITDA, GP) vs PY/budget | 1.0 |
| Variance ventas (unidades, facturación) vs PY/budget | 0.9 |
| Variance por marca top-3 | 0.8 |
| Aging inventario crítico | 0.7 |
| Crédito idle / oportunidad ahorro | 0.6 |
| Macro flag | 0.5 |
| Benchmark gap | 0.4 |

Empate → desempate por **recencia del cambio** (cambio del mes pesa más que cambio acumulado YTD).

## Output esperado por agente

Cada agente debe emitir, además del contenido del slide, un JSON con findings:

```json
{
  "agente": "ai-ventas",
  "periodo": "2026-06",
  "findings": [
    {
      "id": "ventas-toyota-yoy",
      "regla": 1,
      "metric": "Toyota unidades YoY",
      "value": "+5.4%",
      "threshold": "±10%",
      "trigger": false,
      "narrativa": "Toyota crece 5.4% YoY YTD, dentro de banda"
    },
    {
      "id": "ventas-coaster-yoy",
      "regla": 1,
      "metric": "Coaster unidades YoY",
      "value": "+173%",
      "threshold": "±10%",
      "trigger": true,
      "narrativa": "Coaster +173% YoY Ene-Abr — driver de mix shift"
    }
  ]
}
```

El orchestrator consolida los `trigger: true` y aplica el ranking de impacto.

## Reglas de exclusión

- **Real Estate:** cualquier cifra que incluya RE no entra al ranking de amazing facts del deck Holding.
- **Forex Intermex no recurrente:** si el agente Financiero emite Net consolidado del grupo, debe emitir **dos findings paralelos**: uno con headline ($2.02M con flag) y otro adjusted ($945K sin forex).
- **Findings sin fuente:** todo finding debe traer su `source` (verified-numbers entry). Si falta, no entra al ranking → output `DATA GAP`.
