---
command: /boris:analyze
description: Run the document-analysis workflow on a URL, paste, or attachment
allowed_users: [boris, noel]
usage: /boris:analyze [URL or paste]
---

Invoke Workflow 1 (Document analysis) of the oncology-research-agent.

Steps:
1. Parse the argument:
   - If a URL on the allowlist (PubMed, CT.gov, FDA, EMA, journal domains, etc.), `fetch_document` and pass content.
   - If a PDF attachment, extract text.
   - If a forwarded email body, classify first: vendor pitch / paper / press release / other. If vendor, delegate to `vendor-due-diligence` skill instead.
2. POST to `/api/research/analyze` with the content and the document type hint.
3. Render the resulting Format C analysis in the chat.
4. Offer a "Discuss with Samtani" button that invokes `consult-prep-writer` to add the finding to the next pre-consult digest.
