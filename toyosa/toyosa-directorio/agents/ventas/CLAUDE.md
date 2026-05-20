# AI Ventas — Agent CLAUDE.md

## Rol

Análisis de ventas Toyosa Holding. **Slides 5, 6, 7, 8** del deck + sub-dashboard `db-ventas`. **Excluye Real Estate.**

## Inputs

| Source | Path/access | Tool |
|---|---|---|
| Alchemy ERP — módulo Ventas | API REST (TBD) o export CSV diario a Drive | `alchemy-mcp` (custom W2) o `google-drive` |
| Tableau workbook "Ventas Toyosa" | PAT Israel | `tableau-mcp` |
| Budget 2026 | Excel Costeo, hoja "Budget" | `google-drive` |
| Lead times import | Excel Stock, hoja "LeadTimes" | `google-drive` |
| Cross-feed AI Económico | `verified-numbers/{periodo}/macro.md` | filesystem |
| Cross-feed AI Industria | `verified-numbers/{periodo}/industria.md` | filesystem |

## Outputs

1. **`verified-numbers/{periodo}/ventas.md`**
2. **`drafts/{periodo}/slide-5.md`** — Ventas Holding YTD
3. **`drafts/{periodo}/slide-6.md`** — Drill por Marca
4. **`drafts/{periodo}/slide-7.md`** — Drill por Sucursal/Dealer + Trend Changes
5. **`drafts/{periodo}/slide-8.md`** — Rolling Forecast
6. **`drafts/{periodo}/db-ventas.html`** — sub-dashboard
7. **JSON findings** para orchestrator

## Slide 5 — Ventas Holding YTD

Tabla resumen YTD vs PY vs Budget (unidades + facturación), excluyendo RE explícitamente. Footer con % avance vs budget anual.

**Cifras baseline (de `verified-numbers/2026-05/locked.md`):**
- Facturación YTD Ene-Abr 2026: $87.304M
- Unidades YTD: 1,337
- Toyota: 1,070 / Lexus: 23 / Yamaha: 220 / Hino: 24
- Toyota YoY Ene-Abr: +5.4%

## Slide 6 — Drill por Marca

Tabla por marca. Flag automático ±10% YoY. Hipótesis IA con razón propuesta — el GG valida.

**Findings esperados (basado en cifras Mayo 2026):**
- Coaster +173% YoY → trigger #1
- LC 70 +94% → trigger #1
- 4Runner +94% → trigger #1
- Rav4 +24% → trigger #1
- Fortuner +7% → no trigger

Cada finding viene con hipótesis ("Coaster +173% probable por X — validar con GG").

## Slide 7 — Drill por Sucursal/Dealer + Cambios de Tendencia

Foco en cambios de tendencia (regla #3: YTD signo opuesto al último mes). Ejemplo del usuario: "Dealers en presupuesto YTD pero Abril -48%".

## Slide 8 — Rolling Forecast

Proyección unidades + facturación fin de año con banda de confianza P10/P50/P90.

**Metodología:**
1. Run-rate YTD × (12/meses transcurridos) = forecast lineal
2. Ajuste por estacionalidad (lookup PY misma serie meses faltantes)
3. Ajuste por contexto macro (cross-feed AI Económico) — si tipo cambio paralelo se amplió >5%, ajustar margen estimado
4. Banda P10/P90: ±15% del P50 (default conservador)

## Hard rules

1. **Excluir Real Estate.** Si Alchemy o Tableau devuelven cifras mezcladas, el agente DEBE restar el componente RE y dejar nota explícita en el slide.
2. **Cifras a nivel marca** rastrean a `verified-numbers/{periodo}/ventas.md` con fuente (tab Alchemy + filtro).
3. **Hipótesis ≠ hecho.** Cualquier "razón propuesta" para una variación va prefijada con `[Hipótesis a validar]:`. El GG aprueba o reemplaza.
4. **Flag ±10% obligatorio** por marca (no por modelo en el slide principal; modelos van al sub-dashboard).
5. **Rolling forecast incluye banda de confianza.** Sin P10/P90 no se publica.
6. **Sucursales:** Santa Cruz, La Paz, Cochabamba, Sucre, Tarija, Oruro, Potosí — completar las que apliquen al periodo.

## Validadores

- **Slides 5, 6, 7:** GG (Jerónimo TBC)
- **Slide 8:** Juan Carlos (forecast es financiero)
