# CLAUDE.md — Toyosa Engagement (B|P Intelligence)

Repo de trabajo del engagement entre **B|P Intelligence** (Noel Poler) y
**Toyosa S.A.** (holding boliviano, distribuidor Toyota y BYD). Separado del
proyecto HospitalityIQ. Entregable central: **Sistema de Directorio Mensual
con Agentes IA**.

## Deploy (Netlify, git-connected)

- El sitio **toyosa-directorio-bpd.netlify.app** publica `directorio/index.html`
  (deck del Directorio, HTML autocontenido, sin build). Ver `netlify.toml`.
- Workflow: editar el deck -> commit -> push -> Netlify auto-build (~1-2 min).
- La protección por contraseña es un setting de Netlify (Visitor access),
  no vive en el repo; se conserva entre deploys.
- Versión actual del deck: v0.13. Historial versionado en
  `07-deliverables/decks-html/` (v09 ... v13).
- Spec del deck: `DECK_MANUAL.md` (raíz del engagement) — partitura de
  tipos de lámina, principios (3 capas, diálogo GG, marco de comparación)
  y taxonomía canónica. Es la fuente de verdad del sistema.

## Reglas duras

- No inventar cifras: cada dato del deck rastrea a su fuente (Tableau, Alchemy,
  o reporte citado como CEBEC/CAINCO, FMI, BCB, INE).
- Real Estate excluido de cifras automotrices salvo flag explícito.
- Forex Intermex no recurrente: presentar como ajuste separado del headline.
- Tono español-Bolivia formal-directo. Sin emojis. Sin guiones largos en prosa
  (solo en tablas como N/A).
- Quotes de stakeholders (Edwin, Juan Carlos) se citan textualmente con fecha
  y medio.

## Estructura

- `directorio/` — publish dir del sitio del Directorio (index.html = deck vivo)
- `07-deliverables/decks-html/` — historial de versiones del deck
- `08-deck-generator/` — generador Node + Handlebars (scaffold; ver su README)
- `00-overview/` ... `06-board-cycles/` — material del engagement (ver READMEs)

## Pendiente

- Conectar los otros sitios Toyosa (anexo, intermex) a este repo si se decide.
- Migrar el deck del Directorio al generador (hoy es HTML hand-authored).
- Wiring de los 7 agentes IA y el pipeline de números verificados.
