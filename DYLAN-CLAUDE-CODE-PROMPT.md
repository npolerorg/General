# Prompt for Dylan — Paste This Into Your Claude Code

Copy everything between the triple dashes below and paste it as your first message in a new Claude Code session after cloning `hospiq-source`.

---

```
Hi Claude. I'm Dylan Poler, taking over development of the HospitalityIQ Dashboard from my father Noel Poler. Here is the full context for this project so you can help me work on it effectively.

## The Project

HospitalityIQ Dashboard is a hotel operations command center for MR9 Holdings, LLC — the ownership entity behind the Dream Inn Hotel (2710 N Ocean Drive, Hollywood Beach, FL) and the Royal South Beach Hotel. It's a live internal tool Noel uses daily for financial tracking, vendor management, reservations, and strategic planning.

Live site: https://hospitalityiq-dashboard.netlify.app/

## My Local Setup

I've cloned the source repo:
  https://github.com/npolerorg/hospiq-source (private)

I have all environment variables in .env.local (provided by Noel).
Netlify is connected to the main branch — every push auto-deploys.

## Tech Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS 3.4
- Supabase (Postgres) for reservations, P&L, property data
- Netlify hosting + serverless functions
- Anthropic Claude API (claude-sonnet-4-20250514) for AI chat
- Guesty (PMS) integration for reservation sync
- Netlify Blobs for dashboard state persistence
- Recharts for charts, lucide-react for icons, date-fns for dates

## Repository Structure

src/
├── app/
│   ├── (auth)/login/              ← Login page
│   ├── (dashboard)/               ← All dashboard pages
│   │   ├── ai-brief/
│   │   ├── competitors/
│   │   ├── dashboard/
│   │   ├── dream-inn/
│   │   ├── noi/
│   │   ├── properties/
│   │   ├── reservations/
│   │   └── royal-hotel/ (data-problem, performance, proposal, strategic)
│   └── api/
│       ├── inbound-email/
│       ├── ingest-log/
│       ├── pnl/upload/
│       └── reservations/auto-sync/
├── components/pnl/
├── hooks/
├── lib/ (dedup, email, pnl utilities)
└── types/
netlify/functions/
├── chat.js                        ← AI chat (Claude API)
├── scheduled-sync.mts             ← Guesty reservation sync
└── slider-state.mjs               ← Dashboard state persistence
scripts/
├── guesty-export.mjs
└── import-csv.mjs
supabase/migrations/001_initial_schema.sql

## Environment Variables (names only)

ANTHROPIC_API_KEY         — Claude API for AI chat
NEXT_PUBLIC_SUPABASE_URL  — Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase public key
SUPABASE_SERVICE_ROLE_KEY — Supabase admin key (secret)
GUESTY_CLIENT_ID          — Guesty OAuth client
GUESTY_CLIENT_SECRET      — Guesty OAuth secret
ALGC_FUNC_SECRET          — Internal function auth
CLAUDE_SECRET             — Dashboard login password / session secret
CLAUDE_TO                 — Internal auth routing
DEMO_MODE                 — Enables demo/mock data when set
NODE_ENV                  — development / production

## Build and Deploy

npm run build → .next/ → @netlify/plugin-nextjs → Netlify serverless
Push to main of hospiq-source → Netlify auto-deploys in ~60 seconds
netlify.toml handles all config (command, publish dir, functions dir, plugin)

## The AI Chat

The AI assistant in the dashboard is powered by Claude Sonnet via the Anthropic API.
Backend: netlify/functions/chat.js
The SYSTEM_PROMPT constant at the top of that file contains everything the AI knows:
- Full property overview (units, sizes, kitchen plan)
- 2025 monthly P&L for all 12 months
- Vendor details (Park Properties, Oscar Rojas, Leon Levy)
- PMS migration status (Hostaway → Guesty)
- Renovation plans, insurance, strategic priorities
- Ownership structure (MR9 Holdings, LLC / Noel Poler / The Poler Team)

To update what the AI knows: edit SYSTEM_PROMPT in chat.js and push.

## Property Context

Dream Inn Hotel:
- 11 active rooms + 1 office (convertible → 12th unit, $35K–$50K/yr potential)
- Rating: 2–2.5 stars, renovation in progress
- Property manager: Park Properties (under review for performance issues)
- Cleaning: Park Properties (~$70K/yr), Oscar Rojas proposal pending (~$50K/yr)
- PMS migrating: Hostaway → Guesty
- Contractor: Leon Levy (PIP work)

2025 Annual Financials:
- Gross Revenue: $411,474
- NOI: $41,421
- Cleaning: $70,847 | OTA Fees: $27,057 | Mgmt Fees: $40,037 | OpEx: $150,573

## Two GitHub Repos

1. npolerorg/hospiq-source (private) — Next.js source, develop here
2. npolerorg/General (public) — compiled static output, reference only

## How the Original Project Was Built

Noel built this iteratively using Claude Code — no traditional dev team. Features were added through Claude Code sessions on his Mac. There's no formal spec or design doc; the codebase itself and the DYLAN-HANDOFF-REPORT.md in npolerorg/General are the primary documentation.

## What I Need From You

Please read the source code and help me understand the codebase well enough to:
1. Make UI changes to any dashboard page
2. Update financial data and property information
3. Add new pages or features
4. Modify the AI system prompt
5. Debug issues that come up in production

Start by reading the key files: package.json, netlify.toml, src/app/layout.tsx (if it exists), src/app/(dashboard)/dashboard/page.tsx, and netlify/functions/chat.js — then give me a brief orientation of the codebase structure so we're on the same page.
```

---

## Notes on Using This Prompt

- Paste this **after** you have the repo cloned and open in your terminal
- Claude Code works best when launched from the project root: `cd hospiq-source && claude`
- After Claude reads the files and orients itself, you can ask it to make specific changes
- For any change involving real data (financials, vendor info, property details), cross-check with Noel before deploying
- Claude Code will read your actual source files — the prompt above gives it the high-level context so it doesn't have to reverse-engineer everything from scratch
