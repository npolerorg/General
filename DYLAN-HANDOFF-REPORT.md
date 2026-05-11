# HospitalityIQ Dashboard — Full Handoff Report for Dylan Poler
**Prepared by:** Noel Poler + Claude Code  
**Date:** May 11, 2026  
**Live site:** https://hospitalityiq-dashboard.netlify.app/

---

## 1. What This Project Is

The HospitalityIQ Dashboard is a custom-built hotel operations command center for **MR9 Holdings, LLC**, the ownership entity behind two hotel properties:

- **Dream Inn Hotel** — 2710 N Ocean Drive, Hollywood Beach, FL (11 active rooms + 1 convertible office)
- **Royal South Beach Hotel** — separate section of the dashboard with its own routes

Noel Poler / The Poler Team built and uses this as a live internal tool for:
- Tracking monthly P&L, NOI, and revenue by unit
- Managing vendor relationships and contracts
- Overseeing property manager (Park Properties) performance
- Monitoring reservations and OTA channel performance
- Strategic planning, renovation proposals, and competitor benchmarking
- An AI chat assistant (powered by Claude) that knows the full property context

---

## 2. How This Project Was Originally Built

The project is a **Next.js 14 App Router** application written in TypeScript with Tailwind CSS. It was built iteratively using Claude Code (Anthropic's AI coding assistant) in Claude Code sessions on Noel's Mac. There was no traditional development team — Noel worked directly with Claude to build, modify, and deploy each feature.

Key technology choices:
- **Next.js App Router** with TypeScript and Tailwind CSS for the frontend
- **Supabase** for the database (reservations, P&L data, property records)
- **Netlify** for hosting with serverless functions
- **Anthropic Claude API** (claude-sonnet-4) for the AI chat assistant
- **Guesty** (property management system) integration for reservation sync
- **Netlify Blobs** for persisting dashboard slider/filter state across sessions
- **Recharts** for financial charts and graphs

---

## 3. The Two GitHub Repositories

### Repository 1 — Compiled Output (public)
**URL:** https://github.com/npolerorg/General  
**Branch with this report:** `claude/export-hospitalityiq-dashboard-Z8hND`  
**Main branch:** `main`

This repo contains the **statically exported / compiled output** of the Next.js build. It's what Netlify actually serves. Key contents:
- `index.html` — the root Command Center page (hand-written React via CDN, fully editable directly)
- `login/`, `dashboard/`, `noi/`, `ai-brief/`, `reservations/`, `competitors/`, `properties/`, `royal-hotel/` — compiled Next.js pages (HTML only, not editable without rebuilding from source)
- `_next/static/` — compiled JavaScript chunks and CSS (do not edit)
- `netlify/functions/chat.js` — AI chat serverless function (editable)
- `netlify/functions/slider-state.mjs` — slider state persistence (editable)
- `netlify.toml` — Netlify deploy config
- `README.md` — setup guide
- `DYLAN-HANDOFF-REPORT.md` — this document

### Repository 2 — Next.js Source (private)
**URL:** https://github.com/npolerorg/hospiq-source  
**Visibility:** Private  
**This is where all development happens.**

This repo contains the full editable source code. Key contents:
```
src/
├── app/
│   ├── (auth)/login/              ← Login page component
│   ├── (dashboard)/               ← All dashboard pages
│   │   ├── ai-brief/
│   │   ├── competitors/
│   │   ├── dashboard/
│   │   ├── dream-inn/
│   │   ├── noi/
│   │   ├── properties/
│   │   ├── reservations/
│   │   └── royal-hotel/
│   │       ├── data-problem/
│   │       ├── performance/
│   │       ├── proposal/
│   │       └── strategic/
│   └── api/                       ← API routes
│       ├── inbound-email/
│       ├── ingest-log/
│       ├── pnl/upload/
│       └── reservations/auto-sync/
├── components/
│   └── pnl/
│       ├── IngestLog.tsx
│       └── PnlUpload.tsx
├── hooks/
├── lib/
│   ├── dedup/fingerprint.ts
│   ├── email/
│   │   ├── classifier.ts
│   │   ├── ingest-log.ts
│   │   └── processors.ts
│   └── pnl/xlsx-parser.ts
└── types/
netlify/
└── functions/
    ├── chat.js                    ← AI chat (Claude API)
    ├── scheduled-sync.mts         ← Guesty auto-sync
    └── slider-state.mjs           ← Dashboard state persistence
scripts/
├── guesty-export.mjs              ← Export data from Guesty
└── import-csv.mjs                 ← CSV data import utility
supabase/
└── migrations/
    └── 001_initial_schema.sql     ← Full database schema
```

---

## 4. Environment Variables

All secrets live in `.env.local` on the server (Netlify environment variables) and in a local `.env.local` file for development. **Never commit this file.**

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Powers the AI chat assistant (get from console.anthropic.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public, safe to expose) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public, safe to expose) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key — **keep secret** |
| `GUESTY_CLIENT_ID` | Guesty API OAuth client ID |
| `GUESTY_CLIENT_SECRET` | Guesty API OAuth client secret — **keep secret** |
| `ALGC_FUNC_SECRET` | Internal function auth secret |
| `CLAUDE_SECRET` | Dashboard login password / session secret — **keep secret** |
| `CLAUDE_TO` | Internal routing/auth variable |
| `DEMO_MODE` | When set, may enable demo/mock data mode |
| `NODE_ENV` | `development` locally, `production` on Netlify |

Noel has already added all of these to Netlify's environment variables dashboard and shared the values with Dylan separately.

---

## 5. How the Build and Deploy Pipeline Works

### Development workflow
1. Clone `hospiq-source`
2. Create `.env.local` with all variables above
3. Run `npm install`
4. Run `netlify dev` (port 8888) or `npm run dev` (port 3000)
5. Make changes to TSX/TS files in `src/`
6. Test locally

### Deploy workflow
```
Push to main of hospiq-source
        ↓
Netlify detects push (webhook)
        ↓
Netlify runs: npm run build
        ↓
Next.js compiles → .next/ output
        ↓
@netlify/plugin-nextjs converts to serverless functions
        ↓
Netlify deploys to https://hospitalityiq-dashboard.netlify.app/
        ↓
Live in ~60 seconds
```

The Netlify connection was set up by Noel: **Site settings → Build & deploy → Linked to `npolerorg/hospiq-source` main branch.**

### netlify.toml (in hospiq-source)
```toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 6. The AI Chat Assistant

The AI chat (visible in the dashboard) is powered by Claude Sonnet via Anthropic's API. The backend is in `netlify/functions/chat.js`.

The system prompt in that file contains detailed knowledge about:
- Full property overview (units, sizes, kitchen strategy)
- 2025 monthly P&L data (all 12 months, every line item)
- Vendor relationships (Park Properties, Oscar Rojas, Leon Levy, etc.)
- PMS migration (Hostaway → Guesty)
- Renovation plans, insurance status, strategic recommendations
- Ownership structure (MR9 Holdings, LLC)

**To update what the AI knows:** Edit the `SYSTEM_PROMPT` constant at the top of `netlify/functions/chat.js` in `hospiq-source`. Push to main and it deploys automatically.

The function keeps the last 20 messages of conversation history for context, then calls `claude-sonnet-4-20250514` with a 1024 token response limit.

---

## 7. The Netlify Functions

### `chat.js` — AI Chat
- **Trigger:** POST to `/.netlify/functions/chat`
- **Input:** `{ messages: [...] }` (array of `{role, content}` objects)
- **Output:** `{ response: "..." }`
- **Auth:** Uses `ANTHROPIC_API_KEY` env var
- **Model:** `claude-sonnet-4-20250514`

### `slider-state.mjs` — Dashboard State
- **Trigger:** GET or POST to `/.netlify/functions/slider-state`
- **Purpose:** Saves and restores dashboard slider/filter positions across sessions
- **Storage:** Netlify Blobs (key: `dashboard-sliders` in store `slider-state`)
- **Auth:** None (internal use only)

### `scheduled-sync.mts` — Guesty Sync
- **Trigger:** Scheduled (cron) or manual POST
- **Purpose:** Pulls reservation data from Guesty API and syncs to Supabase
- **Auth:** Uses `GUESTY_CLIENT_ID` and `GUESTY_CLIENT_SECRET`

---

## 8. Database (Supabase)

The project uses **Supabase** (Postgres) for storing reservations, P&L records, and other structured data. The full schema is in `supabase/migrations/001_initial_schema.sql`.

Supabase project details are in the `NEXT_PUBLIC_SUPABASE_URL` variable — log in at supabase.com with Noel's account to see the project dashboard, tables, and data.

Key API routes that interact with Supabase:
- `src/app/api/reservations/auto-sync/` — syncs Guesty reservations
- `src/app/api/pnl/upload/` — ingests P&L spreadsheets
- `src/app/api/ingest-log/` — logs data ingestion activity
- `src/app/api/inbound-email/` — processes inbound emails

---

## 9. Property Context (for the AI and for you)

### Dream Inn Hotel
- **Address:** 2710 N Ocean Drive, Hollywood Beach, FL
- **Units:** 11 active + 1 office (convertible to 12th revenue unit, ~$35K–$50K/yr potential)
- **Rating:** 2–2.5 stars (renovation planned)
- **Property Manager:** Park Properties (under review — performance issues)
- **Cleaning:** Park Properties (~$70K/yr) — Oscar Rojas proposal pending (~$50K/yr, saving ~$20K)
- **PMS:** Migrating from Hostaway → Guesty
- **Contractor:** Leon Levy (quoting PIP/renovation work)
- **Insurance:** Pending approval on audit correction

### 2025 Annual Financials
- Gross Revenue: $411,474
- Cleaning Fees: $70,847 (17%)
- Channel/OTA Fees: $27,057 (6.6%)
- Park Properties Mgmt Fees: $40,037 (9.7%)
- Operating Expenses: $150,573
- **NOI: $41,421**

---

## 10. What Was Done During This Handoff Session

1. **Located the project** — searched Noel's Mac, found compiled output at `~/Downloads/dream-inn-dashboard/` and Next.js source at `~/Downloads/hospiq/`
2. **Pushed compiled output** to `https://github.com/npolerorg/General` (main branch)
3. **Pushed Next.js source** to `https://github.com/npolerorg/hospiq-source` (private, main branch)
4. **Wrote README.md** in the General repo with full setup instructions
5. **Answered Dylan's questions** about source vs. compiled, env vars, build pipeline, and login
6. **Updated the README** to reference both repos and provide the full dev setup guide
7. **Noel connected Netlify** to `hospiq-source` for automatic deploys
8. **Noel provided env var values** to Dylan directly (outside GitHub)
9. **Created this report** for Dylan's Claude Code context

---

## 11. Contacts

| Person | Role | Contact |
|--------|------|---------|
| Noel Poler | Owner, The Poler Team | noel@polerteam.com |
| Dylan Poler | Developer (you) | — |
| Park Properties | Property manager (under review) | — |
| Guesty | PMS platform | guesty.com |
| Supabase | Database | supabase.com (Noel's account) |
| Anthropic | AI API | console.anthropic.com (Noel's account) |
| Netlify | Hosting | app.netlify.com (Noel's account) |

---

## 12. Quick Reference Cheat Sheet

```bash
# Clone source and set up
git clone https://github.com/npolerorg/hospiq-source.git
cd hospiq-source
npm install
cp .env.example .env.local   # then fill in real values

# Run locally
netlify dev                   # http://localhost:8888 (with functions)
npm run dev                   # http://localhost:3000 (UI only)

# Deploy
git add . && git commit -m "your change" && git push   # auto-deploys via Netlify

# Update AI knowledge
# Edit SYSTEM_PROMPT in netlify/functions/chat.js → push → done

# Update financial data
# Edit the relevant page in src/app/(dashboard)/<page>/page.tsx → push → done
```
