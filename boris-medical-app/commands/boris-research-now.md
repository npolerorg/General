---
command: /boris:research-now
description: Force a full daily-cycle search immediately
allowed_users: [boris, noel]
rate_limit: 1 per hour per user
---

Trigger the same workflow that the daily cron runs, but on-demand. Steps:

1. Check rate limit (`audit_log` query: same user_id + this command within last 60 min). If exceeded, respond:
   > Búsqueda forzada disponible en [N] minutos. La última corrió a [HH:MM] hora Chile.

2. POST to `/api/research/digest` with the cron secret. Stream progress to the user:
   - "Buscando PubMed (8 queries)…"
   - "Buscando ClinicalTrials.gov…"
   - "Scoring hallazgos…"
   - "Construyendo digesto…"

3. When done, render the new digest inline + link to `/research`.

4. If anything in the digest exceeds the alert threshold, surface a Format A summary directly in the chat.
