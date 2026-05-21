---
command: /boris:deep-dive
description: Topic deep-dive across PubMed, ClinicalTrials.gov, conferences
allowed_users: [boris, noel]
usage: /boris:deep-dive [topic in English or Spanish]
---

Invoke Workflow 2 (Topic deep-dive) of the oncology-research-agent.

Steps:
1. Translate the topic into 1-3 PubMed query strings (use the agent's mCRC vocabulary; do not over-broaden).
2. Run `/api/research/search` with each query + a parallel CT.gov search filtered by Boris's biomarkers.
3. Pull conference abstracts if in season (ASCO/ESMO/AACR + GI counterparts) via web_fetch.
4. Synthesize Format C:
   - Rank findings by evidence level.
   - Filter every paragraph through Boris-applicability.
   - Cite every claim (PMID/NCT/DOI).
   - Close with: lo más accionable, lo no sabido, lo a mirar próximamente.
5. Save the resulting analysis to `research_findings` with a synthetic source_id `deepdive:[slug]:[timestamp]`.
6. Render in chat + link to the finding detail page.
