---
command: /boris:watchlist show
description: Show the current watch list
allowed_users: [boris, noel]
---

GET `/api/research/watchlist`. Render grouped by kind:

```
WATCH LIST — actual

Ensayos clínicos
- NCT05425940 — XL092 + Atezolizumab vs Regorafenib
- NCT05627635 — 3B-FOLFOX with BOT/BAL
- …

Drogas
- fruquintinib
- botensilimab/balstilimab
- …

Autores/grupos
- Tabernero
- Bardelli
- …

Tópicos
- ctDNA EGFR rechallenge (peso ×1.2)
- MGMT-directed strategies (peso ×1.3)
```

If empty:
> Watch list vacía. Añadir items con `/boris:watchlist add …`.
