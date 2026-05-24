---
name: bp-critique
description: Sistema autónomo de crítica para entregables B|P-D. Invocá este skill antes de presentar cualquier deliverable (deck, brief, análisis) a Noel o al directorio. El skill decide qué roles aplicar (RT, Audit, Research) y sintetiza el output en un reporte único.
---

# B|P Critique · Orquestador

## Cuándo invocar
- Después de producir o editar cualquier deliverable del proyecto B|P-D Toyosa
- Antes de presentar al usuario un v0.X de cualquier deck o brief
- Cuando se detecta una afirmación que requiere validación externa
- A pedido explícito del usuario ("aplicá B|P Critique")

## Roles disponibles
Leé y aplicá los tres roles definidos en este directorio:
- ROLE-AUDIT.md — auditor de proceso y completitud
- ROLE-RT.md — red team / contraargumentos
- ROLE-RESEARCH.md — investigación profunda externa

## Workflow
1. Leer el deliverable completo
2. Decidir qué roles aplican (matriz abajo)
3. Invocar cada rol mediante el Agent tool (subagente) en paralelo cuando sea posible; pasá a cada subagente el contenido del rol correspondiente más el fragmento del deliverable a revisar
4. Sintetizar findings en un solo reporte estructurado
5. Devolver: deliverable original + Pre-flight Check Report

> Nota de mecánica: donde los roles mencionan "Task tool" se refieren al Agent tool de este harness. Donde ROLE-RESEARCH menciona "web_search" se refiere a WebSearch / WebFetch.

## Matriz de decisión
| Tipo de deliverable | Audit | RT | Research |
|---|---|---|---|
| Lámina nueva del deck | Sí | Sí | Si hay claim sin fuente |
| Refactor menor | Sí | No | No |
| Brief Tier 2 nuevo | Sí | Sí | Sí |
| Cierre del ciclo (cinco propuestas) | Sí | Sí | Si hay propuesta sin precedente |
| Respuesta a pregunta del GG | Sí (rápido) | Sí (rápido) | Solo si requerido |

## Output estructurado
Devolvé un bloque markdown así:

```
## Pre-flight Check Report

### AUDIT (proceso + completitud)
- [PASS / FAIL] Reglas del proyecto respetadas (ej. solo vs YoY y presupuesto)
- [PASS / FAIL] Aritmética interna consistente
- [PASS / FAIL] Fuentes citadas para toda data
- [HALLAZGOS] ...

### RT (contraargumentos)
- [CUESTIONAMIENTOS] Lista de afirmaciones que un peer escéptico atacaría
- [HIPÓTESIS ALTERNATIVAS] ...
- [RIESGO] Qué pasa si X es incorrecto

### RESEARCH (si aplicó)
- [GAPS RESUELTOS] Lista de data que el research llenó
- [FUENTES] Citadas con confianza (alta/media/baja)
- [CONTRADICCIONES] Data contradictoria si la hay

### RECOMENDACIÓN FINAL
- [GO / NO-GO / REVISAR]
- Lista de items a corregir antes de presentar al usuario
```

## Reglas no negociables del proyecto Toyosa B|P-D
- Solo comparación contra año anterior y presupuesto (no cifras 2017-2024)
- Real Estate excluido de cifras automotrices
- DATA GAP explícito cuando aplica
- Voz neutra, sin alarma ni triunfalismo
- Español-Bolivia formal-directo
- Una lámina = un mensaje principal en el título
- B|P-D nunca afirma lo no verificado por default
- Tableau es source explícito en las láminas que lo usan
