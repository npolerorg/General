# VALIDACION.md · fragmento para insertar · cierre Mayo 2026

> **Fuente del fragmento:** sesion Claude Code 19-jun-2026 sin acceso al repo `npolerorg/toyosa-engagement`. Este documento se redacto como handoff: data parseada de los 4 archivos FINAL, reconciliada contra el PDF oficial, lista para insertar en `dashboard/VALIDACION.md` por una sesion con acceso al repo (o por Noel manualmente).
>
> **Linea roja respetada:** todos los numeros aqui re-derivados de fuente (BASE FINAL, EEFF FINAL, PDF oficial). Ningun valor inventado.

---

## 1. Cambio de fuente · 19-jun-2026

JC envio versiones FINAL que reemplazan las versiones previas. Causa de las correcciones de §1 y §1-bis.

| Archivo FINAL | Reemplaza | Impacto |
|---|---|---|
| `TOYOSA, BASE PARA DIRECTORIO MAYO 2026, VERSION FINAL.xlsx` | base anterior | P&L, gastos financieros, deuda (hojas 7.x) |
| `TOYOSA, EEFF MAYO 2017 - 2026 VERSION FINAL.xlsx` | EEFF anterior | balance, perimetro deuda financiera |
| `2026.06 MERCADO Y SEGMENTOS A MAYO 2026.pptx` | (nuevo insumo) | market share a mayo (loader + pend) |
| `DIRECTORIO TOYOSA SA, JUNIO 2026.pdf` | (nuevo insumo) | **precedencia de datos** para gate |

`data-2026-05.json` regenerado desde estos archivos. Reconciliacion gate abajo.

---

## 2. Correccion CRITICA · Deuda

**Narrativa anterior (FALSA):** "deuda total baja ~$7M, bursatil $7.33M, rotacion bursatil->bancaria". El error omitia $19.52M de pagares bursatiles MN CP.

**Canonico (oficial pag.21 reconciliado con EEFF FINAL · cierre mayo 2026):**

| Concepto | Valor | Origen |
|---|---|---|
| **Deuda total** | **$144.94M** | PDF pag.21 / BASE 7.3 row 33 col 2026 = `144,942,008` |
| YoY (vs may-25 $111.69M) | **+30%** (29.77%) | PDF + BASE 7.3 row 34 = `0.298` |
| vs dic-25 ($134.9M) | +7% | PDF pag.21 narrativa |
| vs abr-26 ($134.76M) | **+~$10M en el mes** | PDF + delta mensual |
| Deuda bancaria | $120.34M (CP $110.34M + LP $10.00M) | PDF pag.22 / BASE 7.3 rows 13+22 |
| Deuda bursatil | **$24.61M** | PDF pag.21 / BASE 7.2 row 9 col 2026 = `24,605,439` |
| — Bonos CP | $3.66M | BASE 7.3 row 25 col 2026 = `3,656,564` |
| — Pagares bursatiles MN CP | **$19.52M** | BASE 7.3 row 26 col 2026 = `19,521,125` (**el delta que el analisis omitia**) |
| — Bonos LP | $1.43M | BASE 7.3 row 28 col 2026 = `1,427,749` |
| % CP de la deuda | 92.1% | 133.52 / 144.94 |
| Deuda / Patrimonio | **0.83x** | 144.94 / 174.53 |

**Perimetro a documentar:** EEFF FINAL clasifica deuda financiera total = $147.33M (CP $136.28M + LP $11.05M). Oficial usa $144.94M. Diferencia $2.39M — toda en linea bancaria (perimetro de clasificacion, no error). **Canonico = $144.94M (oficial).**

**Reemplazos obligatorios en superficies:**
- Tarjeta deuda · KPI: $144.94M, 92% CP, "+~$10M vs abril", "+30% YoY"
- Grafico credito/deuda iteracion 7: bancaria $120.34M + bursatil $24.61M, D/P 0.83x, ladder CP 92%, **quitar callout** de rotacion bursatil->bancaria
- "Cambios vs ultimo directorio" punto 5: ver redaccion en `data-2026-05.json -> balance_y_deuda.narrativa_corregida`
- Narrativa de fondo: **"deuda y costo financiero suben juntos; el operativo record no llega al neto por el costo de fondeo"** (no "el stock baja, el costo sube")

---

## 3. Correccion · Gastos Financieros · $6.80M -> $6.44M (excepcion documentada al gate)

> El prompt previo decia "mantener $6.80M / +45%". **Eso queda anulado por la fuente BASE FINAL.**

Re-derivado de `7.GASTOS FINANCIEROS` (BASE FINAL), bloque YTD ene-may, columna 2026:

| Celda | Concepto | Valor verificado | §9 dice |
|---|---|---|---|
| V4 | Ingresos Operativos 2026 YTD | $101,309,926 | $101.31M ✓ |
| V5 | Intereses 2026 YTD | **$3,406,451** | $3.41M ✓ |
| V6 | Comisiones 2026 YTD | **$136,611** | $0.14M ✓ |
| **V7** | **Total Gastos Financieros 2026 YTD** | **$6,435,956** | **$6.44M ✓** |
| V9 | Relacion gastos / ingresos | **0.0635** | **6.4% ✓** |
| U7 | Total Gastos Financieros 2025 YTD | $4,691,662 | base de YoY |

**Canonico:** `$6.44M / 6.4%` — usar en TODAS las superficies (lamina gastos, "Cambios" punto 3, KPI card, narrativa, popup). **Matar $6.80M** del JSON y de las laminas.

### Tres `pend JC` que NO resuelve Claude Code

| # | Issue | Evidencia | Display label |
|---|---|---|---|
| 1 | **YoY del costo financiero** | Fuente: V7/U7−1 = +37.18%. Narrativa (deck + nota JC + Geronimo): +45%. Implica una base 2025 distinta a U7. | `pend JC: YoY costo financiero (+37.2% fuente / +45% narrativa - confirmar base 2025)` |
| 2 | **Desglose de componentes** | V5+V6 = $3,543,062. V7 = $6,435,956. Faltan ~$2.9M de cupones/otros NO desglosados en la hoja. | `pend JC: composicion gastos financieros (V5+V6 != V7; ~$2.9M sin etiqueta)` |
| 3 | **Gobernanza slide 26** | Ver tabla abajo. | `pend JC: gobernanza gastos financieros (PDF dice $6.8M, fuente dice $6.44M - JC define)` |

### Excepcion de precedencia · slide 26 del PDF oficial

**Regla maestra:** PDF oficial tiene precedencia. **EXCEPCION abierta:** en gastos financieros el PDF parece estar mal contra la fuente FINAL que el propio JC envio.

| Dimension | PDF oficial slide 26 | Fuente BASE FINAL (YTD ene-may 2026) |
|---|---|---|
| Total publicado | "$6.8 M" (texto) | $6,435,956 (V7) |
| Ratio sobre ingresos | "6.7%" (texto), "7%" (label rojo) | 6.4% (V9) |
| Intereses (barra) | $5.73 M | $3,406,451 (V5) |
| Comisiones (barra) | $0.22 M | $136,611 (V6) |
| Suma barras | $5.95M (5.73+0.22) — **no suma el $6.8M del texto** | — |

**El trap verificado:** la barra de Intereses 2026 del deck oficial ($5.73M) coincide EXACTO con celda B5 = $5,728,387 = **intereses ANUALES de 2017** en la misma hoja. La serie de intereses del deck para 2017-2025 calza EXACTO con la fuente YTD; **solo 2026 difiere** (deck usa el anual 2017 en lugar del YTD 2026).

**Comportamiento B|P-D:** mostrar dato source-true ($6.44M / 6.4%) con flag `pend JC` visible. JC decide:
- Opcion A: corregir el deck oficial a $6.44M
- Opcion B: B|P-D iguala el deck a $6.8M

No congelar resolucion hasta decision de JC.

---

## 4. Tabla de reconciliacion · B|P-D vs PDF oficial · GATE

Regla: cualquier diferencia se resuelve hacia el oficial (excepto §3 caso gastos financieros).

### 4.1 P&L · YTD ene-may 2026

| Metrica | B|P-D (re-derivado FINAL) | PDF oficial | Match | Pag PDF / fuente BASE |
|---|---|---|---|---|
| Ingresos operativos | $101,309,926 / $101.31M | $101.31M | ✓ | pag.13 · EVOLUCION row 12 col Ingreso |
| Margen bruto $ | $26,001,293 / $26.00M | $26.00M | ✓ | pag.13 · row 12 col MB $ |
| Margen bruto % | 25.67% | 25.67% | ✓ | row 12 col MARGEN/INGRESO |
| EBITDA $ | $19,575,203 | $19.58M | ✓ | pag.13/15 · row 12 col EBITDA $ |
| EBITDA % | 19.3% | 19.3% | ✓ | row 12 col EBITDA/INGRESO |
| Utilidad neta $ | $4,113,103 | $4.11M | ✓ | pag.16 · row 12 col UTILIDAD $ |
| Utilidad neta % | 4.1% | 4.1% | ✓ | row 12 col UTILIDAD/INGRESO |
| YoY Ingresos | -0.30% (planos) | "planos" | ✓ | calculo |
| YoY Margen Bruto | +16.55% | +16.5% | ✓ | calculo |
| YoY EBITDA | +24.10% | +24.1% | ✓ | calculo |
| YoY Utilidad Neta | -0.40% (plano) | -0.4% | ✓ | calculo |

### 4.2 Balance · cierre mayo 2026

| Metrica | B|P-D | PDF oficial | Match | Origen |
|---|---|---|---|---|
| Activos totales | $419.49M | $419.49M | ✓ | pag.18 |
| ROA | 0.98% | 0.98% | ✓ | pag.18 |
| Patrimonio (cierre) | $174.53M | $174.53M | ✓ | pag.17/25 |
| Total Pasivo | $244.96M | $244.96M | ✓ | (NO es deuda) |
| **Deuda total** | **$144.94M** | **$144.94M** | **✓** | **pag.21 · BASE 7.3 r33** |
| Deuda bancaria | $120.34M | $120.34M | ✓ | pag.22 |
| Bancaria CP / LP | $110.34M / $10.00M | $110.34M / $10.00M | ✓ | pag.22 |
| **Deuda bursatil** | **$24.61M** | **$24.61M** | **✓** | **pag.21 · BASE 7.2 r9 · CORREGIDO de $7.33M** |
| Bursatil bonos CP | $3.66M | (no desglosa en deck) | ✓ fuente | BASE 7.3 r25 |
| Bursatil pagares MN CP | $19.52M | (no desglosa) | ✓ fuente | BASE 7.3 r26 |
| Bursatil bonos LP | $1.43M | (no desglosa) | ✓ fuente | BASE 7.3 r28 |
| % CP | 92% | 92% | ✓ | calculo |
| D / Patrimonio | 0.83x | 0.83 | ✓ | pag.25 |
| YoY deuda total | +29.77% | +30% | ✓ | pag.21 |
| vs dic-25 | +7% | +7% | ✓ | pag.21 narrativa |

### 4.3 Operativo · mayo 2026

| Metrica | B|P-D | PDF oficial | Match | Origen |
|---|---|---|---|---|
| Unidades total mayo | 297 | 297 | ✓ | pag.6 |
| Unidades total YTD ene-may | 1,634 | 1,634 | ✓ | pag.6 (Toyota 1299 + Lexus 29 + Yamaha 282 + Hino 24) |
| Toyota YTD | 1,299 | 1,299 | ✓ | pag.6/7 |
| Lexus YTD | 29 | 29 | ✓ | pag.6 |
| Yamaha YTD | 282 | 282 | ✓ | pag.6 |
| Hino YTD | 24 | 24 | ✓ | pag.6 |
| Absorption mayo | 72.68% | 72.68% | ✓ | pag.19 |
| Absorption abril | 75.51% | 75.51% | ✓ | pag.19 (no visible en serie pero textual) |

### 4.4 Costo financiero · YTD ene-may 2026 · EXCEPCION DOCUMENTADA

| Metrica | B|P-D (source-true) | PDF oficial slide 26 | Match | Resolucion |
|---|---|---|---|---|
| Total gastos financieros | $6.44M (V7) | $6.8M (texto) | ✗ | **pend JC §3** |
| Ratio / ingresos | 6.4% (V9) | 6.7% (texto) | ✗ | **pend JC §3** |
| Intereses 2026 YTD | $3.41M (V5) | $5.73M barra (= B5 anual 2017) | ✗ | **pend JC §3 (trap del B5)** |
| Comisiones 2026 YTD | $0.14M (V6) | $0.22M barra | ✗ menor | **pend JC §3** |

**Gate verde:** todas las celdas ✓ excepto la fila 4.4 que esta documentada como excepcion abierta de gobernanza. No hay otras discrepancias materiales.

### 4.5 Items confirmados por JC en tanda 1 (anotacion manual)

P&L $101.31M, margen 25.67%, neto $4.11M, activos $419.49M, absorption 73%, deuda corregida segun §2, unidades por marca segun §4.3 — **todos validados ✓ JC**.

---

## 5. KPI card pendiente · Ingresos vehiculos YTD

JC renombro la tarjeta de "Facturacion bruta YTD" -> "Ingresos vehiculos YTD" y tacho "$106.9M" escribiendo **"$93.1M"** (= 106.9 × 0.87, neto de IVA).

**Hipotesis:** al pasar de "facturacion" (bruto) a "ingresos" (neto), JC quiere el neto $93.1M.

`pend JC: la tarjeta va con $106.9M bruto o $93.1M neto de IVA?` — confirmar antes de fijar. No publicar monto hasta decision.

---

## 6. Carry-forward · reconstruccion (no edicion)

Ver detalle estructurado en `data-2026-05.json -> carry_forward_compromisos`. Resumen:
- **ELIMINAR** 11 compromisos viejos sin retroalimentacion (LC70 flota, +297 bps, etc.)
- **MANTENER 2 con correccion JC:** Real Estate/ROE (sin mencionar Crown) · Caida canal Dealers (mayo 71% de meta)
- **AGREGAR 3 nuevos:** aging de stock, nivel optimo de endeudamiento, finalizar formato presentacion directorio con IA (incluye §6/§7/§8 capacidades)
- `pend data`: ingesta resumen acuerdos Teams (JC)

---

## 7. Reorden secuencia · Boris + Geronimo · 13-jun

Marcar visiblemente como **"reorden Boris/Geronimo 13-jun, pendiente de confluir con la revision 9-27 de JC"**. Banner en UI + nota aqui. Detalle del orden en JSON `secuencia_directorio_reorden_boris_geronimo`.

---

## 8. `pend JC` tanda 2 · roadmap `pend data` · `pend IT`

Listas completas en `data-2026-05.json`:
- `pend_jc_tanda_2` (10 items)
- `pend_data_roadmap` (8 items)
- `pend_it` (1 item: auth con usuarios nombrados)

---

## 9. NO congelar version Junio

JC sigue revisando 9-27. Esta actualizacion es **parcial**. No marcar la version como APPROVED ni hacer board-freeze hasta que JC cierre las laminas 9-27 y su reunion con comercial/marketing (19-jun) este incorporada.

---

## 10. Procedencia · este fragmento

Generado por sesion Claude Code 19-jun-2026 con acceso a las 4 fuentes FINAL pero **sin acceso al repo `npolerorg/toyosa-engagement`**. Las superficies del dashboard (`dashboard/index.html`, `app.js`, `deckdata.js`) deben ser editadas en una sesion con acceso al repo, usando esta data como insumo validado. Los §6/§7/§8 del prompt (persistencia + Agente MdV + Skill MdT) no estan implementados aqui — requieren acceso al codigo existente para evaluar estado actual y disenar sobre el.
