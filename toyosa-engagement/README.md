# toyosa-engagement

Working repository for the engagement between **B|P Intelligence** (Noel Poler)
and **Toyosa S.A.** (holding boliviano distribuidor de Toyota y BYD). El
entregable central es el **Sistema de Directorio Mensual con Agentes IA**: un
generador automatizado del deck mensual de Directorio para Toyosa Holding,
poblado por agentes especializados a partir de datos verificados.

El deck no es un documento estático: es un programa que se ejecuta y produce
un HTML autocontenido de 16 slides listo para presentación o exportación a
PDF.

## Estructura del repositorio

```
toyosa-engagement/
├── 00-overview/          alcance, contactos, glosario
├── 01-legal/             NDA, propuesta, contratos, cumplimiento normativo
├── 02-financial/         balances, bancos, P&L, flujo, presupuesto, impuestos
├── 03-operations/        inventario, ventas, logística, transacciones
├── 04-it-and-data/       Tableau, Alchemy, accesos, arquitectura
├── 05-macro/             reportes, estadísticas, noticias, investigación IA
├── 06-board-cycles/      un ciclo de Directorio por mes
├── 07-deliverables/      decks finales (HTML, PDF) y reportes (DOCX)
└── 08-deck-generator/    el generador del deck (Node + Handlebars)
```

## Cómo correr el generador

```bash
cd 08-deck-generator
npm install
node generator.js bu=holding periodo=2026-06
```

Salida: `08-deck-generator/output/toyosa-holding-2026-06.html`

Argumentos:
- `bu`: unidad de negocio (`holding`, `intermex`, `crown`)
- `periodo`: mes objetivo en formato `YYYY-MM`

## Estado actual

Este es el **scaffold inicial**. Contiene:

- Estructura de carpetas completa con READMEs descriptivos
- Generador funcional con 16 templates de slides (Handlebars)
- Estilos B|P (navy, ámbar, esmeralda, carbón) en CSS único
- Slide 02 (Macro) con visual completo de los 7 indicadores y semáforos en
  gris (placeholder)
- Las otras 15 slides son stubs visuales con metadata de agente y validador

**Pendiente para sesiones futuras:**

- Documentos legales reales en `01-legal/`
- Datos financieros y operativos reales en `02-financial/` y `03-operations/`
- Especificación de los 7 indicadores macro y umbrales de semáforo
- Conexiones MCP a Tableau y Alchemy
- Los 7 agentes IA (Económico, Industria, Ventas, Inventario, Financiero,
  Márgenes, Crédito)
- El agente de chat embebido en el deck
- El pipeline de números verificados

## Convenciones

- Tono español-Bolivia formal-directo en outputs del deck
- Sin emojis, sin guiones largos en prosa (guiones largos solo en tablas
  como placeholder de N/A)
- Comentarios de código explican el porqué, no el qué
- Cada cifra del deck rastrea a su fuente (pestaña Tableau o celda Alchemy)
- Real Estate excluido de cifras automotrices salvo indicación explícita
