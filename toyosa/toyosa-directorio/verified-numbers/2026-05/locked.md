# Verified Numbers — 2026-05 (baseline)

**Estado:** LOCKED — derived from `DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf` (29 pp) y `toyosa/CLAUDE.md` §5.
**Periodo:** Enero–Abril 2026 YTD (cierre Abril).
**Generado:** W1 scaffold — sirve de comparativo PY para el primer ciclo real (2026-06).

## Toyosa Holding — Facturación YTD (Ene–Abr 2026)

| Métrica | Valor | Fuente |
|---|---|---|
| Facturación total YTD | **$87.304M** | PDF Mayo 2026, slide 4 |
| Vehículos | $87.304M (excl. Postventa según engagement; en PDF slide 4 = $87.304M incluye postventa $7.546M) | PDF slide 4 |
| Vehículos puros (excl. Postventa) | $87.304M − $7.546M = **$79.758M** | derived |
| Postventa | $7.546M | PDF slide 4 |
| Total con Postventa | **$94.850M** | PDF slide 4 |
| Total Meta YTD | $93.0M (102% avance) | PDF slide 4 |

**Nota:** convención del engagement §5 cita $87.304M como "Facturación YTD"; reconciliar con PDF slide 4 ($94.850M con postventa, $87.304M vehículos solamente o sin postventa, verificar con Juan Carlos en W1).

## Unidades YTD (Ene–Abr 2026)

| Marca | Unidades 2026 | Unidades 2025 | YoY |
|---|---|---|---|
| Toyota | 1,070 | 1,015 | **+5.4%** |
| Lexus | 23 | — | — |
| Yamaha | 220 | — | — |
| Hino | 24 | — | — |
| **Total** | **1,337** | — | — |

Fuente: PDF Mayo 2026 slides 4, 5, 7 + engagement §5.

## Crecimiento por modelo (Ene–Abr 2026 vs 2025)

| Modelo | YoY |
|---|---|
| Coaster | **+173%** |
| LC 70 | **+94%** |
| 4Runner | **+94%** |
| Rav4 | **+24%** |
| Fortuner | **+7%** |
| Hilux (total 2017-2026) | -52% |

Fuente: PDF Mayo 2026 slide 7.

## Histórico Ene-Abr (multi-year)

| Año | Ingresos | EBITDA | Utilidad Neta |
|---|---|---|---|
| 2026 YTD | $82.64M | $13.39M | $3.09M |
| 2025 | $76.93M | $14.11M | $1.87M |
| 2024 | $62.17M | ~$10.96M (est.) | $3.38M |
| 2023 | $56.10M | $9.35M | $3.16M |

Fuentes: PDF slides 10, 11, 16. **Slide 10** dice 2026 YTD Ingresos $82.64M; **slide 11** dice $82.64M con +7.4% YoY. **Slide 14** dice 2026 Ingresos $92.64M, Margin $23.09M, Rel. Margin/Ingresos 25.16%. **Hay inconsistencia $82.64M vs $92.64M entre slides — flagear con Juan Carlos en W1.**

## Ratios financieros (Abril 2026)

| Ratio | Valor | Fuente |
|---|---|---|
| Margen bruto YTD | ~16-17% | PDF slide 13 + cálculo |
| Margen EBITDA YTD | ~15-17% | PDF slide 15 (17.10%) |
| Margen Neto YTD | ~4% | PDF slide 16 |
| ROE Abril 2026 | 1.83% | PDF slide 17 |
| ROA Abril 2026 | 0.76% | PDF slide 18 |
| Absorption Rate | 75.51% | PDF slide 19 |
| **D/E Total** | **0.41** | engagement §5 + PDF slide 25 |
| **D/E Bursátil** | **0.41** | engagement §5 |

## Estructura financiera (al cierre Abril 2026)

| Métrica | Valor | Fuente |
|---|---|---|
| Total Financiamiento | $134.76M (+21% YoY) | PDF slide 21 |
| Financiamiento bancario | $114.05M (+17% YoY) | PDF slide 22 |
| Financiamiento bursátil | $20.70M (+57% YoY) | PDF slide 23 |
| Patrimonio | $168.65M | PDF slide 17 derived |
| Activo total | $406.97M | PDF slide 18 derived |

## Composición de ingresos (Ene-Abr 2026)

| Línea | Valor | % |
|---|---|---|
| Toyota | $67.39M | 82% |
| Lexus | $4.74M | 6% |
| Servicios | $5.05M | 6% |
| Repuestos | $1.58M | 2% |
| Yamaha | $1.09M | 1% |
| Hino / Volvo / Kubota | $2.80M | 3% |
| **Total** | **$82.64M** | 100% |

Fuente: PDF slide 11.

## Gastos operativos (Ene-Abr 2026)

| Categoría | Valor | % Ingresos | Fuente |
|---|---|---|---|
| Gasto financiero | $2.26M | 3% | PDF slide 26 |
| Gasto administrativo | $1.83M | 2.21% | PDF slide 27 |
| Gasto comercialización | $3.78M | 4.57% | PDF slide 28 |

## Stock de vehículos (al 2026-05-11)

| Marca | Unidades |
|---|---|
| Toyota | 430 |
| Lexus | (detalle TBD) |

Fuente: PDF slide 8. Distribución por sucursal Santa Cruz / La Paz / Cochabamba — ver `db-inventario` cuando se cargue data completa.

## Inconsistencias a resolver con Juan Carlos (W1)

1. Facturación YTD: $87.304M (engagement §5) vs $94.850M (PDF slide 4 con postventa) vs $79.758M (derived vehículos puros). Decidir convención definitiva.
2. Ingresos YTD: $82.64M (slides 10, 11) vs $92.64M (slide 14). Slide 14 ratio sugiere 25.16% margen sobre $92.64M = $23.32M margin; PDF también dice $23.09M margin. Diferencial sugiere posible inclusión/exclusión de Real Estate o postventa.
3. Real Estate: si está incluido en cifras agregadas, identificar el split antes del primer ciclo real.

## Exclusiones aplicadas

- **Real Estate:** flagged para exclusión cuando se identifique el componente. Pendiente diligencia con Juan Carlos.
- **Forex Intermex:** no aplica al Holding directo. Si se reporta grupo consolidado en slide 10/14, aplicar regla §10 engagement.

## Próxima actualización

- Cifras Junio 2026 (cierre Mayo) cargadas por agentes en `verified-numbers/2026-06/` durante W3-W4.
- Reconciliar inconsistencias arriba con Juan Carlos antes del primer ciclo real.
