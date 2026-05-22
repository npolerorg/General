#!/usr/bin/env node
/**
 * Toyosa deck generator
 *
 * Renderiza los 16 templates Handlebars (cover + 15 slides) en un solo HTML
 * autocontenido. La data hoy es un stub inline; mañana vendrá del pipeline
 * de números verificados (Tableau, Alchemy) y de los 7 agentes IA.
 *
 * Uso:
 *   node generator.js bu=holding periodo=2026-06
 */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const Handlebars = require('handlebars');

// -----------------------------------------------------------------------------
// CLI parsing
//
// Los args llegan como "bu=holding periodo=2026-06" (no flags). Mantenemos el
// formato porque es lo que el slash command /toyosa:directorio-mensual
// pasará al script.
// -----------------------------------------------------------------------------

function parseArgs(argv) {
  const out = {};
  for (const arg of argv.slice(2)) {
    const eq = arg.indexOf('=');
    if (eq === -1) continue;
    out[arg.slice(0, eq).trim()] = arg.slice(eq + 1).trim();
  }
  return out;
}

const VALID_BUS = new Set(['holding', 'intermex', 'crown']);
const PERIODO_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

function validateArgs(args) {
  if (!args.bu || !VALID_BUS.has(args.bu)) {
    throw new Error(
      `bu inválido: "${args.bu || ''}". Esperado uno de: ${[...VALID_BUS].join(', ')}`
    );
  }
  if (!args.periodo || !PERIODO_RE.test(args.periodo)) {
    throw new Error(
      `periodo inválido: "${args.periodo || ''}". Esperado formato YYYY-MM`
    );
  }
}

// -----------------------------------------------------------------------------
// Stub data
//
// TODO: replace with verified-numbers pipeline output. Este objeto es el
// contrato visible para los templates; los agentes deben producir una
// estructura compatible. Comentar cualquier cambio aquí en el PR.
// -----------------------------------------------------------------------------

function buildStubContext(bu, periodo) {
  const [year, month] = periodo.split('-');
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  const periodoLabel = `${monthNames[Number(month) - 1]} ${year}`;

  // Sparkline de dummy points para los indicadores macro. 24 puntos =
  // 24 meses. El agente AI Económico reemplazará con series reales.
  const dummySpark = (seed) => {
    const pts = [];
    for (let i = 0; i < 24; i++) {
      pts.push(50 + 20 * Math.sin(i / 2.5 + seed) + 5 * Math.cos(i / 1.3 + seed));
    }
    return pts;
  };

  const macroIndicators = [
    {
      id: 'pib',
      title: 'PIB total y per cápita',
      value: '-3.3%',
      unit: 'YoY',
      sub: 'USD 3,510 per cápita',
      deltaMoM: 'N/D',
      deltaYoY: '-3.3 pp',
      semaforo: 'grey',
      spark: dummySpark(0.3),
      insight: 'AI Insight: contracción sostenida; ver detalle del agente.',
    },
    {
      id: 'inflacion',
      title: 'Inflación y tasas',
      value: '20.7%',
      unit: 'IPC YoY',
      sub: 'Tasa pasiva 4.1% · activa 9.8%',
      deltaMoM: '+0.4 pp',
      deltaYoY: '+12.3 pp',
      semaforo: 'grey',
      spark: dummySpark(0.8),
      insight: 'AI Insight: presión sobre costos financieros; pendiente lectura.',
    },
    {
      id: 'fx',
      title: 'Tipo de cambio',
      value: '6.96',
      unit: 'BS/USD oficial',
      sub: 'Paralelo 13.5 · spread 94%',
      deltaMoM: '+8.1%',
      deltaYoY: '+85%',
      semaforo: 'grey',
      spark: dummySpark(1.4),
      insight: 'AI Insight: brecha cambiaria como riesgo principal del periodo.',
    },
    {
      id: 'reservas',
      title: 'Reservas internacionales',
      value: 'USD 165 M',
      unit: 'BCB',
      sub: '0.5 meses de importación',
      deltaMoM: '-3.2%',
      deltaYoY: '-72%',
      semaforo: 'grey',
      spark: dummySpark(2.1),
      insight: 'AI Insight: nivel crítico; condiciona acceso a divisas.',
    },
    {
      id: 'icc',
      title: 'Confianza del consumidor',
      value: '38.4',
      unit: 'Índice ICC',
      sub: 'Base 100 = neutral',
      deltaMoM: '-1.2 pts',
      deltaYoY: '-9.6 pts',
      semaforo: 'grey',
      spark: dummySpark(2.9),
      insight: 'AI Insight: contracción del consumo durable previsible.',
    },
    {
      id: 'credito',
      title: 'Préstamos por segmento',
      value: 'BS 215.4 B',
      unit: 'Cartera total',
      sub: 'Automotriz BS 4.1 B (+1.8%)',
      deltaMoM: '+0.3%',
      deltaYoY: '+2.4%',
      semaforo: 'grey',
      spark: dummySpark(3.6),
      insight: 'AI Insight: cartera estable; automotriz crece marginalmente.',
    },
    {
      id: 'comercio',
      title: 'Importaciones y exportaciones',
      value: 'USD -1.2 B',
      unit: 'Balanza comercial YTD',
      sub: 'Auto imports 6.8% del total',
      deltaMoM: '-0.2 B',
      deltaYoY: '-1.4 B',
      semaforo: 'grey',
      spark: dummySpark(4.4),
      insight: 'AI Insight: déficit estructural; importaciones auto resilientes.',
    },
  ];

  return {
    bu,
    bu_label: bu.charAt(0).toUpperCase() + bu.slice(1),
    periodo,
    periodo_label: periodoLabel,
    generated_at: new Date().toISOString(),

    cover: {
      title: 'Directorio Mensual',
      subtitle: `Toyosa ${bu === 'holding' ? 'Holding' : bu} · ${periodoLabel}`,
      amazing_fact: 'AI Insight: dato sobresaliente del periodo (placeholder).',
    },
    conclusion: {
      gg_name: 'Juan Carlos Herrera',
      headline: 'Conclusión ejecutiva del periodo (placeholder).',
    },
    macro: {
      indicators: macroIndicators,
      summary:
        'Lectura editorial macro pendiente del agente AI Económico (placeholder).',
    },
    industria: {
      headline: 'Mercado automotriz Bolivia — placeholder.',
      benchmark: 'Benchmark vs industria — placeholder.',
    },
    ventas: {
      ytd: 'Ventas Holding YTD — placeholder.',
      drill_marca: 'Drill por marca — placeholder.',
      drill_sucursal: 'Drill por sucursal — placeholder.',
      forecast: 'Rolling forecast — placeholder.',
    },
    inventario: {
      headline: 'Salud de inventario — placeholder.',
    },
    financiero: {
      pnl: 'P&L resumen — placeholder.',
      margenes: 'Análisis de márgenes — placeholder.',
      balance_credito: 'Balance + crédito — placeholder.',
    },
    decisiones: {
      what_ifs: 'Escenarios what-if — placeholder.',
      real_estate: 'Framing separación Real Estate — placeholder.',
    },
    cierre: {
      puntos: 'Puntos a trabajar + carry-forward — placeholder.',
    },
  };
}

// -----------------------------------------------------------------------------
// Handlebars helpers
// -----------------------------------------------------------------------------

// Renderiza un sparkline SVG simple a partir de un array de Y values
// normalizados aproximadamente en rango 30..80. Pensado para los indicadores
// macro de la slide 02. El agente puede reemplazar el helper o pasar el
// SVG ya renderizado si requiere control fino.
Handlebars.registerHelper('sparkline', function (points) {
  if (!Array.isArray(points) || points.length === 0) return '';
  const w = 120;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1e-6, max - min);
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((p - min) / range) * h).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
  return new Handlebars.SafeString(
    `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">` +
      `<path d="${path}" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
      `</svg>`
  );
});

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

Handlebars.registerHelper('semaforoClass', function (color) {
  const c = String(color || 'grey').toLowerCase();
  if (['green', 'amber', 'red', 'grey'].includes(c)) return `sem sem--${c}`;
  return 'sem sem--grey';
});

// -----------------------------------------------------------------------------
// Render
// -----------------------------------------------------------------------------

const SLIDE_ORDER = [
  '00-cover',
  '01-conclusion-gg',
  '02-macro',
  '03-industria-auto',
  '04-benchmark',
  '05-ventas-ytd',
  '06-drill-marca',
  '07-drill-sucursal',
  '08-forecast',
  '09-inventario',
  '10-pnl',
  '11-margenes',
  '12-balance-credito',
  '13-what-ifs',
  '14-real-estate',
  '15-puntos',
];

async function renderSlides(context) {
  const templatesDir = path.join(__dirname, 'templates');
  const rendered = [];
  for (let i = 0; i < SLIDE_ORDER.length; i++) {
    const name = SLIDE_ORDER[i];
    const file = path.join(templatesDir, `${name}.hbs`);
    const raw = await fs.readFile(file, 'utf8');
    const template = Handlebars.compile(raw, { noEscape: false });
    const html = template({ ...context, slide_index: i, slide_total: SLIDE_ORDER.length });
    rendered.push({ name, html });
  }
  return rendered;
}

async function readCss() {
  return fs.readFile(path.join(__dirname, 'styles', 'main.css'), 'utf8');
}

function assembleHtml({ context, slides, css }) {
  const slidesHtml = slides
    .map((s, i) => `<section class="slide" data-slide="${i}" id="slide-${i}">${s.html}</section>`)
    .join('\n');

  const dots = slides
    .map(
      (_, i) =>
        `<button class="dot" data-target="${i}" aria-label="Ir a slide ${i + 1}"></button>`
    )
    .join('');

  return `<!doctype html>
<html lang="es-BO">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1280, initial-scale=1">
<title>Toyosa · ${context.bu_label} · ${context.periodo_label}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap">
<style>${css}</style>
</head>
<body>
<div class="deck" id="deck">
  <header class="deck-chrome">
    <div class="brand">B|P Intelligence · Toyosa</div>
    <div class="counter"><span id="counter-current">1</span> / ${slides.length}</div>
  </header>

  <main class="stage">
    ${slidesHtml}
  </main>

  <nav class="dots" aria-label="Navegación de slides">${dots}</nav>

  <div class="arrows">
    <button class="arrow arrow--prev" aria-label="Slide anterior">&#x2039;</button>
    <button class="arrow arrow--next" aria-label="Slide siguiente">&#x203A;</button>
  </div>
</div>

<script>
(function () {
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var counter = document.getElementById('counter-current');
  var current = 0;

  function show(i) {
    if (i < 0) i = 0;
    if (i >= slides.length) i = slides.length - 1;
    current = i;
    slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
    counter.textContent = String(i + 1);
    window.location.hash = 'slide-' + i;
  }

  document.querySelector('.arrow--prev').addEventListener('click', function () { show(current - 1); });
  document.querySelector('.arrow--next').addEventListener('click', function () { show(current + 1); });
  dots.forEach(function (d) {
    d.addEventListener('click', function () { show(parseInt(d.getAttribute('data-target'), 10)); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { show(current + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { show(current - 1); e.preventDefault(); }
    if (e.key === 'Home') { show(0); }
    if (e.key === 'End') { show(slides.length - 1); }
  });

  var initial = 0;
  if (window.location.hash) {
    var m = window.location.hash.match(/slide-(\\d+)/);
    if (m) initial = parseInt(m[1], 10) || 0;
  }
  show(initial);
})();
</script>
</body>
</html>
`;
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  validateArgs(args);

  const context = buildStubContext(args.bu, args.periodo);
  const slides = await renderSlides(context);
  const css = await readCss();
  const html = assembleHtml({ context, slides, css });

  const outDir = path.join(__dirname, 'output');
  await fs.ensureDir(outDir);
  const outPath = path.join(outDir, `toyosa-${args.bu}-${args.periodo}.html`);
  await fs.writeFile(outPath, html, 'utf8');

  const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
  console.log(`Generated: ${path.relative(process.cwd(), outPath)} (${slides.length} slides, ${sizeKb} KB)`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
