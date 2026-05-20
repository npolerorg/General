# AI Industria — Agent CLAUDE.md

## Rol

Análisis del mercado automotriz Bolivia + benchmarks vs industria. **Slides 3 y 4** del deck.

## Inputs

| Source | URL/access | Periodicidad | Tool |
|---|---|---|---|
| ANCB (Asoc. Nacional de Comerciantes en Bolivia) | Edwin gestiona acceso/subscripción | Mensual (registros) | `WebFetch` / Drive upload |
| Asoc. Importadores Bolivia | TBD W1-W2 | Mensual | `WebFetch` |
| Toyota LATAM monthly reports | Edwin tiene acceso | Mensual | `google-drive` |
| Tableau workbook "Share-of-Market" | Israel da acceso PAT | Tiempo real | `tableau-mcp` |
| Benchmarks LATAM (Chile, Argentina, Perú, Colombia) | Cámaras automotrices + Bloomberg country reports | Mensual/trimestral | `WebFetch` |

## Outputs

1. **`verified-numbers/{periodo}/industria.md`**
2. **`drafts/{periodo}/slide-3.md`** — Mercado Automotriz Bolivia
3. **`drafts/{periodo}/slide-4.md`** — Benchmark vs Industria
4. **JSON findings** para orchestrator

## Slide 3 — Mercado Automotriz Bolivia

```markdown
# Slide 3 · [Headline punto clave]

## Body
- Registros vehiculares país YTD (fuente ANCB)
- Share Toyosa por marca (Toyota vs Honda vs Suzuki etc.)
- Tabla regional: % ventas Toyota Bolivia por departamento (Santa Cruz, La Paz, Cochabamba, ...)
- Normalización: Santa Cruz X% de ventas YTD Toyosa vs Santa Cruz Y% del PIB país (fuente INE — cross-feed AI Económico)
- Comparable Chile/Argentina/Perú/Colombia: registros país, % share marca lider

## Footer
[Donde tenemos brecha vs market share natural por región — punto para discusión]

## Sources
- Registros país: ANCB, [URL], fecha
- Share Toyosa: cálculo interno + Tableau workbook
- PIB regional: INE, [URL], fecha
```

## Slide 4 — Benchmark vs Industria

```markdown
# Slide 4 · [Headline brecha más relevante]

## Tabla
| Métrica | Toyosa | Óptimo industria | Comparable LATAM (avg) | Gap |
|---|---|---|---|---|
| Margen bruto | X% | 18-20% | Y% | +/- N bps |
| Rotación inventario (días) | X | <90 | Y | +/- N |
| Días cobertura stock | X | 60-90 | Y | +/- N |
| Costo financiero / ingresos | X% | <3% | Y% | +/- N pp |
| Gastos comercialización / ingresos | X% | 3-5% | Y% | +/- N pp |

## Footer
2-3 brechas prioritarias para discusión.

## Sources
- Toyosa: cálculo interno (cross-feed AI Financiero + AI Crédito)
- Óptimo industria: fuente externa [citar]
- Comparable LATAM: cámaras [citar país por país]
```

## Punto clave (regla #6)

Benchmark gap >5 pp vs óptimo industria → escalar a header.

## Hard rules

1. **Citar comparable LATAM por país.** "Promedio LATAM" sin fuente = `DATA GAP`. Mínimo 2 países comparables.
2. **Óptimo industria** debe citar fuente: NADA US (con caveat de aplicabilidad), Deloitte Auto Industry, ANCB Bolivia si publica.
3. **No mezclar Bolivia con LATAM avg.** Bolivia es columna separada; LATAM avg incluye 4 países comparables (excluyendo Bolivia).
4. **Share calc:** unidades Toyosa / unidades país total. Si país no publica desagregado por marca, output `DATA GAP` en share por marca.
5. **Exclusión RE** no aplica directo aquí (slide industria es de unidades vehiculares), pero si se cita ingresos Toyosa, debe ser excluyendo RE.

## Consumido por

- **AI Ventas** (slide 5-7): share país alimenta análisis competitivo
- **Orchestrator** Slide 0 (Amazing Facts): si gap benchmark es severo

## Validadores

- **Slide 3:** Edwin (lectura comercial)
- **Slide 4:** Juan Carlos (comparables financieros)
