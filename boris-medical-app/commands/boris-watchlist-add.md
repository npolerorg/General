---
command: /boris:watchlist add
description: Add an NCT, drug, author, institution, or topic to the watch list
allowed_users: [boris, noel]
usage: /boris:watchlist add [NCT12345678|drug:fruquintinib|author:Tabernero|institution:MSKCC|topic:"ctDNA EGFR rechallenge"]
---

Parse the argument:
- `NCT\d{8}` → kind=`nct`, value=NCT id
- `drug:<name>` → kind=`drug`
- `author:<surname>` → kind=`author`
- `institution:<name>` → kind=`institution`
- `topic:"<phrase>"` → kind=`topic`

POST to `/api/research/watchlist`. On success, confirm:
> Añadido a watch list: <kind> <value>. Los próximos digestos lo monitorearán explícitamente.

If the argument doesn't parse, respond with the usage line.
