# Handoff · 19-jun-2026 · B|P-D dashboard revision cycle

## Contexto

Sesion de Claude Code en `npolerorg/General` (repo HospitalityIQ, scope GitHub MCP unico) sin acceso a `npolerorg/toyosa-engagement` donde vive el dashboard B|P-D (carpeta `dashboard/`, branch `claude/dashboard-bpd`, sitio Netlify `toyosa-dashboard-bpd.netlify.app`).

El prompt `PROMPT-claude-code-toyosa-bpd-19jun.md` ordenaba checkout del branch, inventario de `dashboard/`, lectura de `VALIDACION.md`, y aplicacion de §0-§11. **El checkout y la edicion de codigo NO fueron posibles** desde esta sesion por scope GitHub. Lo que **si** se pudo hacer:

1. Parsear las 4 fuentes FINAL.
2. Re-derivar todos los checksums de §9 desde las fuentes.
3. Verificar el caso §1-bis (gastos financieros · $6.44M vs $6.80M · trampa B5).
4. Construir el reconciliation gate (§11 punto 10).

## Archivos del handoff

| Archivo | Para que sirve |
|---|---|
| `data-2026-05.json` | Dataset canonico re-derivado de las fuentes FINAL. Listo para reemplazar la version actual del dashboard (carga el reorden de secciones, los 3 carry-forward nuevos, los 4 `pend JC` visibles, las 4 superficies de deuda corregidas, etc.). |
| `VALIDACION-fragment.md` | Fragmento a insertar en `dashboard/VALIDACION.md`. Contiene la tabla de reconciliacion completa B|P-D vs PDF oficial, la excepcion documentada de §1-bis, las correcciones de deuda, los `pend` enumerados. |
| `README.md` | Este archivo. |

## Como usar este handoff

### Opcion A: una sesion con scope a `toyosa-engagement`

1. Abrir Claude Code en un environment con GitHub scope a `npolerorg/toyosa-engagement` agregado.
2. Checkout `claude/dashboard-bpd`.
3. Copiar este folder (o solo los 2 archivos clave) a `dashboard/` o donde corresponda.
4. Aplicar el JSON como reemplazo de `data-2026-05.json` (o copiar los bloques que correspondan al esquema vigente).
5. Insertar `VALIDACION-fragment.md` como nueva seccion en `dashboard/VALIDACION.md` (o reemplazar las secciones equivalentes).
6. Ejecutar §A del prompt (inventario, status report) usando ahora la data ya validada como insumo.
7. Aplicar §0-§5 mecanicamente (la data ya esta), §6-§8 son trabajo de codigo nuevo.

### Opcion B: Noel aplica manualmente

1. Abrir el repo `npolerorg/toyosa-engagement` localmente.
2. Reemplazar `dashboard/data-2026-05.json` con la version aqui.
3. Agregar las secciones del fragment a `dashboard/VALIDACION.md`.
4. Push + commit `"data + VALIDACION update tanda 1 - revision JC 18-jun"`.

## Checksums verificados desde fuente (resumen)

Todos contra `7.GASTOS FINANCIEROS`, `EVOLUCION MARGEN EBITDA UTILIDA`, `7.3 TOTAL ENDEUDAMIENTO`, `7.2 DEUDA BURSATIL` del BASE FINAL, y pages 6, 7, 19, 21, 22, 25, 26 del PDF oficial.

- Gastos financieros total YTD 2026 = $6,435,956 (celda V7) → **$6.44M** corregido de $6.80M
- Intereses YTD 2026 = $3,406,451 (V5); Comisiones = $136,611 (V6); V5+V6 ≠ V7 (~$2.9M sin desglose)
- Intereses anual 2017 = $5,728,387 (B5) — **es el numero que el deck oficial muestra como intereses 2026** (la trampa documentada de §1-bis punto 3)
- Deuda total 2026 = $144,942,008 = $144.94M (+30% YoY) ✓ vs PDF pag.21
- Bursatil composicion: $3.66M + $19.52M + $1.43M = **$24.61M** (el delta omitido era los $19.52M de pagares MN CP)
- Ingresos $101.31M, MB $26.00M (25.67%), EBITDA $19.58M (19.3%), Neto $4.11M (4.1%) — todos ✓ vs PDF
- Toyota YTD 1,299 unidades, Coaster +173%, LC70 +96%, 4Runner +96%, Fortuner +40%, RAV4 +14% — ✓ vs PDF pag.7

## Lo que falta

Estos puntos del prompt requieren acceso al codigo del dashboard y NO estan resueltos:
- §A (inventario `dashboard/`, status report)
- §3 correcciones de etiqueta/texto en las superficies (L1, L2, L3, L5, L7)
- §6 persistencia + versionado + lock doble llave (PR-1)
- §7 Agente MdV (PR-2)
- §8 Skill MdT (PR-3)
- §11 Playwright screenshots en los 3 temas
- PR + merge (depende de scope GitHub a `toyosa-engagement`)

## Linea roja

Cada numero de este handoff rastrea a su celda en las fuentes FINAL. Ningun valor inventado, ningun `estimado` sin flag.
