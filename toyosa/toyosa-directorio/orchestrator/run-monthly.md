# Orchestrator — Ciclo mensual

## Trigger

**MVP (primer ciclo):** manual.
```
/directorio-mensual periodo=2026-06
```

**Post-MVP:** wired a `scheduled-tasks` MCP. Disparo automático **día 5 del mes siguiente al cierre** (cuando Juan Carlos cierra el periodo). Si Balance no está en `verified-numbers/YYYY-MM/` al día 5, retry día 6, 7, 8 (luego escalar).

## DAG

```
                ┌──────────────────┐
                │  AI Económico    │  WebFetch INE, BCB, IMF, WB
                └────────┬─────────┘  → Slide 2 + contexto para 3, 8, 14
                         │
                ┌────────▼─────────┐
                │  AI Industria    │  WebFetch ANCB, Toyota LATAM
                └────────┬─────────┘  → Slides 3, 4
                         │
                ┌────────▼─────────┐
                │  AI Ventas       │  Alchemy + Tableau ventas
                └────┬──────┬──────┘  → Slides 5, 6, 7, 8 + db-ventas
                     │      │
        ┌────────────▼┐    ┌▼─────────────┐
        │AI Inventario│    │ AI Financiero│
        └─────┬───────┘    └──┬───────┬───┘
              │               │       │
              │           ┌───▼──┐ ┌──▼────────┐
              │           │AI Mg │ │AI Crédito │
              │           │enes  │ │           │
              │           └───┬──┘ └──────┬────┘
              │               │           │
              ▼               ▼           ▼
          Slide 9         Slide 11    Slide 12
          db-inv          db-marg     db-banking
                                      db-balance
              │               │           │
              └───────────────┴───────────┘
                              │
              ┌───────────────▼──────────────┐
              │  Orchestrator cross-synth    │
              │  - Detecta puntos clave      │
              │  - Genera Slide 0 (Amazing)  │
              │  - Genera Slide 1 (default)  │
              │  - Genera Slide 13 (WIs)     │
              │  - Genera Slide 14 (RE fr)   │
              │  - Genera Slide 15 (PaT)     │
              └───────────────┬──────────────┘
                              ▼
                  ┌─────────────────────┐
                  │  Renderer           │
                  │  drafts/*.md → HTML │
                  └──────────┬──────────┘
                             ▼
                  drafts/YYYY-MM/state.json = DRAFT-R1
                             │
                             ▼
                  Notifica gmail-mcp a validadores
                  + chat panel queda activo para iteración
```

## Pasos detallados

### 1. Preparación (orchestrator init)
```
- Lee verified-numbers/{periodo-1}/locked.md (para comparativos YoY/PY)
- Verifica acceso a Tableau PAT, Alchemy, Google Drive, etc.
- Crea drafts/{periodo}/state.json con todos los slides en estado PENDING
- Crea audit-log/{periodo}/chat-history.jsonl vacío
- Crea verified-numbers/{periodo}/ vacío (los agentes lo van llenando)
```

### 2. Ejecución secuencial (con cross-feeds)
```
- AI Económico → llena verified-numbers/{periodo}/macro.md + emite findings
- AI Industria → llena industria.md (consume macro.md), emite findings
- AI Ventas → llena ventas.md (consume macro.md + industria.md), emite findings
- AI Inventario → llena inventario.md (consume ventas.md), emite findings
- AI Financiero → llena financiero.md (paralelo a ventas), emite findings
- AI Márgenes → llena margenes.md (consume ventas.md + financiero.md), emite findings
- AI Crédito → llena credito.md (consume financiero.md), emite findings
```

### 3. Cross-synthesis (orchestrator)
```
- Consolida todos los findings (json) de los 7 agentes
- Aplica reglas de punto-clave-rules.md
- Selecciona top 5 amazing facts por ranking de impacto
- Genera Slide 0 (Amazing Facts) en drafts/{periodo}/slide-0.md
- Genera Slide 1 (Conclusión GG default) en drafts/{periodo}/slide-1.md
- Carry-forward: lee drafts/{periodo-1}/slide-15.md (puntos a trabajar del mes anterior)
  y genera nuevo Slide 15 con estado actualizado de cada item
- Genera Slide 13 (What-Ifs pre-cargados) — los 2 escenarios por default
- Genera Slide 14 (RE framing) — texto fijo a menos que --refresh
```

### 4. Render
```
- Lee orchestrator/deck-spec.md (orden + estructura)
- Lee drafts/{periodo}/slide-*.md
- Inyecta cifras y narrativas en render/template-deck.html
- Genera final/{periodo}/deck.html (versión DRAFT-R1)
- Marca todos los slides como DRAFT-R1 en state.json
```

### 5. Notificación
```
- gmail-mcp envía email a validadores con link al deck
- Cada slide tiene su validador (ver deck-spec.md §5)
- Email incluye: estado por slide, enlaces a sub-dashboards, link al chat
```

### 6. Iteración (chat-agent toma el control)
```
- Validadores interactúan vía chat (ver chat-agent/CLAUDE.md)
- Cada interacción registrada en audit-log/{periodo}/chat-history.jsonl
- Re-render incremental: solo regenera slides afectados por el override
- Slide state avanza DRAFT-R1 → DRAFT-R2 → DRAFT-R3 → APPROVED
```

### 7. Lock
```
/lock-deck periodo=2026-06
- Verifica que todos los slides estén APPROVED (o que Edwin confirme override)
- Freeza verified-numbers/{periodo}/locked.md
- Renderiza final/{periodo}/deck.html versión LOCKED
- Genera PDF backup final/{periodo}/deck.pdf
- Post-lock: cualquier cambio crea deck-v2.html
```

## Idempotencia

- `verified-numbers/{periodo}/` se persiste inmutable después del primer fetch exitoso de cada agente.
- Rerun del comando sin `--refresh` regenera drafts desde cifras cacheadas (rápido).
- `--refresh` invalida cache de agente específico o todos:
  - `/directorio-mensual periodo=2026-06 --refresh=economico` solo macro
  - `/directorio-mensual periodo=2026-06 --refresh=all` todo

## Errores y fallbacks

| Error | Comportamiento |
|---|---|
| Tableau PAT inválido | Output `DATA GAP: Tableau no accesible` en slides afectados, no estimar |
| Alchemy API timeout | Retry 3x con backoff, luego fallback a último export CSV en Drive |
| INE/BCB caído | Usa último dato cacheado + nota de fecha |
| Excel source no encontrado | `DATA GAP: [archivo]` en slides afectados |
| Override de chat conflictivo (ej. número fuera de rango razonable) | Chat agent pide confirmación explícita antes de aplicar |
