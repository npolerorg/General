# Deck Spec — Directorio Toyosa Holding

**Versión:** 1.0 (W1 draft, pendiente sign-off Edwin 2026-05-26)
**Periodo target primer ciclo:** 2026-06 (datos cierre Mayo + macro/industria al cierre)

## Reglas globales del deck

1. **15 slides + 5 sub-dashboards.** Drill-downs no son parte del flujo lineal; se abren desde slides 6, 9, 11, 12.
2. **Cada slide = 1 punto clave.** Header dorado (stitle estilo Intermex). Si hay 2 puntos, partir en 2 slides.
3. **Footer:** implicación o acción propuesta. No es decorativo.
4. **Historia:** YTD + año anterior + budget. Máximo 3 años en charts. Resto a sub-dashboards / anexos.
5. **Macro → micro.** Empezar por contexto país/industria, terminar con detalle por marca/sucursal/modelo.
6. **Trazabilidad obligatoria.** Toda cifra rastrea a `verified-numbers/YYYY-MM/sources.md`.
7. **Exclusión Real Estate** explícita en cualquier slide financiero/ventas.

## Las 15 slides (LOCKED)

### FASE 0 — INTRO

#### Slide 0 · Cover + Amazing Facts
- **Header:** `DIRECTORIO TOYOSA · [Mes Año] · Resumen del Gerente General`
- **Body:** 3-5 bullets dorados con las desviaciones más relevantes del mes:
  - `[Marca/Modelo] [+X%] YoY · [+Y%] vs budget`
  - `[KPI financiero] mejor/peor que [benchmark]`
  - Alerta operativa (inventario aging, crédito idle, etc.)
- **Footer:** "Detalle en slides siguientes · Discusión guiada por el GG"
- **Generador:** Orchestrator (post cross-agent synthesis)
- **Validador:** Edwin

#### Slide 1 · Conclusión del GG
- **Header:** Headline elegido por el GG en el chat. Default IA: `[Periodo] cerró [+/-X%] YoY, [+/-Y%] vs budget — [3 drivers principales]`
- **Body:** 3 drivers (positivos/negativos), 3 puntos a trabajar para el siguiente directorio
- **Footer:** "Lo que sigue: contexto macro · industria · resultados · decisiones"
- **Generador:** Chat Agent (GG escribe / IA propone)
- **Validador:** GG

### FASE 1 — MACRO + INDUSTRIA

#### Slide 2 · Bolivia 2026 — Contexto Macro
- **Header:** `[Lectura macro del mes — ej. "Reservas BCB siguen presionadas, tipo cambio paralelo amplía brecha"]`
- **Body:**
  - PIB (último dato INE) + tendencia 3 años
  - IPC (último IPC INE) + tendencia
  - Reservas internacionales BCB (último cierre)
  - Tipo de cambio: oficial vs paralelo (brecha %)
  - Importaciones automotrices país (último cierre)
- **Footer:** Implicación para Toyosa (ej. "brecha cambiaria penaliza precio importación — impacto en margen 200 bps")
- **Generador:** AI Económico
- **Validador:** Juan Carlos
- **Fuentes:** INE Bolivia, BCB

#### Slide 3 · Mercado Automotriz Bolivia
- **Header:** `[Lectura del mercado — ej. "Mercado país creció X%, Toyosa Y% — ganamos/perdimos share"]`
- **Body:**
  - Registros vehiculares país YTD (fuente ANCB / Asoc. Importadores)
  - Share Toyosa por marca
  - Normalización: Santa Cruz X% de ventas YTD Toyosa vs Santa Cruz Y% del PIB país
  - Comparable LATAM (Chile, Argentina, Perú, Colombia)
- **Footer:** Donde tenemos brecha vs market share natural por región
- **Generador:** AI Industria
- **Validador:** Edwin
- **Fuentes:** ANCB, Toyota LATAM, datos país

#### Slide 4 · Benchmark vs Industria
- **Header:** `[Lectura comparativa — ej. "Margen bruto 16% vs óptimo industria 18-20% — gap 200-400 bps"]`
- **Body:** Tabla con métricas Toyosa vs óptimo industria vs comparable LATAM:
  - Margen bruto
  - Rotación inventario (días)
  - Días cobertura stock
  - Costo financiero / ingresos
  - Gastos comercialización / ingresos
- **Footer:** 2-3 brechas prioritarias para discusión
- **Generador:** AI Industria
- **Validador:** Juan Carlos
- **Fuentes:** Benchmarks externos + Alchemy/Tableau interno

### FASE 2 — VENTAS

#### Slide 5 · Ventas Holding YTD (excluyendo Real Estate)
- **Header:** `[Resultado consolidado — ej. "Facturación YTD $XM, +Y% YoY, Z% del budget anual"]`
- **Body:**
  - Unidades YTD vs PY vs budget
  - Facturación YTD vs PY vs budget
  - **Nota explícita: cifras excluyen Real Estate**
  - Tabla resumen por línea (Vehículos / Postventa / Repuestos)
- **Footer:** % avance vs budget anual + estado vs tendencia
- **Generador:** AI Ventas
- **Validador:** GG (Juan Carlos finanza)

#### Slide 6 · Drill por Marca
- **Header:** `[Marca destacada — ej. "Toyota +5.4% YoY YTD pero Coaster +173% impulsa mix"]`
- **Body:** Tabla por marca (Toyota / Lexus / Hino / Yamaha / Crown-BYD):
  - Unidades YTD
  - YoY %
  - vs Budget %
  - Flag automático si ±10% (regla del usuario)
- **Hipótesis IA validable por GG:** "Coaster +173% probable por [razón X] — validar"
- **Footer:** Link al sub-dashboard `db-ventas` para detalle por modelo
- **Generador:** AI Ventas
- **Validador:** GG

#### Slide 7 · Drill por Sucursal / Dealer + Cambios de Tendencia
- **Header:** `[Cambio de tendencia detectado — ej. "Dealers en presupuesto YTD pero Abril -48% — investigar"]`
- **Body:** Tabla Santa Cruz / La Paz / Cochabamba / dealers:
  - Unidades mes
  - vs PY %
  - vs Budget mes %
  - YTD vs Budget YTD %
- **Hipótesis IA:** razones para los cambios de tendencia
- **Footer:** Pregunta para discusión en directorio
- **Generador:** AI Ventas
- **Validador:** GG

#### Slide 8 · Rolling Forecast
- **Header:** `[Lectura proyección — ej. "Run-rate apunta a $XM YE, $YM por encima de budget"]`
- **Body:**
  - Proyección unidades + facturación fin de año
  - Banda de confianza (P10 / P50 / P90)
  - vs Budget restante
  - Drivers principales del forecast
- **Footer:** Implicación para inventario y cash flow → conexión slide 9 y 12
- **Generador:** AI Ventas
- **Validador:** Juan Carlos

#### Slide 9 · Salud de Inventario
- **Header:** `[Estado inventario — ej. "Stock $XM cubre Yd vs demanda — alertas en Z SKUs"]`
- **Body:**
  - Inventario en premisas + en tránsito
  - Cobertura en días vs run-rate
  - Aging: % < 90d / 90-180d / > 180d
  - Top 5 SKUs en aging crítico
  - Inventario óptimo sugerido (demanda × rotación × margen)
- **Footer:** Alertas + recomendación de pedido al siguiente shipment
- **Generador:** AI Inventario
- **Validador:** Rudy
- **Sub-dashboard:** `db-inventario` (heatmap aging + flujo ZOFRI → Bolivia)

### FASE 3 — FINANCIERO

#### Slide 10 · P&L Resumen
- **Header:** `[Lectura P&L — ej. "EBITDA margin Y% vs PY Z% — drivers compresión"]`
- **Body:** Tabla Revenue / Gross Profit / EBITDA / Net Income:
  - YTD actual
  - YTD PY
  - YoY %
  - vs Budget
- **Exclusión RE explícita.** Si forex Intermex aparece, flag separado.
- **Footer:** 2-3 drivers de la variación (descomposición)
- **Generador:** AI Financiero
- **Validador:** Juan Carlos

#### Slide 11 · Márgenes Global + Por Marca + Tendencia
- **Header:** `[Lectura márgenes — ej. "Margen Toyota estable pero Crown comprimido por mix"]`
- **Body:** Tabla margen bruto:
  - Global
  - Por marca
  - Tendencia 12 meses
  - vs benchmark industria
- **Footer:** Marca con mayor oportunidad
- **Generador:** AI Márgenes
- **Validador:** Juan Carlos
- **Sub-dashboard:** `db-margenes` (por marca × por mes, simulador mix)

#### Slide 12 · Balance + Crédito
- **Header:** `[Lectura balance/crédito — ej. "D/E 0.41 estable, $XM idle, ahorro YK rebalanceo"]`
- **Body:**
  - Balance mes vs mismo mes PY vs Dic PY
  - D/E (total + bursátil)
  - Utilización líneas (7 bancos)
  - Tasa ponderada vs tasas individuales
  - Ahorro potencial rebalanceo
- **Footer:** Acción recomendada (rebalanceo, cancelación línea cara, etc.)
- **Generador:** AI Crédito
- **Validador:** Juan Carlos
- **Sub-dashboard:** `db-banking` (simulador líneas)

### FASE 4 — DECISIONES

#### Slide 13 · What-Ifs Pre-cargados
- **Header:** `Sensibilidades del periodo + invitación a demo en vivo`
- **Body:**
  - **WI-1 (pre-cargado):** Precio +5% en Bolivia — impacto en margen, unidades estimadas, P&L
  - **WI-2 (pre-cargado):** Mix shift +20% a Crown-BYD — impacto en margen ponderado, inventario, cash
  - Invitación al GG/CFO a preguntar al chat en vivo
- **Footer:** "Pregunte al chat: ¿qué pasa si...?"
- **Generador:** Chat Agent (output cacheado)
- **Validador:** Edwin

#### Slide 14 · Decisión Estructural en Evaluación
- **Header:** `Separación de activos de Real Estate en entidad independiente — framing para discusión`
- **Body:**
  - Por qué se evalúa (limpieza de cifras automotrices, gobernanza, valuación)
  - Pros / contras (alto nivel, sin análisis profundo en MVP)
  - Comparables (qué hicieron otros grupos LATAM)
  - Próximos pasos para análisis detallado
- **Footer:** Decisión solicitada al directorio: ¿se autoriza el análisis profundo?
- **Generador:** AI Financiero (framing) + AI Económico (comparables)
- **Validador:** Edwin + Boris

### FASE 5 — CIERRE

#### Slide 15 · Puntos a Trabajar — Próximo Directorio
- **Header:** `Compromisos del mes + carry-forward`
- **Body:** Tabla 5-8 items:
  - Punto a trabajar
  - Owner
  - Fecha compromiso
  - Estado (nuevo / en curso / completado)
- **Incluye carry-forward del directorio anterior** con estado actualizado
- **Footer:** "Próximo directorio: [fecha]"
- **Generador:** Orchestrator (reconcilia alertas de cada agente + items del chat)
- **Validador:** Edwin

## Sub-dashboards (drill-down)

| Dashboard | Origen slide | Contenido | Estilo |
|---|---|---|---|
| `db-ventas` | Slide 6 | Vehículos por modelo y canal | `slide-d-vehiculos` Intermex |
| `db-inventario` | Slide 9 | Heatmap aging + flujo ZOFRI → tránsito → Bolivia | `slide-d-supplychain` Intermex |
| `db-banking` | Slide 12 | Simulador líneas bancarias | `slide-d-banking` Intermex |
| `db-balance` | Slide 12 | Balance interactivo con tooltips | `slide-d-balance` Intermex |
| `db-margenes` | Slide 11 | Margen por marca × por mes + simulador mix | nuevo |

## Anexos (no en deck principal, solo link)

- Histórico 10 años completo (cifras del PDF Mayo 2026 hacia atrás)
- Detalle por modelo Toyota (los 23 modelos)
- Reconciliación entre fuentes de revenue
- Tablas de líneas bancarias detalladas

## Sign-off

- [ ] Edwin aprueba 15 slides + estructura (W1 sync 2026-05-26)
- [ ] Juan Carlos aprueba slides 2, 4, 5, 8, 10, 11, 12 (financieros) (W2)
- [ ] GG (Jerónimo?) revisa slides 5, 6, 7 (ventas) (W2)
- [ ] Boris revisa slide 14 (decisión estructural) (W3)
