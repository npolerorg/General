# HospitalityIQ Dashboard — Dream Inn Hotel
### Handoff to Dylan Poler · May 2026

**Live site:** https://hospitalityiq-dashboard.netlify.app/  
**GitHub repo:** https://github.com/npolerorg/General  
**Netlify project:** `hospitalityiq-dashboard` (under Noel Poler's account)

---

## What This Is

An operations and analytics dashboard for the Dream Inn Hotel (2710 N Ocean Drive, Hollywood Beach, FL), owned by MR9 Holdings, LLC. Noel Poler / The Poler Team built and uses it as a live command center for property management, financial tracking, vendor oversight, and strategic planning.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (loaded via CDN — no build step) |
| Styling | Custom CSS + Tailwind-style utility classes (inline in each HTML file) |
| Backend | Netlify Functions (serverless) |
| AI Chat | Claude Sonnet via Anthropic API |
| State persistence | Netlify Blobs (key-value store) |
| Hosting | Netlify |

**Important:** There is no build/compile step. Each page is a self-contained `index.html` file that loads React and Babel from CDN and compiles JSX in the browser at runtime. To edit any page, open the relevant `index.html` in a text editor and change the JSX/CSS directly.

---

## Project Structure

```
/
├── index.html                          ← Main dashboard (Command Center)
├── login/index.html                    ← Login/auth page
├── dashboard/index.html                ← Financial overview dashboard
├── noi/index.html                      ← NOI (Net Operating Income) analysis
├── ai-brief/index.html                 ← AI-generated briefings
├── reservations/index.html             ← Reservations tracker
├── competitors/index.html              ← Competitor analysis
├── properties/index.html               ← Property details
│
├── royal-hotel/
│   ├── index.html                      ← Royal Hotel overview
│   ├── data-problem/index.html         ← Data reconciliation tool
│   ├── performance/index.html          ← Performance metrics
│   ├── strategic/index.html            ← Strategic planning
│   └── proposal/index.html             ← Proposal documents
│
├── netlify/
│   └── functions/
│       ├── chat.js                     ← AI chat backend (calls Claude API)
│       └── slider-state.mjs            ← Saves dashboard slider positions
│
├── netlify.toml                        ← Netlify deploy config
├── package.json                        ← Only Netlify function dependencies
├── floor-plan.png                      ← Property floor plan image
└── _next/                              ← Compiled static assets (do not edit)
```

---

## Running Locally

### Option 1 — Netlify CLI (recommended, includes functions + AI chat)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Install function dependencies
npm install

# Log in to Netlify (one-time)
netlify login

# Start local dev server with functions
netlify dev
```

This runs the site at `http://localhost:8888` with full AI chat and slider-state persistence working.

### Option 2 — Simple static server (no AI chat)

```bash
# Python (built into macOS/Linux)
python3 -m http.server 8080

# Then open http://localhost:8080
```

The AI chat and slider persistence won't work without the Netlify functions, but all pages and UI will render.

---

## Environment Variables

The AI chat feature requires one secret key. In Netlify's dashboard:

**Site → Environment Variables → Add variable:**

| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | Get from https://console.anthropic.com |

For local development, create a `.env` file (never commit this):
```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

---

## How to Make Changes

Since there's no build system, editing is straightforward:

1. Open the relevant `index.html` file in VS Code or any editor
2. Find the `<script type="text/babel">` section — all the React component code is there
3. Edit the JSX and save
4. Refresh the browser to see changes

**To update financial data:** Search for the month/metric you want to update directly in the HTML file — all data is hardcoded as JavaScript constants near the top of each file's script section.

**To update the AI system prompt** (what the AI knows about the hotel): Edit `netlify/functions/chat.js` and modify the `SYSTEM_PROMPT` constant at the top.

---

## Deploying Changes

### Via GitHub (automatic)
Push to the `main` branch and Netlify auto-deploys within ~60 seconds.

```bash
git add .
git commit -m "describe your change"
git push
```

### Via Netlify CLI (manual)
```bash
netlify deploy --prod
```

---

## Key Pages & What They Do

| Route | Purpose |
|-------|---------|
| `/` | Main command center — nav hub with status overview |
| `/dashboard` | Financial KPIs, monthly P&L, expense breakdown |
| `/noi` | Net Operating Income tracking vs targets |
| `/reservations` | Booking pipeline and occupancy |
| `/ai-brief` | AI-generated property briefings |
| `/competitors` | Local competitor benchmarking |
| `/royal-hotel` | Royal South Beach Hotel section |
| `/royal-hotel/data-problem` | Data reconciliation and discrepancy tracking |
| `/royal-hotel/strategic` | Strategic planning documents |
| `/royal-hotel/proposal` | Proposal materials |

---

## Contacts & Ownership

- **Owner:** Noel Poler — noel@polerteam.com
- **Property:** Dream Inn Hotel, 2710 N Ocean Drive, Hollywood Beach, FL
- **Entity:** MR9 Holdings, LLC
- **Netlify account:** Under Noel Poler's email
- **GitHub:** https://github.com/npolerorg/General
- **Anthropic API:** Under Noel Poler's account at console.anthropic.com

---

## Notes for Dylan

- All the hotel financial data, unit details, vendor info, and strategic notes live inside the HTML files themselves — there's no separate database. If data needs to be updated, find it in the relevant `index.html` and edit it directly.
- The `_next/` folder contains compiled JavaScript assets referenced by the HTML pages. Don't edit those files.
- The `.claude/` folder contains Claude Code session config — you can ignore it.
- Netlify Blobs (used by `slider-state.mjs`) requires a Netlify deployment to work — it won't persist locally without `netlify dev`.
- If the AI chat stops working, the most likely cause is an expired or missing `ANTHROPIC_API_KEY` in Netlify's environment variables.
