# AI Márgenes — Agent CLAUDE.md

## Rol

Análisis de márgenes global + por marca + tendencia. **Slide 11** del deck + sub-dashboard `db-margenes`.

## Inputs

| Source | Path/access | Tool |
|---|---|---|
| Alchemy P&L por marca | API REST o export | `alchemy-mcp` / `google-drive` |
| Costing Excel | `google-drive/Costeo.xlsx` | `google-drive` |
| Cross-feed AI Ventas | `verified-numbers/{periodo}/ventas.md` (unidades por marca) | filesystem |
| Cross-feed AI Financiero | `verified-numbers/{periodo}/financiero.md` (margen consolidado) | filesystem |
| Cross-feed AI Industria | `verified-numbers/{periodo}/industria.md` (benchmark margen industria) | filesystem |

## Outputs

1. **`verified-numbers/{periodo}/margenes.md`**
2. **`drafts/{periodo}/slide-11.md`** — Márgenes Global + Por Marca + Tendencia
3. **`drafts/{periodo}/db-margenes.html`** — sub-dashboard (por marca × por mes + simulador mix)
4. **JSON findings**

## Slide 11 — Márgenes

```markdown
# Slide 11 · [Headline — ej. "Margen Toyota estable pero Crown comprimido 200 bps por mix"]

## Tabla margen bruto
| Marca | Margen mes | Margen YTD | Margen PY YTD | Δ vs PY | Δ vs Bench |
|---|---|---|---|---|---|
| Toyota | X% | Y% | Z% | +/- bps | +/- bps |
| Lexus | ... |
| Hino | ... |
| Yamaha | ... |
| Crown-BYD | ... |
| **Global** | X% | Y% | Z% | +/- bps | +/- bps |

## Tendencia 12 meses (chart line por marca)
[Chart.js inline]

## Footer
Marca con mayor oportunidad: [marca] — gap [N bps] vs benchmark.
```

## Hard rules

1. **Margen bruto** = (Ingresos − Costo directo) / Ingresos. Sin overhead.
2. **Cada marca rastrea a Alchemy P&L por brand.** Si Alchemy no desagrega, output `DATA GAP` por marca.
3. **Tendencia 12 meses** mínima para mostrar el chart. Si no hay 12 meses, mostrar lo que haya con nota.
4. **Benchmark industria** viene del slide 4 (cross-feed AI Industria). Si AI Industria no llenó, output sin columna de benchmark + nota.
5. **Exclusión RE.** Si margen reportado incluye RE, restar componente.
6. **Sub-dashboard `db-margenes`** debe permitir simulador de mix: GG ajusta % de cada marca y recalcula margen ponderado.

## Punto clave (reglas #1 + #6)

- Cualquier marca con margen ±10% vs PY → trigger #1
- Brecha >5 pp vs benchmark industria → trigger #6

## Cross-feeds

- **Recibe:** ventas.md (unidades), financiero.md (consolidado), industria.md (benchmark)
- **Emite:** margenes.md (consumido por AI Inventario para ponderación óptimo)

## Validador

**Juan Carlos** (CFO).
