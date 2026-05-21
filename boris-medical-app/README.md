# Boris Medical App — `oncology-research-agent` package

This directory contains the deliverables described in `cancer_research_agent_prompt.md`: a senior medical research analyst subagent dedicated to the case of **Boris Buvinic Guerovich** (66, mid-rectal adenocarcinoma, MSS / MGMT-methylated / RAS-BRAF WT, treated at Clínica Las Condes, Santiago).

It is built as a **drop-in package** for the (not-yet-built) main Boris Medical App. When the main app repo is created, the contents of this directory copy in 1:1 at the repo root.

## What's in here

| Path | Deliverable | Status |
|---|---|---|
| `agents/oncology-research-agent.md` | Subagent definition + full system prompt | ✅ built |
| `hooks/validate-no-treatment-recommendation.ts` | Blocks "you should take X" language | ✅ built |
| `hooks/validate-evidence-level-tagged.ts` | Requires Alta/Moderada/Baja tag on every study claim | ✅ built |
| `hooks/validate-confidence-stated.ts` | Requires explicit confidence statement at end | ✅ built |
| `hooks/validate-citations.ts` | Every drug/trial mention must carry PMID or NCT ID | ✅ built |
| `hooks/validate-no-prognosis.ts` | Blocks prognosis discussion unless user requested | ✅ built |
| `hooks/audit-log.ts` | Logs every search and every output | ✅ built |
| `lib/research/boris-profile.ts` | Immutable molecular + clinical context | ✅ built |
| `lib/research/pubmed-search.ts` | PubMed E-utilities client + query patterns | ✅ built |
| `lib/research/ctgov-search.ts` | ClinicalTrials.gov v2 client + watch list | ✅ built |
| `lib/research/relevance-scoring.ts` | The 5-factor 0.00-1.00 scoring algorithm | ✅ built |
| `lib/research/digest-builder.ts` | Daily digest assembly | ✅ built |
| `lib/research/output-formats.ts` | Format A/B/C templates (Spanish) | ✅ built |
| `app/research/page.tsx` | `/research` dashboard | ✅ built |
| `app/research/components/*` | Dashboard widgets | ✅ built |
| `app/research/findings/[id]/page.tsx` | Finding detail page | ✅ built |
| `app/research/settings/page.tsx` | Notification + threshold settings | ✅ built |
| `app/api/research/*` | API routes (digest cron, search, analyze, chat, watchlist) | ✅ built |
| `vercel.json` | Cron `0 11 * * *` UTC = 07:00 Chile | ✅ built |
| `commands/*.md` | 6 slash commands | ✅ built |
| `tests/research-agent.test.ts` | 12 test scenarios from the spec | ✅ built |
| `docs/research-agent-user-guide.md` | User guide for Boris and Noel (Spanish) | ✅ built |

## Hard dependencies on the main app (not built yet)

These exist as **typed import stubs** in `lib/main-app-deps.ts`. They must be provided by the main app before this package runs:

1. **`CLAUDE.md` hierarchy with canary phrase** "Listo, Boris — todo cargado."
2. **Supabase backend** with tables: `molecular_profile`, `verified_numbers`, `research_findings`, `conversations`, `messages`, `alerts`, `watch_list`, `audit_log`
3. **MCP server `boris-medical`** exposing tools: `get_verified_number`, `get_molecular_profile`, `search_pubmed_for_boris`, `search_clinical_trials_for_boris`, `generate_consult_prep`
4. **Skills**: `mcrc-knowledge-base`, `research-relevance-scoring`, `vendor-due-diligence`
5. **Subagents**: `consult-prep-writer` (for the "Discuss with Samtani" button integration)
6. **Env vars**: `ANTHROPIC_API_KEY`, `VOYAGE_API_KEY`, `PUBMED_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## Models

- **Reasoning** (synthesis, deep-dive, document analysis): `claude-opus-4-7`
- **High-throughput** (PubMed abstract triage, watch-list pre-filtering): `claude-sonnet-4-6`

## Languages

- All proactive output: **Spanish**
- On-demand: Spanish unless Boris/Noel explicitly request English
- Code, comments, technical identifiers: English

## Hard rules (enforced by hooks)

- Every drug/trial claim → PMID, NCT ID, ASCO/ESMO abstract ID, FDA doc, or DOI
- Every study claim → evidence level tag (Alta/Moderada/Baja)
- Every output → confidence statement (Alta/Moderada/Baja + one-sentence reason)
- No treatment recommendation language ("you should take", "I recommend", "the best option is")
- No prognosis discussion unless explicitly requested
- No marketing language ("breakthrough", "revolutionary", "game-changing", "promising")
- No invented or estimated numbers — if not in the source, say "not reported"
