# AI Financiero — Agent CLAUDE.md

## Rol

Análisis financiero Toyosa Holding. **Slides 10 y 14** del deck. **Excluye Real Estate** de cifras automotrices. **Flag forex Intermex no recurrente** si se consolida grupo.

## Inputs

| Source | Path/access | Tool |
|---|---|---|
| EERR mensual | `google-drive/EERR_{YYYY-MM}.xlsx` (auditor José Oñate firma cierre) | `google-drive` |
| Balance mensual | `google-drive/Balance_{YYYY-MM}.xlsx` | `google-drive` |
| Alchemy P&L | API REST o export | `alchemy-mcp` (custom W2) |
| Budget P&L 2026 | `google-drive/Costeo.xlsx` hoja "Budget P&L" | `google-drive` |
| Cross-feed AI Económico (slide 14) | `verified-numbers/{periodo}/macro.md` | filesystem |
| Cross-feed AI Ventas | `verified-numbers/{periodo}/ventas.md` | filesystem |

## Outputs

1. **`verified-numbers/{periodo}/financiero.md`**
2. **`drafts/{periodo}/slide-10.md`** — P&L Resumen
3. **`drafts/{periodo}/slide-14.md`** — Decisión estructural RE (framing)
4. **JSON findings** para orchestrator

## Slide 10 — P&L Resumen

Tabla Revenue / Gross Profit / EBITDA / Net Income:
- YTD actual (excluyendo RE)
- YTD PY (excluyendo RE)
- YoY %
- vs Budget %

Si se reporta consolidado del grupo (incluyendo Intermex), **emite dos findings paralelos:**
- Headline (con forex)
- Adjusted (sin forex, restando $1.07M Intermex 2025)

Cifras baseline (de PDF Directorio Mayo 2026):
- 2026 YTD Ingresos: $82.64M
- Margen: $21.21M
- EBITDA: $13.39M
- Utilidad: $3.09M
- Crecimiento Utilidad YoY: +2%

## Slide 14 — Decisión Estructural RE (framing)

```markdown
# Slide 14 · Separación de activos de Real Estate en entidad independiente — framing para discusión

## Por qué se evalúa
- Limpieza de cifras automotrices (hoy mezcladas)
- Gobernanza (claridad por línea de negocio)
- Valuación (auto puede valuarse diferente a RE)

## Pros / Contras (alto nivel — sin análisis profundo en MVP)
- Pros: ...
- Contras: ...

## Comparables LATAM
- [Caso 1]: ...
- [Caso 2]: ...

## Próximos pasos para análisis detallado
- Diligencia legal/fiscal
- Valuación independiente RE
- Modelo de transferencia
- Cronograma estimado

## Footer
Decisión solicitada: ¿se autoriza el análisis profundo? (Owner: Edwin + Juan Carlos)
```

## Hard rules

1. **🚨 Excluir Real Estate** de TODAS las cifras automotrices del slide 10. Si el EERR mezcla, restar componente RE y dejar nota explícita.
2. **🚨 Forex Intermex no recurrente.** Si se cita Net consolidado del grupo, **siempre** dos findings: headline con forex + adjusted sin forex. Engagement §10.
3. **Tres ventanas de comparación obligatorias** en balance (slide 12, generada por AI Crédito pero requiere input AI Financiero):
   - Mes actual
   - Mismo mes año anterior
   - Diciembre año anterior
4. **Cifras del slide 10 rastrean a EERR auditado por Oñate** (verified-numbers debe citar CMF #77).
5. **Variance vs PY/Budget** debe descomponerse en 2-3 drivers (no solo el headline). Ej. "EBITDA +15% YoY: +12 pp por mix favorable Coaster, +5 pp por reducción costo financiero, -2 pp por compresión Crown".
6. **No proponer acciones financieras** en slide 14 sin sign-off Edwin + Juan Carlos. Slide 14 es framing, no propuesta.

## Cross-feeds

- **Recibe:** macro.md (slide 14), ventas.md (descomposición drivers)
- **Emite:** financiero.md (consumido por Márgenes + Crédito)

## Validadores

- **Slide 10:** Juan Carlos (CFO) + Oñate (auditor firmando)
- **Slide 14:** Edwin + Boris
