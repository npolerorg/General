# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

`npolerorg/General` is the **compiled static output** deployed to Netlify — not where development happens. The source repo is `npolerorg/hospiq-source` (private Next.js app). Changes to UI and business logic should be made there, not here.

The only files in this repo that are ever edited directly are:
- `netlify/functions/chat.js` — AI chat backend (Anthropic API)
- `netlify/functions/slider-state.mjs` — dashboard slider persistence (Netlify Blobs)
- The standalone `index.html` pages (each is a self-contained React+Babel app)

## Local Development

**With Netlify functions (includes AI chat and slider persistence):**
```bash
npm install
netlify dev         # runs at http://localhost:8888
```

**Static only (no AI chat):**
```bash
python3 -m http.server 8080
```

**Deploy manually:**
```bash
netlify deploy --prod
```

Auto-deploy: pushing to `main` deploys within ~60 seconds via Netlify CI.

## Architecture

### Two-Repo Setup
| Repo | Role |
|------|------|
| `npolerorg/General` (this repo) | Static HTML + Netlify functions — what Netlify serves |
| `npolerorg/hospiq-source` (private) | Next.js 14 + TypeScript source — where dev happens |

### Pages (each is a self-contained `index.html`)
Each page loads React 18 and Babel from CDN and compiles JSX in the browser at runtime — there is no build step. All data (financials, vendor info, property details) is hardcoded as JS constants in the `<script type="text/babel">` section of each file.

| Path | Purpose |
|------|---------|
| `/` | Main command center / nav hub |
| `/dashboard` | Financial KPIs, monthly P&L, expense breakdown |
| `/noi` | Net Operating Income tracking |
| `/reservations` | Booking pipeline and occupancy |
| `/ai-brief` | AI-generated briefings |
| `/competitors` | Competitor benchmarking |
| `/royal-hotel` | Royal South Beach Hotel section |
| `/login` | Password-protected login |

### Netlify Functions
- `netlify/functions/chat.js` — Calls Anthropic API (`claude-sonnet-4-20250514`). The `SYSTEM_PROMPT` constant at the top contains all hotel knowledge (financials, units, vendors, renovation plans). Update it to change what the AI knows.
- `netlify/functions/slider-state.mjs` — GET/POST to `/.netlify/functions/slider-state`; persists dashboard slider positions to Netlify Blobs under key `dashboard-sliders`. Requires a live Netlify deployment to work (won't persist locally without `netlify dev`).

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Required for AI chat |
| `CLAUDE_SECRET` | Dashboard login password |
| `DEMO_MODE` | Enables mock data when set |

For local dev, create a `.env` file (never commit it).

## Making Changes

**To edit a page:** Open the relevant `index.html`, find the `<script type="text/babel">` block, edit JSX/CSS, save, and refresh the browser.

**To update financial data:** Search for the month or metric directly in the HTML file — data is hardcoded near the top of each file's script section.

**To update what the AI knows:** Edit `SYSTEM_PROMPT` in `netlify/functions/chat.js`.

**Do not edit:** The `_next/` directory contains compiled JS assets referenced by HTML pages.
