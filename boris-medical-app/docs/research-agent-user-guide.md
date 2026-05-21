# Guía del agente de investigación

**Boris y Noel — lo que necesitan saber**

---

## Qué hace este agente

Es un analista de investigación clínica dedicado al caso de Boris. No es un chatbot. No es un asistente general. Funciona como un analista senior que un laboratorio farmacéutico o un centro oncológico integral emplearía para monitorear un caso de alto valor, todo el día, todos los días.

Tiene un único paciente: Boris.

---

## Qué vigila, automáticamente, cada día

A las **07:00 hora de Chile**, el agente corre una búsqueda sistemática en:

- **PubMed** — 8 consultas específicas al perfil de Boris (mCRC MSS, MGMT, anti-EGFR rechallenge, ctDNA, oligometastasis, fruquintinib/FTD-TPI/regorafenib, BOT/BAL, left-sided RAS WT)
- **ClinicalTrials.gov** — ensayos reclutando que matchean los biomarcadores de Boris, priorizados geográficamente: Chile → Argentina → Brasil → EEUU → Europa → resto
- **Watch list** — 4 NCT específicos que estamos siguiendo (XL092+Atezolizumab, 3B-FOLFOX+BOT/BAL, Temozolomida+Irinotecan en MGMT-silenced, Temozolomida+M1774)
- **Reguladores** — FDA, EMA, Anvisa (Brasil), ISP (Chile), ANMAT (Argentina)
- **Conferencias** (en temporada) — ASCO Annual, ESMO, ASCO GI, ESMO GI, AACR
- **Noticias** — BioSpace, Endpoints, STAT (filtrado a colorectal/mCRC)

Cada hallazgo recibe un score de relevancia de 0.00 a 1.00 basado en 5 factores: match molecular (35%), match clínico (25%), nivel de evidencia (20%), accesibilidad geográfica (10%), recencia (10%).

---

## Qué les llega

### Digesto diario
Aparece en `/research` cada mañana. Contiene:
- **Alertas** (relevancia ≥ 0.85) — algo que vale la pena leer hoy
- **Nueva literatura** (0.70-0.85) — para revisar cuando puedan
- **Cambios en ensayos clínicos**
- **Novedades regulatorias**

Si no hay nada relevante: un mensaje honesto que dice "Hoy no hubo hallazgos relevantes nuevos. Próxima búsqueda mañana 07:00." Sin pedir perdón. Sin rellenar.

### Alertas push (relevancia ≥ 0.85)
Llegan en el momento que ocurren — in-app, email, y opcionalmente WhatsApp.

### El chat
Pueden conversar con el agente directamente en `/research`. Sirve para:
- Preguntar lo que sea (ejemplos abajo)
- Pegar un URL de un paper o press release
- Subir un PDF
- Reenviar un email

---

## Cómo preguntarle cosas

Tres tipos de pedidos funcionan bien:

### 1. Análisis de un documento
> "Pegué este URL: https://pubmed.ncbi.nlm.nih.gov/12345678 — ¿qué dice y qué significa para Boris?"

El agente identifica si es paper, abstract, regulación, press release o marketing. Aplica el framework correspondiente. Devuelve un análisis estructurado en español con:
- Resumen ejecutivo (qué importa)
- Datos crudos (qué encontró el estudio)
- Interpretación (qué significa)
- Aplicabilidad a Boris (si aplica o no, y por qué)
- Lo que no sabemos
- Preguntas concretas que Noel puede reenviar al Dr. Samtani
- Fuentes
- Nivel de confianza

### 2. Deep-dive temático
> "¿Qué hay nuevo sobre rechallenge anti-EGFR guiado por ctDNA?"
> "Status de fruquintinib en Chile"
> "Datos de fase 3 de regorafenib en combinación"

El agente busca PubMed + CT.gov + conferencias, sintetiza por nivel de evidencia, filtra por aplicabilidad a Boris.

### 3. Pregunta conversacional
> "¿Debería preocuparme por el nuevo nodo mediastínico?"
> "¿Vale la pena MAYA?"

El agente clasifica la pregunta:
- **Factual** → cita datos, responde
- **Clínica/personal** → la encuadra como pregunta para el Dr. Samtani, no recomienda tratamiento
- **Emocional** → la reconoce, redirige a datos, no refuerza falsa esperanza ni falso pesimismo

---

## Qué nunca va a hacer

- **No recomienda tratamientos.** Ese rol pertenece al Dr. Samtani y al comité oncológico de Las Condes. El agente presenta opciones, analiza, rankea por evidencia. La decisión es de ustedes con su equipo médico.
- **No inventa números.** Si un paper no reporta una cifra, dice "no reportada en la publicación primaria".
- **No usa lenguaje de marketing.** Banned: "breakthrough", "revolucionario", "game-changing". Usa "demostró", "asociado a", "superior al comparador".
- **No discute pronóstico** salvo que Boris o Noel pregunten explícitamente. Y aún así, en rangos, no en cifras puntuales, redirigido al Dr. Samtani.

---

## Cómo actuar cuando aparece una alerta

1. Lean el bloque "Por qué importa".
2. Si la sugerencia es "conversar con Samtani", usen el botón **"Discutir con Samtani"** — eso lo agrega automáticamente al pre-consult digest del próximo control.
3. Si quieren más profundidad antes del control: hagan `/boris:deep-dive` sobre el tema.
4. Si el agente cita un NCT, pueden agregarlo a la watch list con `/boris:watchlist add NCT12345678` — los próximos digestos van a monitorearlo explícitamente.

---

## Comandos rápidos

| Comando | Qué hace |
|---|---|
| `/boris:research` | Abre el dashboard |
| `/boris:research-now` | Fuerza una búsqueda completa ahora (límite 1/hora) |
| `/boris:analyze <URL o paste>` | Análisis de documento |
| `/boris:deep-dive <tema>` | Deep-dive temático |
| `/boris:watchlist add <NCT o droga>` | Añade a la watch list |
| `/boris:watchlist show` | Muestra la watch list actual |

---

## Configuración

En `/research/settings` pueden:
- Activar/desactivar notificaciones (in-app, email, WhatsApp)
- Cambiar la hora de entrega del digesto
- Cambiar idioma (default: español)
- Subir o bajar el umbral de alerta (default: 0.85)

---

## Una nota sobre el tono

Este agente está diseñado para ser **honesto antes que entusiasta**. Va a decir "todavía no sabemos" más seguido de lo que un asistente normal lo diría. Va a decir "esto no aplica a tu caso" cuando algo prometedor en abstracto no se aplica al perfil de Boris. Va a producir digestos vacíos en días sin novedades en lugar de inflar.

Eso es la idea. Su valor no está en el volumen de información — está en filtrar señal de ruido en un campo donde el ruido es altísimo.
