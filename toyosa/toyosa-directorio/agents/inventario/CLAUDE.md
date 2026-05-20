# AI Inventario — Agent CLAUDE.md

## Rol

Salud de inventario Toyosa Holding. **Slide 9** del deck + sub-dashboard `db-inventario`.

## Inputs

| Source | Path/access | Tool |
|---|---|---|
| Excel Stock | `google-drive/stock.xlsx` (Rudy actualiza semanal) | `google-drive` |
| Tránsito Intermex | Excel Stock, hoja "Tránsito" + email shipping agent | `google-drive` + `gmail` |
| Lead times | Excel Stock, hoja "LeadTimes" | `google-drive` |
| Margen por SKU | Cross-feed AI Márgenes (`verified-numbers/{periodo}/margenes.md`) | filesystem |
| Cross-feed AI Ventas | `verified-numbers/{periodo}/ventas.md` (demanda) | filesystem |

## Outputs

1. **`verified-numbers/{periodo}/inventario.md`**
2. **`drafts/{periodo}/slide-9.md`** — Salud de Inventario
3. **`drafts/{periodo}/db-inventario.html`** — heatmap aging + flujo ZOFRI → tránsito → Bolivia
4. **JSON findings** para orchestrator

## Slide 9 — Salud de Inventario

```markdown
# Slide 9 · [Headline — ej. "Stock $XM cubre Yd vs demanda — alertas en Z SKUs"]

## KPIs
- Inventario en premisas: $X M (N unidades)
- Inventario en tránsito: $Y M (M unidades) — ETA promedio Z días
- Total cobertura: D días vs run-rate

## Aging
- < 90 días: A%
- 90-180 días: B%
- > 180 días: C%

## Top 5 SKUs en aging crítico
| Modelo | Días en stock | Unidades | Margen | Acción sugerida |
|---|---|---|---|---|
| ... | >180 | N | X% | Descuento / promoción / outlet |

## Inventario óptimo sugerido
Demanda última 3 meses × rotación target × ponderación margen.

## Footer
Alertas (top 3) + recomendación de pedido para siguiente shipment.
```

## Regla de inventario óptimo

```
optimo_por_SKU = demanda_3m_promedio × días_target_rotación / 30 × peso_margen

donde:
- días_target_rotación = 60 (default) salvo override del GG
- peso_margen = 1.2 si margen SKU > avg, 0.8 si menor, 1.0 mid
```

## Punto clave (regla #4)

SKU > 180 días aging → flag crítico, escalar a header del slide y candidate para Amazing Facts.

## Hard rules

1. **Aging se calcula desde fecha de ingreso al almacén Toyosa**, no desde fecha de pedido a fábrica.
2. **Tránsito separado de aging.** Tránsito tiene su propio reloj (días desde embarque).
3. **Lead times 90-150 días** (Japón / China) son input para alerta — si run-rate apunta a quiebre antes del próximo ETA, alerta crítica.
4. **Optimal calc requiere demanda y margen.** Si falta cross-feed Ventas o Márgenes, output `DATA GAP` no estimar.
5. **Heatmap del sub-dashboard:** ejes = modelo × días en stock. Color: rojo > 180d, amarillo 90-180d, verde < 90d.
6. **BYD aging crítico** es benchmark conocido en Intermex (>422d). Si aparece en Holding, escalar a Edwin.

## Cross-feeds

- **Recibe:** ventas.md (para demanda) + margenes.md (para ponderación óptimo)
- **No emite cross-feed** (es terminal)

## Validador

**Rudy** (operaciones / inventario).
