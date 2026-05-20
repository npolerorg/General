# AI Crédito — Agent CLAUDE.md

## Rol

Balance + utilización de líneas de crédito. **Slide 12** del deck + sub-dashboards `db-banking` y `db-balance`.

## Inputs

| Source | Path/access | Tool |
|---|---|---|
| Balance mensual | `google-drive/Balance_{YYYY-MM}.xlsx` | `google-drive` |
| Bancos.xlsx (7 bancos) | `google-drive/Bancos.xlsx` | `google-drive` |
| Tasas vigentes por banco | `google-drive/Bancos.xlsx` hoja "Tasas" | `google-drive` |
| Covenants | `google-drive/Bancos.xlsx` hoja "Covenants" | `google-drive` |
| Cross-feed AI Financiero | `verified-numbers/{periodo}/financiero.md` | filesystem |

## Outputs

1. **`verified-numbers/{periodo}/credito.md`**
2. **`drafts/{periodo}/slide-12.md`** — Balance + Crédito
3. **`drafts/{periodo}/db-banking.html`** — simulador líneas
4. **`drafts/{periodo}/db-balance.html`** — balance interactivo
5. **JSON findings**

## Slide 12 — Balance + Crédito

```markdown
# Slide 12 · [Headline — ej. "D/E 0.41 estable, $XM idle, ahorro $YK por rebalanceo"]

## Balance (3 ventanas)
| Métrica | Mes actual | Mismo mes PY | Dic PY | Δ vs PY | Δ vs Dic PY |
|---|---|---|---|---|---|
| Activo total | ... |
| Pasivo total | ... |
| Patrimonio | ... |
| Deuda total / Patrimonio | 0.41 | ... |
| Deuda bursátil / Patrimonio | 0.41 | ... |

## Utilización líneas (7 bancos)
| Banco | Línea | Utilizado | % util | Tasa | Comentario |
|---|---|---|---|---|---|
| BCI | $4.3M | $2.77M | 64% | 11.24% | Más cara |
| TowerBank | $13.8M | $0 | 0% | 6.78% | Más barata, idle |
| Santander | ... | ... | ... | 7.29% | ... |
| Consorcio | ... | ... | ... | 7.40% | ... |
| ... |
| **Total** | $X M | $Y M | Z% | 8.39% (ponderada) | |

## Ahorro potencial
Rebalanceo BCI → TowerBank: ~$319K/año (cifra Intermex baseline; ajustar para Holding según líneas Holding-only).

## Footer
Acción recomendada: rebalanceo X / cancelación línea cara Y / negociación covenant Z.
```

## Hard rules

1. **Tres ventanas obligatorias en balance:** mes actual, mismo mes PY, Dic PY.
2. **D/E saludable Toyosa Holding:** 0.41 (baseline §5 engagement). Cambios >10% YoY → trigger.
3. **Líneas idle** se reportan SIEMPRE (incluso si no hay acción).
4. **Tasa ponderada** = sum(utilizado × tasa) / sum(utilizado).
5. **Ahorro potencial** se calcula vs tasa más barata disponible × monto rebalanceable. No estimar si data incompleta.
6. **Covenants:** si alguno está cerca de violarse (margen <20%), alerta crítica → trigger amazing fact.
7. **No usar cifras Intermex** en Holding deck (a menos que se cite el grupo y entonces forex flag aplica).

## Punto clave (reglas #1, #5)

- D/E cambio >±10% YoY → trigger #1
- Líneas idle >50% del total → trigger #5

## Sub-dashboards

- **`db-banking`:** simulador de rebalanceo. GG mueve deuda de banco A a B y ve ahorro/costo en vivo.
- **`db-balance`:** balance interactivo con tooltips de cambio por línea.

## Cross-feeds

- **Recibe:** financiero.md (Net, EBITDA para cálculo cobertura intereses)
- **No emite cross-feed** (terminal)

## Validador

**Juan Carlos** (CFO).
