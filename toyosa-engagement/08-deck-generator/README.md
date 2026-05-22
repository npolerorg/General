# 08 · Deck Generator

Generador del deck mensual de Directorio. Node.js (>= 18) + Handlebars.

## Uso

```bash
npm install
node generator.js bu=holding periodo=2026-06
```

Argumentos:
- `bu`: `holding` | `intermex` | `crown`
- `periodo`: `YYYY-MM`

Output: `output/toyosa-{bu}-{periodo}.html` (HTML autocontenido, navegable
con flechas, exportable a PDF con el print stylesheet).

## Estructura

- `generator.js` — entrypoint; parsea args, carga stub data, renderiza los
  16 templates en orden, ensambla el HTML
- `templates/` — un `.hbs` por slide (00 a 15)
- `styles/main.css` — estilos B|P compartidos por todos los slides
- `assets/` — SVGs e iconos compartidos
- `output/` — decks generados (gitignored)

## Estado actual

Scaffold. La data es un stub inline en `generator.js`. La pipeline de
números verificados y los agentes IA llenarán esa estructura en sesiones
futuras. El contrato de datos entre agente y template es lo que importa
ahora: cualquier cambio en placeholders del template debe reflejarse en el
stub y, eventualmente, en el output del agente correspondiente.
