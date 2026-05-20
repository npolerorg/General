# toyosa-directorio

Sistema de generación automatizada del **deck mensual del directorio de Toyosa S.A. (Bolivia)** mediante constelación de agentes IA + orchestrator + chat agent conversacional.

**Estado:** MVP en curso · 30 días · sponsor Edwin Saavedra · target ~2026-06-19.

**Alcance MVP:** Solo **Toyosa Holding**. Intermex y Crown vienen post-MVP vía parametrización del skill.

---

## Quickstart (W1 — scaffold)

```bash
# Abrir scaffold del deck en browser
open render/template-deck.html

# Ver spec lockada de las 15 slides
cat orchestrator/deck-spec.md

# Ver baseline de cifras (Mayo 2026)
cat verified-numbers/2026-05/locked.md

# Ver doc de acceso a data (enviar a Juan Carlos / Israel / Manuel)
cat DATA-ACCESS-REQUEST.md
```

## Arquitectura

```
CHAT AGENT (interfaz GG · Edwin · CFO)
      ↓
ORCHESTRATOR (DAG mensual · detección punto clave · arma deck)
      ↓
7 AGENTES (Económico · Industria · Ventas · Inventario · Financiero · Márgenes · Crédito)
      ↓
VERIFIED-NUMBERS (cifras lockadas por periodo + fuente)
      ↓
RENDERER (markdown → HTML interactivo · Chart.js · Leaflet)
```

## Layout

```
toyosa-directorio/
├── CLAUDE.md                   reglas del engagement (heredadas de toyosa/CLAUDE.md)
├── DATA-ACCESS-REQUEST.md      pedido formal a IT/CFO
├── orchestrator/
│   ├── deck-spec.md            15 slides lockadas
│   ├── run-monthly.md          ciclo mensual
│   └── punto-clave-rules.md    lógica de detección
├── chat-agent/
│   ├── CLAUDE.md               reglas conversacionales
│   ├── tools.md                tools disponibles
│   └── prompts/                templates por intent
├── agents/
│   ├── economico/CLAUDE.md
│   ├── industria/CLAUDE.md
│   ├── ventas/CLAUDE.md
│   ├── inventario/CLAUDE.md
│   ├── financiero/CLAUDE.md    forex rule + exclusión RE
│   ├── margenes/CLAUDE.md
│   └── credito/CLAUDE.md
├── verified-numbers/2026-MM/   cifras del periodo
├── audit-log/2026-MM/          chat-history.jsonl
├── render/                     template HTML + helpers
├── drafts/2026-MM/             slide-NN.md drafts
└── final/2026-MM/              deck.html final
```

## Hard rules (todas heredadas de `toyosa/CLAUDE.md`)

- **Edwin Saavedra nunca "Jr."** En ningún slide, draft, output del chat, ni documento.
- **Intermex ES división de Toyosa**, no entidad separada.
- **Nunca inventar cifras.** Toda cifra rastrea a `verified-numbers/2026-MM/*` con fuente (tab + celda o doc + página).
- **Excluir Real Estate** de cifras automotrices.
- **Idioma:** español-Bolivia, tono ejecutivo formal-directo.
- **Tableau-native first.** No replicar lo que Tableau Pulse/Agent/Explain Data ya hace.
- **Data residency:** sin aprobación de Juan Carlos, no se mueve data fuera del entorno Toyosa actual.

## Canary

Primera respuesta en sesión nueva debe incluir: **"Intermex es Toyosa · Edwin Saavedra (sin Jr.) · español-Bolivia"**.

## Referencias

- Engagement CLAUDE.md: `../toyosa/CLAUDE.md` (relativo) o `/home/user/General/toyosa/CLAUDE.md` (absoluto)
- Plan completo: `/root/.claude/plans/root-claude-uploads-1dc236b8-15c6-46c2-concurrent-cocoa.md`
- Visual de referencia: `intermex_dashboard.html` (24 slides en 5 FASES, dark purple + gold)
- PDF baseline: `DIRECTORIO_TOYOSA_SA_MAYO_2026.pdf`
