# CLAUDE.md — HospitalityIQ Dashboard (Dream Inn + Royal South Beach)

## 1. Overview & Non-goals

Repo for the **HospitalityIQ Dashboard** — operational + analytical command center for two MR9 Holdings / Mitch Rodriguez properties:

- **Dream Inn Hotel** — 2710 N Ocean Drive, Hollywood Beach, FL. Live operational asset; Noel runs day-to-day for MR9.
- **The Royal South Beach** — 763 E Pennsylvania Ave, Miami Beach. 42-key boutique conversion (Hohauser/Dixon, 1936-38). Phase 2 kickoff 2026-03-27. MR9 owns 15 of 42 units; acquiring 27 more.

**Two-repo architecture:**
- `npolerorg/General` (this repo): compiled static output served by Netlify
- `npolerorg/hospiq-source` (private): Next.js 14 + TS source — all real development happens there

Live: https://hospitalityiq-dashboard.netlify.app/
Royal conversion review (Kevin's analytics site): https://royal-south-beach-review.netlify.app/

**Non-goals:** no proforma rebuilds (Kevin owns), no deck generation for the conversion (Kevin owns), no Driftwood/SLH negotiation drafts (Kevin owns), no brokerage / Poler Team listings work from this repo, no investor outreach.

## 2. Roles (the team)

- **Noel Poler (me / project owner):** client relationship with Mitch and MR9, operational analysis on Dream Inn, operational + strategic analysis on Royal, dashboard product owner.
- **Kevin Poler (brother):** Driftwood relationship + Royal conversion analytics (proforma, decks, IRR/MOIC). Source of truth for all Royal financial numbers. Lives at https://royal-south-beach-review.netlify.app/. Maintains his own `CLAUDE.md` for that work.
- **Dylan Poler (brother):** HospitalityIQ owner and developer. Owns the `hospiq-source` codebase. All UI/logic changes go through him.

## 3. Players + Artifacts (downstream — Kevin's primary contacts, I sit in)

**Client — MR9 Holdings / Brickell Travel:**
- Mitch Rodriguez (`mi@brickelltravel.com`) — primary client
- Maikel "Mike" Rodriguez (`mike@brickelltravel.com`)
- Marcel Rotker (`marcel@brickelltravel.com`, `mrotker@gmail.com`)
- Ariel Rodriguez (`mgmt@mr9holdings.com`)

**Operator (Royal, proposed) — Driftwood Hospitality:**
- Andrew Stevens (`astevens@dhmhotels.com`) — intro contact
- Daniel "Dan" Santalla (`dsantalla@dhmhotels.com`) — analytics/underwriting lead
- **NEVER use `apetersen@driftwoodhosp.com`** — wrong address (per Kevin)

**Brand (Royal, proposed) — Small Luxury Hotels of the World:** Kenan. SLH has Hilton distribution tie-up.

**Condo association (Royal):** Judith Berson-Levinson (`jsberson@me.com`) — board member, author of *South Beach at War*. Handle with respect. Noel had a good call with her 2026-04-06; do not jeopardize.

**Brothers (Royal seller side):** Dennys + brothers own 18 units, paid avg $117K/unit, willing to sell ~$130K/door.

## 4. Tech Stack (this repo)

- **Frontend:** React 18 via CDN (no build step). Each page is a self-contained `index.html` with JSX compiled in-browser by Babel.
- **Styling:** custom CSS + Tailwind-style utility classes inline.
- **Backend:** Netlify Functions (`/netlify/functions/`)
  - `chat.js` — AI chat backend (calls Claude API)
  - `slider-state.mjs` — dashboard slider persistence
- **State:** Netlify Blobs (key-value)
- **DB (via source repo):** Supabase (Postgres) — reservations, P&L records, email ingest log
- **AI:** Claude Sonnet (`claude-sonnet-4-20250514`) via Anthropic API
- **PMS:** migrating Hostaway → Guesty (Dream Inn)
- **Hosting:** Netlify project `hospitalityiq-dashboard` (Noel's account); auto-deploy on push to `main`

To edit UI/logic: clone `npolerorg/hospiq-source`, change TSX, rebuild → outputs land here. **Do not edit HTML in this repo directly.**

## 5. Repo Layout

```
/
├── index.html              ← Command Center (main)
├── login/                  ← Auth
├── dashboard/              ← Financial overview
├── noi/                    ← NOI analysis (Dream Inn)
├── ai-brief/               ← AI-generated briefings
├── reservations/           ← Reservations tracker
├── competitors/            ← Competitor analysis
├── properties/             ← Property details
├── royal-hotel/            ← ROYAL SECTION
│   ├── index.html
│   ├── data-problem/       ← Reconciliation tool
│   ├── performance/        ← Performance metrics
│   ├── strategic/          ← Strategic planning
│   └── proposal/           ← Proposal docs
├── netlify/functions/      ← Serverless backend
├── netlify.toml
├── package.json            ← Only Netlify function deps
└── floor-plan.png
```

## 6. Locked Numbers — Royal South Beach (May 11, 2026 proforma)

Source of truth: `MR9_Pennsylvania_Ave_Conversion_with_Commercial_20260511.xlsx` (Kevin). If a stakeholder cites different numbers, sync with Kevin before correcting.

**Property:** 42 keys, 15,330 available room-nights/yr, 4 ground-floor commercial NNN units.

**6 scenarios (Conservative/Base/Upside × 65% & 70% occ):**

| Metric | Conservative 65% | **Base 70%** | Upside 70% |
|---|---|---|---|
| ADR | $200 | **$250** | $320 |
| Occupancy | 65% | **70%** | 70% |
| RevPAR | $130 | **$175** | $224 |
| Hotel Revenue Yr 1 | $2,271,906 | **$2,983,218** | $3,734,388 |
| Hotel NOI (pre-FF&E) | $315,707 | **$660,557** | $1,178,985 |
| NOI Margin | 9.9% | **22.1%** | 31.6% |
| Net Cash Flow | $224,831 | **$541,229** | $1,029,610 |
| Exit Cap | 6.0% | **5.0%** | 4.0% |
| Stabilized Value | $3.75M | **$10.82M** | $25.74M |
| Year 5 IRR | -10.3% | **9.3%** | 14.5% |
| Year 5 MOIC | 0.60× | **1.51×** | 1.84× |

**Capital stack (Base):** $4.0M acquisition (27 units) + **$4.0M PIP** + $1.25M soft costs (~10%) + $500K WC + $5,500 SLH = **$11,755,500** ($279,893/key).

**Operating assumptions (per-key, fixed across scenarios):** A&G $5,500 · Marketing $4,000 · R&M $3,200 · Utilities $2,400 · Insurance $6,500 · Property tax $170K total (~2% on $8.5M assessed) · Driftwood mgmt fee 3% of total rev · SLH $36,600/yr fixed + 8% rooms distribution · Rooms expense 28% of rooms rev.

**Commercial NOI:** **$0 modeled** in all 6 scenarios. 4 ground-floor NNN units on high-traffic avenue. Assumptions tab notes placeholder of **~$62K avg NOI per unit (NNN)** with 3% annual growth — **not activated in the model**. **Flag if anyone cites commercial as income** until leases are underwritten.

**Changes vs. Kevin's April 2023 lock — track these:**

| Item | Apr 2023 lock | **May 2026 update** | Impact |
|---|---|---|---|
| PIP cost | $4M fixed | $2M / **$4M** / $6M | now scenario-dependent |
| Exit cap | 6.0% uniform | 6.0% / **5.0%** / 4.0% | varies by scenario |
| Year 5 IRR Base | 15% | **9.3%** | softened ~570 bps |
| Year 5 MOIC Base | 1.87× | **1.51×** | softened |
| ADR Base | $250 | **$250** | unchanged ✓ |
| Occupancy Base | 70% | **70%** | unchanged ✓ |

**Floor for deal to work (per Kevin):** ADR ≥ $250, stabilized occ ≥ 70%, PIP ≤ $4M.

## 7. Locked Numbers — Dream Inn (operational)

- **Property manager:** Park Properties — 15% commission on unclear base; **performance under review**
- **2025 NOI:** $24,186 actual vs $58,682 budget (**-58.8%**)
- **HOA costs 2025:** $176,034 actual vs $150,205 budget (+17.2%)
- **Channel/OTA fees 2025:** $16,121 actual vs $7,578 budget (+112.7%)
- **Repairs 2025:** $26,922 actual vs $1,200 budget (+2,144%)
- **Property taxes 2025:** ~$10K unpaid; full year ~$35K uncollected
- **Long-term rental rev 2025:** $52,948 (unbudgeted, volatile)
- **Mandatory 60-yr building recertification** — building-wide $1M+; **MR9 share $200–250K**, funding source unclear
- **Three strategic options on table:** Hold & Pay · Upgrade & Reposition · Sell
- **Portfolio appreciation since acquisition:** bulk sale +39.4% · individual sale +53.4%

**Data integrity issue:** 3 revenue sources produce 3 different numbers — reconciliation incomplete. Flag this any time gross revenue is summarized.

## 8. Architecture & Patterns

- **No build step in this repo.** Edit JSX inside `<script type="text/babel">` in each `index.html`. Babel compiles in browser.
- **All real dev work** happens in `npolerorg/hospiq-source` (Next.js 14, TSX, Tailwind, Supabase). Outputs land here as static HTML.
- **API calls** from frontend → Netlify Functions → external services (Anthropic, Supabase). **Never put API keys in client HTML.**
- **Two-property model:** every dashboard must work for both Dream Inn (operational, live data) and Royal (analytical, scenario-driven). Don't conflate the two.
- **Royal numbers** trace to Kevin's proforma. When in doubt, link out to https://royal-south-beach-review.netlify.app/ rather than reimplementing.

## 9. Commands

```bash
# Dev (source repo, not this one)
cd ~/path/to/hospiq-source
npm run dev

# This repo — Netlify dev (functions only)
netlify dev

# Deploy: auto on push to main
git push origin main
```

## 10. Capabilities (project-specific)

- **MCPs:** GitHub (scoped to `npolerorg/general`), Netlify (deploy/reader/updater), poler-crm (consulting CRM), Google Drive, Gmail.
- **APIs:** Anthropic (Claude Sonnet 4), Supabase (Postgres + auth), Netlify Blobs, Netlify Functions.
- **Skills:** `simplify` for code review post-change, `init` if scaffolding new sections, `pre-diagnostico-empresa` for board-level framing.

## 11. Hard Rules

- **Never invent numbers — Royal.** Every ADR, occ, cap, IRR, MOIC, PIP traces to the May 11 2026 Excel or an explicit message from Kevin. No "reasonable defaults." Cite source: workbook tab + cell.
- **Never invent numbers — Dream Inn.** Trace to bank statements, PMS exports (Hostaway → Guesty), HOA statements, or the `/noi/` dashboard. Always flag the 3-system revenue reconciliation problem when summarizing.
- **Defer to Kevin on Royal financial framing.** If Mitch / Dan / Andrew / Kenan / Judith asks me a number-driven question, reply "let me sync with Kevin" — not an off-the-cuff figure.
- **Defer to Dylan on `hospiq-source` code changes.** Don't push direct edits to this compiled repo. Work goes through the source repo.
- **Never expand scope with clients.** Before proposing anything to Mitch or any Royal counterparty, re-read the full thread. See `~/.claude/CLAUDE.md` §9.
- **Never confuse with Poler Team brokerage.** This is property management + consulting for Mitch — no listings, no homesinsoflorida campaigns from this repo.
- **Handle Judith with respect.** Published author + condo board stakeholder. Do not jeopardize the relationship Noel built 2026-04-06.
- **Driftwood email:** use `astevens@dhmhotels.com` and `dsantalla@dhmhotels.com`. NEVER `apetersen@driftwoodhosp.com`.
- **Language:** **English** for all client-facing artifacts, even when threads are in Spanish (many are bilingual). Direction confirmed per Kevin 2026-04-23.
- **No em dashes, no emojis** in any drafted client message. Lowercase, busy-founder voice for SMS/WhatsApp; professional-but-direct for emails.
- **Old proforma deprecated.** Anything pre-May 11 2026 (`Royal_Proforma.xlsx` April 23 version, 15% IRR / 1.87× MOIC locks) is stale. Do not regress.

## 12. References (load on demand)

- **Kevin's Royal CLAUDE.md:** `/Users/kevinpoler/Documents/DealAnalyzer/CLAUDE.md` — engagement-level master for conversion side
- **Royal proforma (current):** `MR9_Pennsylvania_Ave_Conversion_with_Commercial_20260511.xlsx`
- **Royal review site:** https://royal-south-beach-review.netlify.app/
- **HospitalityIQ live:** https://hospitalityiq-dashboard.netlify.app/
- **Source repo:** https://github.com/npolerorg/hospiq-source (private)
- **Live email threads:** "RE: Miami Beach Project" (Dan/Andrew) · "Royal South Beach — Update: Judith, Driftwood, SLH y próximos pasos [CONFIDENCIAL]" · "Phase 2 Kickoff — Dream Inn & The Royal South Beach"
- **Recordings (Otter + Zoom):** "Driftwood - South Beach Polly Lux" (Apr 2) · "Small Luxury Hotels - South Beach Polly Lux" (Apr 7) · "Driftwood - The Royal South Beach" (Apr 23)

## 13. Canary

First Royal-related response in any new session must include the phrase **"Royal floor: $250 ADR / 70% occ / $4M PIP / $4M acq (27 of 42 units) / 4 NNN commercial @ $0 modeled (~$62K avg potential)"** in the opening summary. If absent, this file isn't loading.

## 14. Learnings

Tags `[FAIL]` / `[WIN]` / `[FAST]`. Append on every mistake, success, or speedup.

- 2026-05-11 [UPDATE]: Royal proforma updated to scenario-dependent PIP ($2M/$4M/$6M) and variable exit caps (6/5/4%). Year 5 IRR Base softened from 15% to 9.3%. Any deck, summary, or client message using old numbers needs to be updated.
