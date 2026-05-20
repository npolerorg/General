# Prompt para Claude.ai — Plan Engagement Toyosa Directorio MVP

**Uso:** copiar y pegar todo lo de abajo en una nueva conversación de Claude.ai (web). El output será un artifact HTML profesional que puedes:
- Ver renderizado en vivo (con infográficos SVG inline)
- Imprimir a PDF (Cmd/Ctrl+P)
- Copiar el contenido y pegar en un Google Doc (Google Docs respeta markdown al pegar desde HTML)

**Versión:** 2026-05-20
**Audiencia interna B|P:** Noel, Boris
**Audiencia externa al compartir:** Edwin Saavedra (sponsor), Juan Carlos Herrera (CFO), Israel, Manuel Diaz, Boris Buvinic (también director Toyosa)

---

## PROMPT (todo desde aquí hacia abajo se pega en Claude.ai)

---

Eres un consultor senior de **B|P Intelligence**, una firma boutique de consultoría en inteligencia de negocios e implementación de IA para empresas familiares medianas en LATAM. Tu output debe tener calidad **consulting-grade** (similar a un deck de McKinsey/BCG/Deloitte, traducido a doc anexo de engagement letter).

## Tu tarea

Generá un **documento profesional en formato HTML artifact** que sirva como **anexo al engagement letter** entre B|P Intelligence y Toyosa S.A. (Bolivia). El documento describe el plan del MVP de 30 días para construir el **nuevo deck del directorio mensual de Toyosa** mediante una constelación de agentes IA + orchestrator + chat agent conversacional.

El documento será:
- Compartido internamente en B|P (Noel + Boris) para alineación
- Anexado al engagement letter con Toyosa (firma Edwin Saavedra como sponsor)
- Usado en el sync semanal del Martes 2026-05-26 (W1 close)

## Audiencia

**Primaria:** Edwin Saavedra (asesor estratégico Toyosa, sponsor del proyecto, hijo del CEO Jerónimo). Lectura ejecutiva, rápida, decisorial.

**Secundaria:** Juan Carlos Herrera (CFO, validador financiero), Israel (IT/Tableau lead), Manuel Diaz (Alchemy ERP lead), Boris Buvinic (director Toyosa además de partner B|P).

**Terciaria:** Directorio Toyosa (cuando Edwin presente el plan).

## Look & feel B|P Intelligence

- **Palette:** gris carbón `#1f2937` para texto principal · azul navy `#0f2c4d` para títulos · accent ámbar `#b8860b` para callouts y números clave · fondo `#ffffff` con secciones diferenciadas en `#f8fafc`
- **Typography:** títulos en serif elegante (Source Serif Pro, Crimson Text, o similar) · body en sans-serif (Inter o DM Sans) · números en variante tabular
- **Layout:** márgenes generosos (≥48px), una idea por sección, mucho whitespace, infográficos centrados con caption corta
- **Header documento:** logo placeholder izquierda ("B|P INTELLIGENCE" en caps), título centro, fecha derecha
- **Footer:** "Confidencial · B|P Intelligence x Toyosa S.A. · 2026" en cada página
- **Idioma:** **español-Bolivia formal-directo**. Sin "great question", sin hedging, sin coloquialismos. Tono ejecutivo de consulting senior.
- **Sin emojis. Sin em dashes.** Usar guiones largos solo en tablas. Voz consulting clásica.

## Estructura del documento (10 secciones)

### 1. Carátula / Cover

- Título: **"Plan de Implementación · Sistema de Directorio Mensual con Agentes IA"**
- Subtítulo: **"MVP 30 días · Toyosa Holding"**
- Anexo: **"Anexo Técnico al Engagement Letter"**
- Fecha: 20 de mayo de 2026
- Preparado por: B|P Intelligence
- Para: Sr. Edwin Saavedra · Toyosa S.A.
- Versión: 1.0

### 2. Resumen ejecutivo (½ página)

Tres bullets dorados:
- **Qué entregamos:** un sistema que reemplaza el PDF de 29 láminas del directorio por un deck HTML interactivo de 15 láminas + 5 sub-dashboards, generado mensualmente por 7 agentes IA especializados, navegable y editable por el Gerente General mediante chat conversacional.
- **En cuánto tiempo:** MVP listo en 30 días (cierre target ~19 de junio de 2026), primer ciclo real con cifras del cierre Mayo 2026.
- **Para qué:** que el directorio reciba un análisis con contexto de decisión (benchmarks de industria, rolling forecast, amazing facts, items de acción carry-forward) en lugar de cifras históricas sobrecargadas.

Cerrar con una frase: "Este anexo describe el alcance, el proceso de trabajo conjunto, los entregables, las fuentes de datos requeridas y los criterios de éxito del MVP."

### 3. Contexto y objetivos

**Punto de partida:** describir brevemente el dolor (deck actual de 29 láminas, sobrecargado de histórico 10 años, redundancias en deuda/gastos, sin benchmarks, sin rolling forecast, sin carry-forward de items, sin amazing facts).

**Objetivo del MVP:** entregar el nuevo deck Holding para el directorio de junio 2026 con la siguiente filosofía editorial:
- Un punto clave por lámina
- Cada cifra rastreable a su fuente
- Macro → micro (contexto país → industria → resultados → decisiones)
- Footer con implicación o acción propuesta
- Histórico limitado a 3 años; detalle por modelo a sub-dashboards

**Alcance MVP confirmado:** Toyosa Holding únicamente. Las divisiones Intermex (importadora) y Crown (electromovilidad) se entregan en fase 2 mediante parametrización del mismo sistema (sin re-build).

### 4. Proceso de trabajo (7 pasos)

Presentá esto como un **diagrama horizontal de flujo (infográfico SVG)** con 7 etapas conectadas por flechas. Cada etapa con: ícono simbólico, título, owner, duración estimada.

| # | Etapa | Owner | Duración |
|---|---|---|---|
| 1 | Elaboración del plan (este documento) | B|P (Noel) | Completado · 2026-05-19 → 2026-05-20 |
| 2 | Aprobación del plan | Edwin Saavedra | Sync Martes 2026-05-26 |
| 3 | Diseño de templates de las 15 láminas | B|P (Noel + Boris) | W2 · 2026-05-26 → 2026-06-02 |
| 4 | Aprobación de templates | Edwin Saavedra | Sync Martes 2026-06-02 |
| 5 | Definición de las apps que generan la presentación | B|P + Toyosa IT | W2-W3 · 2026-06-02 → 2026-06-09 |
| 6 | Desarrollo por el equipo de sistemas Toyosa | Manuel Diaz + Israel (con apoyo B|P) | W3-W4 · 2026-06-09 → 2026-06-16 |
| 7 | MVP listo y entregado para directorio Junio | B|P + Toyosa | ~2026-06-19 |
| 8 | Definición fase 2 y apoyo necesario | Edwin Saavedra | Post-directorio Junio |

Después del diagrama, una sección de **gobernanza:**
- Sync semanal cada Martes 17:00 (Edwin + B|P)
- Decisiones de scope: Edwin único decisor
- Decisiones de cifras financieras: Juan Carlos único validador
- Decisiones de templates de láminas: B|P propone, Edwin aprueba

### 5. Arquitectura del sistema

Infográfico SVG de 5 capas (de arriba abajo):

```
[CHAT AGENT — interfaz GG/CFO en lenguaje natural]
        ↓
[ORCHESTRATOR — DAG mensual · detecta puntos clave · arma deck]
        ↓
[7 AGENTES IA: Económico · Industria · Ventas · Inventario · Financiero · Márgenes · Crédito]
        ↓
[VERIFIED NUMBERS — cifras lockadas por periodo con fuente trazable]
        ↓
[RENDERER — markdown → HTML interactivo con gráficos]
```

Bajo el diagrama, una **tabla descriptiva** de las 5 capas con qué hace cada una en 1-2 líneas.

### 6. Estructura del deck — 15 láminas + 5 sub-dashboards

Tabla profesional con todas las 15 láminas, agrupadas en 5 fases. Por cada lámina: número, fase, título del punto clave (placeholder para el primer ciclo), agente que la genera, validador.

| # | Fase | Lámina | Agente | Validador |
|---|---|---|---|---|
| 0 | Intro | Cover + Amazing Facts (3-5 desviaciones del mes) | Orchestrator | Edwin |
| 1 | Intro | Conclusión del Gerente General | Chat Agent | GG |
| 2 | Macro | Bolivia 2026: PIB, IPC, reservas BCB, tipo de cambio oficial vs paralelo | AI Económico | Juan Carlos |
| 3 | Industria | Mercado automotriz Bolivia: registros país, share Toyosa | AI Industria | Edwin |
| 4 | Industria | Benchmark vs industria: margen, rotación, comparables LATAM | AI Industria | Juan Carlos |
| 5 | Ventas | Ventas Holding YTD excluyendo Real Estate | AI Ventas | GG |
| 6 | Ventas | Drill por marca con flag automático ±10% YoY | AI Ventas | GG |
| 7 | Ventas | Drill por sucursal/dealer + cambios de tendencia | AI Ventas | GG |
| 8 | Ventas | Rolling forecast con banda de confianza | AI Ventas | Juan Carlos |
| 9 | Ventas | Salud de inventario: cobertura + aging | AI Inventario | Rudy |
| 10 | Financiero | P&L resumen: Revenue, GP, EBITDA, Net | AI Financiero | Juan Carlos |
| 11 | Financiero | Márgenes global + por marca + tendencia | AI Márgenes | Juan Carlos |
| 12 | Financiero | Balance + crédito: D/E, líneas, ahorro rebalanceo | AI Crédito | Juan Carlos |
| 13 | Decisiones | What-Ifs pre-cargados + demo en vivo via chat | Chat Agent | Edwin |
| 14 | Decisiones | Decisión estructural en evaluación: separación Real Estate (framing) | AI Financiero | Edwin / Boris |
| 15 | Cierre | Puntos a trabajar + carry-forward del directorio anterior | Orchestrator | Edwin |

**Sub-dashboards (drill-down interactivo):**
- `db-ventas` — vehículos por modelo y canal
- `db-inventario` — heatmap de aging + flujo ZOFRI → tránsito → Bolivia
- `db-banking` — simulador de líneas bancarias
- `db-balance` — balance interactivo con tooltips de cambio
- `db-margenes` — margen por marca × por mes con simulador de mix

### 7. Apps y componentes a desarrollar

Tres apps principales. Por cada una: nombre, propósito, owner desarrollo, ETA, dependencias.

**App 1 · Generador del deck**
- Stack: Next.js 14 + TypeScript (alternativa: scripts Python + Jinja templates) sobre el template HTML actual
- Función: orquesta el ciclo mensual, consume verified-numbers, renderiza el deck
- Owner desarrollo: Manuel Diaz (Toyosa IT) con apoyo B|P
- ETA: W3 (primer draft funcional)

**App 2 · Chat agent embebido**
- Stack: backend serverless (Netlify Functions o Vercel) + Claude API (Anthropic SDK)
- Función: parsea intents en lenguaje natural, dispatcha a tools (update-forecast, override-number, propose-ideas, what-if, lock-deck, etc.), persiste audit-log
- Owner desarrollo: B|P + Manuel
- ETA: W3 (v0 con 3 tools), W4 (completo con 9 tools)

**App 3 · Pipeline de verified-numbers**
- Stack: Python + extractors (Tableau REST API, Alchemy export, Excel reader)
- Función: ETL diario que llena `verified-numbers/YYYY-MM/` desde fuentes
- Owner desarrollo: Manuel + Israel con apoyo B|P
- ETA: W2 (Tableau) → W3 (Alchemy + Excel)

### 8. Agentes IA a crear

Tabla profesional con los 7 agentes especializados. Por cada uno: nombre, dominio, inputs principales, outputs (qué láminas alimenta), validador, prioridad de desarrollo.

| Agente | Dominio | Inputs principales | Láminas | Validador |
|---|---|---|---|---|
| AI Económico | Contexto macro Bolivia | INE, BCB, IMF, World Bank, news | Lámina 2 + contexto a 3, 8, 14 | Juan Carlos |
| AI Industria | Mercado automotriz país y benchmarks | ANCB, Toyota LATAM, Tableau share | Láminas 3, 4 | Edwin / Juan Carlos |
| AI Ventas | Ventas Holding por marca, sucursal, forecast | Alchemy, Tableau, budget, lead times | Láminas 5, 6, 7, 8 + db-ventas | GG |
| AI Inventario | Salud de stock y tránsito | Excel Stock, shipments Intermex | Lámina 9 + db-inventario | Rudy |
| AI Financiero | P&L y framing estructural Real Estate | EERR mensual, Balance, Alchemy P&L | Láminas 10, 14 | Juan Carlos |
| AI Márgenes | Márgenes global, por marca, tendencia | Alchemy P&L por brand, costeo | Lámina 11 + db-margenes | Juan Carlos |
| AI Crédito | Balance y líneas bancarias | Balance, Bancos.xlsx (7 bancos) | Lámina 12 + db-banking + db-balance | Juan Carlos |

Mencionar cross-cutting rules heredadas en cada agente:
- Nunca inventar cifras (cita celda/tab + fuente)
- Excluir Real Estate de cifras automotrices
- Si data falta, output explícito "DATA GAP", no estimar
- Idioma español-Bolivia formal-directo
- Forex Intermex no recurrente: si se reporta grupo consolidado, dos findings paralelos (headline + adjusted)

### 9. Skills a desarrollar (post-MVP, semana 5+)

Empaquetar el sistema como **skill reutilizable** invocable como slash command:

```
/toyosa:directorio-mensual bu=holding periodo=2026-07
/toyosa:directorio-mensual bu=intermex periodo=2026-07   (post-MVP)
/toyosa:directorio-mensual bu=crown periodo=2026-07      (post-MVP)
```

Parámetros: `bu` (holding · intermex · crown), `periodo` (YYYY-MM), `--refresh` (re-query fuentes), `--lock` (freeze + render final).

**Skills secundarios:** `simplify` para code review post-cambio, `verify` para validación visual de cada lámina, `data:validate-data` para reconciliación entre fuentes.

### 10. MCPs (Model Context Protocol) requeridos

Tabla profesional con los MCPs necesarios y el estado de cada uno.

| MCP | Función | Estado | Gating |
|---|---|---|---|
| `tableau-mcp` | Lectura workbooks Ventas/Financiero/Inventario + Metadata GraphQL | Pendiente PAT Israel | Gating W2 |
| `alchemy-mcp` (custom) | Lectura módulo Ventas, P&L, Balance, CxC, CxP de Alchemy ERP | A construir si Alchemy expone API; fallback CSV export | Gating W2 |
| `google-drive` | Acceso a 9 archivos Excel (Costeo, Bancos, EERR, Balance, Stock, etc.) | Pendiente shared folder Juan Carlos | Gating W2 |
| `gmail` | Notificación a validadores con link al deck | Listo | — |
| `scheduled-tasks` | Disparo automático del ciclo mensual día 5 | Listo | Post-MVP |
| `poler-crm` | Tracking del engagement | Listo | — |

### 11. Fuentes de datos requeridas

Esta es **la sección crítica para el sync del Martes 26-May**. Toda la data que necesitamos para que el sistema funcione. Marcar las gating de W2.

**Solicitud formal de accesos** (todo read-only, ningún sistema se modifica):

| # | Fuente | Tipo de acceso | Mecanismo preferido | Fallback | Owner Toyosa | Gating |
|---|---|---|---|---|---|---|
| 1 | Alchemy ERP | Read-only: Ventas, Inventario, P&L, Balance, CxC, CxP | API REST con API key + IP allowlist | Export CSV diario a Drive | Manuel Diaz | **W2** |
| 2 | Tableau Cloud | PAT token, scope workbooks Ventas/Financiero/Inventario + Metadata GraphQL | PAT project-level (90d expiry) | Service account read-only | Israel | **W2** |
| 3 | Google Drive 9 Excel | Shared folder read-only | Drive shared con `noel@poler.org` | OneDrive shared | Juan Carlos | W2 |
| 4 | Balance mensual | Cierre día 5 con formato consistente | Drive auto-upload | Email a address dedicado | Juan Carlos | W3 |
| 5 | Macro Bolivia | INE, BCB, IMF WEO, World Bank | WebFetch directo (sin auth) | — | — (público) | — |
| 6 | Industria automotriz | ANCB, Asoc. Importadores, Toyota LATAM monthly | WebFetch + subscripción ANCB | PDF manual upload | Edwin | W2 |
| 7 | Inventario tránsito | Shipments Intermex → Bolivia con fecha embarque + ETA | Excel Stock + email shipping agent | Update semanal Rudy | Rudy | W3 |
| 8 | Líneas de crédito | Utilización mensual, tasa por banco, covenants | Excel Bancos.xlsx (7 bancos) | Reporte tesorería | Juan Carlos | W3 |

**Gating items críticos (sin estos no arranca W2):** items 1 (Alchemy) + 2 (Tableau).

### 12. Cronograma 30 días

Infográfico tipo **timeline horizontal** con 4 semanas + el directorio. Cada semana con: hitos clave, demo entregable al sync del Martes, riesgos.

| Semana | Fechas | Hitos | Demo al sync Martes |
|---|---|---|---|
| W1 | 19 → 26 mayo | Repo creado · 15-slide spec aprobada · Lista de accesos enviada · Esqueletos 7 agentes · Baseline verified-numbers/2026-05 · Visual scaffold HTML · Chat agent UX wireframe | Wireframe del deck + chat panel |
| W2 | 26 mayo → 2 junio | Tableau PAT activo · Alchemy export confirmado · AI Económico prototipo end-to-end · AI Industria scaffolded · Orchestrator stub · Chat agent v0 (2-3 tools) | Lámina 2 generada en vivo + chat respondiendo a 2 comandos |
| W3 | 2 → 9 junio | Los 7 agentes producen first drafts · Chat agent completo (9 tools) · Sub-dashboards db-ventas y db-inventario · Láminas 0-13 en DRAFT-R1 · Cross-agent synthesis (amazing facts) | Deck R1 completo + 1 sesión de chat-edit en vivo |
| W4 | 9 → 16 junio | Iteración R2-R3 con validadores · Lámina 14 (RE framing) aprobada · Lámina 15 (puntos a trabajar) · Dry run con Juan Carlos + Edwin · 2 what-ifs pre-cargados | Deck APPROVED end-to-end |
| Directorio | ~19 junio | Lock del deck · HTML final entregado · PDF backup · Post-mortem agendado | Directorio real (o dry-run) |

### 13. Criterios de éxito del MVP

Lista de 6-8 criterios verificables:

1. Las 15 láminas del deck se generan automáticamente desde fuentes (Tableau / Alchemy / Excel / INE / BCB / ANCB) sin intervención manual.
2. Cada cifra del deck es trazable a su fuente con una sola búsqueda (tab + celda o documento + página).
3. El Gerente General puede editar cualquier lámina via chat en lenguaje natural ("aumentá el reforecast 10%") y ver el resultado en menos de 60 segundos.
4. El chat agent registra cada interacción en un audit-log inmutable que Juan Carlos puede reconciliar con los EERR.
5. El deck se entrega como HTML self-contained + backup PDF; puede verse sin internet en una laptop.
6. Real Estate está excluido por default de todas las cifras automotrices; cualquier inclusión queda explícitamente flageada.
7. El sistema detecta automáticamente "amazing facts" (desviaciones ≥ ±10% YoY o vs budget) y las eleva a la portada.
8. Los puntos a trabajar del directorio anterior aparecen en la lámina 15 con estado actualizado (carry-forward).

### 14. Fase 2 — definición post-MVP

Indicar que **Edwin define la fase 2 después del directorio de junio**, con apoyo de B|P para shaping. Lista de módulos candidatos (sin priorizar; eso lo decide Edwin):

- Deck Intermex standalone (parametrización del mismo sistema)
- Deck Crown standalone
- What-If Engine completo (más allá de los 2 pre-cargados y ad-hoc del chat)
- Inventory Intelligence completo (sugerencias automáticas de pedido por SKU)
- Warning Panel (alertas automáticas vía WhatsApp/email para covenants, aging, idle cash)
- SSoT total con reconciliación de las 9 fuentes Excel
- AI Board Member (email diario con headline del día para Edwin)
- Cash Flow Sentinel WhatsApp (alertas tesorería)
- Análisis profundo separación Real Estate (no framing — análisis completo)

### 15. Inversión y términos comerciales

Sección breve indicando que los términos económicos están en el cuerpo del engagement letter (este es solo el anexo técnico). Mencionar que B|P aporta:
- Tiempo de Noel (lead) + Boris (sparring estratégico)
- Acceso a la stack tecnológica B|P (Claude API, Netlify, etc.)
- Metodología pre-existente (skills, templates, MCPs)

Y que Toyosa aporta:
- Accesos a Alchemy, Tableau, Drive, Excel sources
- Tiempo de Manuel + Israel (~10 hrs/sem cada uno durante W2-W4)
- Validación de Juan Carlos (~3 hrs/sem en W2-W4)
- Decisiones de Edwin en cada Martes sync

### 16. Riesgos y mitigaciones

Tabla de 5-6 riesgos con probabilidad, impacto y mitigación:

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Alchemy no expone API → solo export CSV con lag 24h | Media | Medio | Fallback definido; el deck mensual no requiere real-time |
| PAT Tableau no aprobado por seguridad | Baja | Alto | Plan B: service account read-only; escalar Israel → CTO si necesario |
| Inconsistencias en cifras baseline ($82.64M vs $92.64M, $87M vs $94M) | Alta | Alto | Reconciliación con Juan Carlos en W1 antes de bloquear convención |
| Real Estate mezclado en fuentes sin split claro | Media | Alto | Identificación temprana W1-W2; agentes flagean cuando no pueden separar |
| Capacidad de Manuel + Israel para desarrollar en 30 días | Media | Alto | B|P aporta apoyo activo; ramp-down de B|P solo cuando Toyosa toma ownership |
| Cambio de scope durante el MVP | Media | Alto | Cualquier nuevo módulo va a fase 2; sync semanal con Edwin filtra alcance |

### 17. Anexo · Glosario de términos

Lista corta de términos técnicos del documento con su definición de 1 línea:
- **Agente IA:** módulo software autónomo que cumple una función específica usando un modelo de lenguaje grande con acceso a herramientas
- **Orchestrator:** componente que coordina la ejecución secuencial de los agentes
- **Chat agent:** interfaz conversacional que permite al usuario editar el deck en lenguaje natural
- **MCP (Model Context Protocol):** estándar abierto para conectar modelos de IA con fuentes de datos externas
- **Verified numbers:** repositorio inmutable de cifras del periodo, lockadas con su fuente trazable
- **Skill:** plantilla reutilizable que empaqueta un proceso completo invocable con un comando
- **DRAFT-R1/R2/R3:** estados de revisión de una lámina antes de ser APPROVED
- **What-If:** análisis de sensibilidad sobre un escenario hipotético
- **Carry-forward:** items de acción del directorio anterior que se traen al siguiente con estado actualizado
- **Amazing facts:** las 3-5 desviaciones más relevantes del periodo, elevadas a la portada
- **Forex no recurrente:** ajuste por efecto de tipo de cambio que no debe considerarse en la operación core (caso Intermex 2025)

---

## Infográficos requeridos (SVG inline en el artifact)

Generá los siguientes infográficos como SVG inline dentro del artifact HTML. Cada uno debe tener título y caption corta:

1. **Diagrama de 5 capas de arquitectura** (sección 5) — verticalmente apilado, flechas entre capas, palette navy + ámbar
2. **Flowchart horizontal del proceso de 7 pasos** (sección 4) — 7 cajas conectadas, con icono simbólico por etapa
3. **Mapa de fuentes de datos → agentes** (sección 11) — diagrama de nodos: 8 fuentes a la izquierda → 7 agentes al centro → 15 láminas a la derecha (líneas conectoras)
4. **Timeline 30 días Gantt-style** (sección 12) — 4 semanas + directorio, hitos por semana, milestones marcados
5. **Storyboard del deck** (sección 6) — grid 4×4 con las 16 láminas en miniatura, agrupadas por color de fase

Si SVG inline se vuelve demasiado complejo para alguno, usá ASCII-art profesional dentro de un `<pre>` con styling cuidado.

## Formato del output

- **Artifact HTML único, self-contained** (todos los estilos inline o en `<style>`, ningún recurso externo excepto Google Fonts).
- Debe verse profesional en pantalla y al imprimir a PDF (página A4, márgenes adecuados, page-break-inside controlado para tablas y secciones).
- Tablas con bordes sutiles, headers diferenciados, alternancia ligera de filas.
- Callouts importantes (gating items, riesgos críticos) en cajas con fondo ámbar suave.
- Número de página en footer si es factible con CSS print.

## Reglas hard (heredadas del engagement)

- **Edwin Saavedra** nunca como "Jr." en ninguna parte del documento.
- **Intermex** se refiere a una **división de Toyosa**, no una entidad separada.
- **Real Estate** se menciona explícitamente como excluido de cifras automotrices.
- **Sin emojis.** Sin em dashes. Sin coloquialismos.
- **Español-Bolivia** formal-directo.
- **Cifras del baseline (Mayo 2026)** rastreables al PDF "DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf"; cualquier mención de cifras debe traer la nota "Fuente: PDF Mayo 2026" o equivalente.
- **Tono:** consulting senior, no salesy, no académico, no fluff. Cada párrafo debe ganarse su lugar.

## Output esperado

Generá el artifact HTML completo en una sola pasada. Si el documento es muy largo, dividilo en secciones lógicas pero entregalo como un único artifact navegable (con índice interno).

Cuando termines, sumá un mensaje breve indicando:
- Cómo copiar el contenido a Google Docs (sugerencia: abrir el artifact en el browser, seleccionar todo con Cmd/Ctrl+A, copiar, pegar en Google Docs)
- Cómo exportar a PDF (Cmd/Ctrl+P → "Guardar como PDF")
- Qué áreas del documento conviene revisar primero con Edwin (riesgos, fuentes de datos, cronograma)
