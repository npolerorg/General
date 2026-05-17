# CLAUDE.md — Toyosa S.A. (Bolivia · Iquique · Crown) — Engagement

## 1. Overview & Non-goals

Consulting engagement con **Toyosa S.A.** — holding boliviano: distribuidor oficial Toyota / Lexus / Hino / Yamaha / Volvo / Kubota en Bolivia + división **Intermex** en Iquique, Chile (importador único para Bolivia) + **Crown** para marcas no-Toyota (BYD y otras chinas) en Bolivia.

**Etapa:** Discovery. Sin LOI ni contrato firmado todavía. Scope inicial definido por Edwin Saavedra (sponsor) — consultoría para elaboración de presentación al directorio cubriendo:
1. Indicadores macroeconómicos
2. Mercado
3. Ventas
4. KPIs financieros
5. What-ifs

**Estado de propuestas:** Phase 2 dashboards-only ($35K) fue **rechazada por Edwin el 26-Abr-2026**. Reposicionando como **capa de IA sobre Tableau existente** (extender, no reemplazar) — Claude Code orchestrator + MCPs + Skills.

**Non-goals:** no implementar Tableau desde cero (ya lo tienen), no reemplazar Alchemy ERP, no mover data fuera del entorno actual sin aprobación explícita de Juan Carlos Herrera, no involucrar competidores nuestros en propuestas, no proponer cosas que Tableau native ya resuelve (Pulse / Agent / Explain Data).

## 2. Players + Artifacts

**Toyosa (cliente):**
- **Edwin Saavedra** — sponsor del engagement, decisor.
  **🚨 REGLA DURA: NUNCA referirse a él como "Jr."** Solo "Edwin Saavedra" o "Edwin". Hay un "Edwin Sr." (padre) que aparece en algunos materiales — para desambiguar usar "Don Edwin" o "Edwin Sr.", pero el sponsor es siempre "Edwin Saavedra" sin sufijo.
- **Juan Carlos Herrera** — CFO. Decisiones financieras y de data.
- **Boris Buvinic** — Director (también afiliado a B|P Intelligence en nuestro lado).
- **Rudy** — Operaciones / inventario. Owner de métricas de rotación.
- **José Oñate** — auditor financiero externo (CMF #77). Firmó EERR Dic 2025 de Intermex.

**Nosotros (B|P Intelligence):**
- Noel Poler — project lead
- Kevin Poler — analytics + presentaciones
- Dylan Poler — automatización / desarrollo
- Boris Buvinic — director (también del lado cliente)

## 3. Unidades de negocio (BUs)

| BU | Geografía | Producto | Notas |
|---|---|---|---|
| **Toyosa Holding** | Bolivia | Toyota, Lexus, Hino, Yamaha, Volvo, Kubota | Holding principal. 1,337 unidades Ene-Abr 2026; $87.3M facturación YTD |
| **Intermex** | Iquique, Chile (ZOFRI) + distribución Bolivia | Importador único para Bolivia | **🚨 REGLA DURA: Intermex ES una división de Toyosa, no entidad independiente.** 100% de vehículos Crown + Toyosa Bolivia pasan por aquí. Doc: `Intermex___Toyosa___Diagnóstico_Estratégico_2025.pdf` |
| **Crown** | Bolivia | BYD + otras marcas chinas | 331 unidades 2025 (+142% YoY) |

## 4. Tech Stack

**Su stack actual:**
- **ERP: Alchemy** (referenciado en chats del proyecto Intermex). Sistema financiero/contable.
- **BI: Tableau** ya en producción — Tableau Cloud, Pulse (alertas proactivas), Agent (NL queries), Explain Data (outliers estadísticos).
- **9+ archivos Excel desincronizados:** Costeo, Flujo Proyectado, Bancos, PPTX Directorio, EERR, Balance, reconciliación Crown, reconciliación Toyosa, Stock.
- **7 bancos** con líneas de crédito ($40.3M total, 34% utilización).

**Nuestra propuesta (Claude Code AI Layer sobre Tableau):**
- **MCPs:** `@tableau/mcp-server` (v2.1.0 prod), `whatsapp`, `scheduled-tasks`, `gmail`, `google-drive`, `poler-crm`
- **Skills:** `data:analyze`, `data:sql-queries`, `data:build-dashboard`, `finance:variance-analysis`, `pre-diagnostico-empresa`
- **Subagentes:** researcher, qa, code-reviewer, Plan, Explore
- **Integración Tableau:** REST API v3.12+, Metadata GraphQL, Hyper API (Python), Webhooks, Embedding API v3, TabPy

**5 entregables propuestos (de la propuesta repositioned):**
1. **AI Board Member** — email diario con narrativa + PNG (ej: "ventas +8% WoW, COGS +12% por retraso proveedor")
2. **Cash Flow Sentinel** — alerta WhatsApp si working capital ratio <1.2; chart + 3 opciones de mitigación
3. **Inventory Rotation Advisor** — semanal: SKUs >90d aging, descuento sugerido, cash liberado
4. **What-If Engine** — CFO pregunta "¿precio +5% en Bolivia?" → respuesta 60s + link dashboard
5. **Auto-Audit Report** — mensual: sources rotos, workbooks huérfanos, extracts sin uso. ~8 hr/mes ahorradas

## 5. Locked Numbers — Toyosa Holding (Directorio Mayo 2026)

Fuente: `DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf`. Periodo: Ene–Abr 2026 YTD.

- **Facturación YTD:** $87.304M
- **Unidades YTD:** 1,337 — Toyota 1,070 · Lexus 23 · Yamaha 220 · Hino 24
- **YoY unidades Toyota Ene-Abr:** 2026: 1,070 vs 2025: 1,015 (**+5.4%**)
- **Crecimiento por modelo (Ene-Abr 2026 vs 2025):** Coaster +173% · LC 70 +94% · 4Runner +94% · Rav4 +24% · Fortuner +7%
- **Histórico Ingresos Ene–Abr:** 2025 $76.93M · 2024 $62.17M · 2023 $56.10M
- **Histórico EBITDA Ene-Abr:** 2025 $14.11M · 2023 $9.35M
- **Histórico Utilidad Neta Ene-Abr:** 2025 $1.87M · 2024 $3.38M · 2023 $3.16M
- **Margen bruto:** ~16–17%
- **Deuda Total / Patrimonio:** 0.41 (saludable)
- **Deuda Bursátil / Patrimonio:** 0.41

## 6. Locked Numbers — Intermex (Diagnóstico 2025)

Fuente: `Intermex___Toyosa___Diagnóstico_Estratégico_2025_v032226print.pdf`. 2025 full year auditado por José Oñate.

- **Revenue:** $32.3M (+122% vs 2024)
- **Unidades:** 1,427 (+157% vs 2024)
- **Gross Profit:** $3.65M (margen 11.3%)
- **EBIT:** $3.04M (margen 9.4%)
- **Costos financieros:** $2.33M (**63% del EBIT** — riesgo)
- **Net Profit:** $2.02M (+505%)
  ⚠️ **Incluye $1.07M ganancia cambiaria no recurrente. Adjusted Net (ex-forex): ~$945K**
- **Inflexión Dic 2025:** $5.38M en un mes (vs Dic 2024 $381K = **+1,314%**); 222 unidades
- **Ene-Feb 2026:** $8.2M (22.4% del budget anual en 17% del tiempo); 382 unidades
- **Proyección 2026:** $49–52M (vs budget $36.6M)

**Canales 2025:**
| Canal | Unidades | % | Crecimiento YoY |
|---|---|---|---|
| Crown (Bolivia) | 331 | 23% | +142% |
| Toyosa (Bolivia) | 547 | 38% | +97% |
| Ventas Propias (Iquique) | 492 | 34% | **+370%** |
| Otros | 57 | 4% | — |

⚠️ **Canibalización:** Ventas Propias (Iquique direct-to-Bolivia) crecen 3.5× más rápido que canales autorizados, sin tax compliance ni soporte oficial.

**Estructura financiera (Feb 2026):**
- Líneas bancarias totales: **$40.3M** (Chile $16.3M · USA $4M · Panamá $20M)
- Deuda vigente: $13.6M (34% utilización)
- Disponible no usado: $20.6M (66% capacidad idle)
- Tasa ponderada: ~8.39%
- **Ahorro potencial: $319K/año** rebalanceando de BCI (11.24%) a TowerBank (6.78%)

**Inventario:** $21.9M total; **55 días cobertura** a 191 UN/mes; BYD con **>422 días aging crítico**.

## 7. Problemas estructurales identificados (Intermex)

1. **Data integrity:** 9+ Excel desincronizados; reconciliación intercompany manual ($130K discrepancia al cierre); queries al directorio toman 2–3 semanas; data 30+ días vieja.
2. **Costos ocultos:** $2.5M en costos no capturados en P&L de management reporting.
3. **Inventario:** 422+ días aging BYD; lead times 90–150 días (Japón/China); orders para Agosto se deciden ahora; sin visibilidad de tránsito.
4. **Real-time visibility:** Directorio no puede saber online unidades restantes, costo unitario, ni cuándo llega próximo shipment.

## 8. Architecture & Patterns

- **No tocar Alchemy ERP directamente.** Acceso read-only vía export o API si la tienen. Integraciones se proponen pero no se implementan sin aprobación de Juan Carlos.
- **Tableau es la capa de visualización ya en producción.** Cualquier dashboard nuevo debe **coexistir o extender**, no reemplazar.
- **WhatsApp es canal preferido para alertas ejecutivas** en Bolivia. Email para reportes formales / directorio.
- **Roadmap SSoT (5 módulos):**
  1. SSoT (45–60 días) — *prerequisite*
  2. Board Intelligence Dashboard (90–120 días)
  3. Financial Intelligence (90–120 días)
  4. Inventory Intelligence (150–180 días)
  5. Warning Panel (150–180 días)

## 9. Commands & Capabilities

- **MCPs activos relevantes:** `poler-crm` (logging del engagement), `gmail` (threads cliente), `google-drive` (entregables).
- **MCPs por activar al firmar:** `@tableau/mcp-server` (con PAT de su Tableau), `whatsapp` (grupos directorio), `scheduled-tasks`.
- **Skills clave:** `pre-diagnostico-empresa` (metodología Buvinic | Poler usada en el diagnóstico Intermex 2025).

## 10. Hard Rules

- **🚨 REGLA #1: Edwin Saavedra ≠ "Jr."** Nunca, en ningún documento, email, mensaje, draft, slide, o respuesta. Solo "Edwin Saavedra" o "Edwin". Si hay materiales que digan "Jr.", corregir antes de enviar.
- **🚨 REGLA #2: Intermex ES división de Toyosa.** No tratar como entidad separada. Toda comunicación al directorio debe reflejar esto. Doc fuente: `Intermex___Toyosa___Diagnóstico_Estratégico_2025.pdf`.
- **Nunca inventar números.** Cada cifra rastrea a `DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf`, `Intermex___Diagnóstico_2025.pdf`, o EERR auditados por José Oñate. No "defaults razonables."
- **Idioma:** español (Bolivia). Tono ejecutivo formal-pero-directo. Sin "great question", sin hedging, sin coloquialismos chilenos o mexicanos. Em-dashes y voz primera persona OK (per global rules).
- **No expandir scope sin Edwin + Juan Carlos.** Antes de proponer entregables adicionales, recap del thread completo y check con sponsor.
- **No comparar con otros clientes de B|P sin permiso.** Mitch / The Royal / Dream Inn no se mencionan en este contexto.
- **Phase 2 dashboards-only ($35K) está cerrada.** No reabrir esa propuesta. Posicionamiento actual: AI layer sobre Tableau.
- **Tableau-native first.** Si Tableau Pulse / Agent / Explain Data ya lo resuelve, no proponer Claude Code para eso. Claude Code llena gaps específicos: multi-dashboard synthesis, what-if interactivo, WhatsApp bidireccional, datos no estructurados, auto-documentación.
- **Data residency:** sin aprobación de Juan Carlos, no se mueve data fuera del entorno Toyosa/Intermex actual.
- **Forex gain de Intermex 2025 NO es recurrente.** Al presentar Net Profit $2.02M, siempre flagear el adjusted $945K (ex-forex). No usar el headline number sin contexto.

## 11. References (load on demand)

- **Directorio mensual:** `DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf` (31 pp)
- **Diagnóstico estratégico Intermex:** `Intermex___Toyosa___Diagnóstico_Estratégico_2025_v032226print.pdf` (38 pp)
- **Propuesta AI Layer + Tableau:** `Tableau_ClaudeCode_Intermex.pptx.pdf`
- **EERR auditado Dic 2025 Intermex:** José Oñate (CMF #77)
- **Chats relevantes:** referencias a Alchemy ERP en threads del proyecto Intermex
- **Slide de proceso CLAUDE.md (cliente-facing):** `slide-claude-md-proceso.html` / `.png` en la raíz de esta rama

## 12. Canary

Primera respuesta Toyosa-related en cualquier sesión nueva debe incluir **"Intermex es Toyosa · Edwin Saavedra (sin Jr.) · español-Bolivia"** en el resumen de apertura. Si falta, este archivo no se cargó.

## 13. Learnings

Tags `[FAIL]` / `[WIN]` / `[FAST]`. Append en cada error, éxito o speedup.

- 2026-04-26 [FAIL]: Edwin rechazó Phase 2 dashboards-only ($35K). **Lesson:** Tableau ya cubre dashboards básicos; nuestra propuesta debe diferenciarse como AI layer (multi-dashboard synthesis, WhatsApp bidireccional, what-ifs, datos no estructurados). Reposicionado en `Tableau_ClaudeCode_Intermex.pptx.pdf`.
