# Manual de Deck · Sistema B|P-D · Directorio Mensual Toyosa

**Versión:** 1.1
**Autor:** Noel Poler · B|P Intelligence
**Estado:** Vivo · extensible (se agregan láminas según evolucione)
**Propósito doble:** (a) spec para construir y reconstruir las láminas del deck · (b) base de los skill files de cada agente

---

## 0 · El concepto · el deck es una partitura

No estamos armando la presentación de un mes. Estamos definiendo la **partitura fija** que el sistema re-interpreta cada mes con datos nuevos. La estructura nunca cambia; cambian las notas (los datos del mes) y la interpretación (las hipótesis y las respuestas del GG).

Consecuencia central: **los agentes no producen "análisis", producen láminas-tipo.** El skill file de cada agente no dice "analiza ventas" — dice "llena las plantillas Tipo A, B y C con la data del mes, genera la hipótesis del delta, y emite el prompt de diálogo al GG."

El directorio es una sinfonía coreografiada precisamente porque la partitura es fija: el GG llega a un deck ya armado, con las preguntas ya planteadas, y su trabajo es responderlas (ensayar la sinfonía), no improvisar (jazz).

---

## 1 · Los tres principios no negociables

**Principio 1 · Toda lámina analítica tiene tres capas.**
Ninguna lámina muestra solo números. Cada una lleva:
1. Los números (en el marco de comparación canónico)
2. La lectura B|P-D (la hipótesis del delta — qué cambió, qué es notable)
3. El diálogo con el GG (la herramienta pregunta, el GG responde, la respuesta es la narrativa)

**Principio 2 · El GG comenta en TODA lámina. Sin excepción.**
No hay lámina analítica sin diálogo del GG. Incluso las de contexto externo:
- En Macro Bolivia, el GG comenta cuál de los indicadores es el más relevante ese mes para Toyosa, cómo afecta al negocio, y si algo cambió materialmente vs el mes anterior.
- La herramienta nunca afirma sola; siempre plantea y el GG valida o explica.

**Principio 3 · Marco de comparación canónico.**
Nunca un número solo. Siempre en su contexto temporal:
- **Mes** (el que evalúa el directorio · ej. Abril '26)
- **YTD** (acumulado del año)
- **Año anterior** (mismo período)
- **Presupuesto** (donde la métrica tiene meta)

Las láminas de KPI usan las cuatro. Mix y concentración usan tres (Mes / YTD / Año anterior) en dos dimensiones (unidades **y** dólares). La disciplina es la misma siempre.

---

## 2 · El patrón de tres capas · en detalle

Toda lámina analítica se construye así:

### Capa 1 · Los números
- Vienen del agente, vía vista SQL gobernada (Teros) o Tableau.
- Se presentan en el marco de comparación canónico.
- Las cifras pasan por la previa del CFO antes de publicarse (validación de veracidad = Juan Carlos).

### Capa 2 · La lectura B|P-D
- El agente compara el mes vs período anterior y **detecta los deltas materiales.**
- Formula la hipótesis: "el margen subió 297bps; hipótesis: mix más premium."
- Es hipótesis, no afirmación. B|P-D no firma lo que no fue validado.

### Capa 3 · El diálogo con el GG
- El agente **genera la pregunta** dirigida al GG, basada en el delta detectado.
- Formato: contexto del cambio + pregunta puntual + opciones de causa.
- Ejemplo: *"El peso de motos en unidades subió de X% a Y% entre año anterior y YTD. GG: ¿estacional o cambio estructural de demanda? ¿Implicación para el inventario que pedimos?"*
- La respuesta del GG se convierte en la narrativa de la lámina.
- Quién valida qué (referencia permanente): **estructura editorial** = Boris + Edwin · **contenido** = Gerónimo (GG) · **veracidad de cifras** = Juan Carlos (CFO).

### El elemento visual del diálogo · caja de chat

El prompt al GG se presenta SIEMPRE con el mismo elemento visual: una **caja de diálogo tipo chat**, reconocible en todas las láminas analíticas. Es la firma del sistema.

Estructura de la caja:
- Encabezado: `↔ B|P-D` + estado (`B|P-D activo`)
- Mensaje del agente: la pregunta generada (contexto del cambio + pregunta puntual)
- Área de respuesta del GG: donde aparece la respuesta una vez integrado el backend
- En ciclo 1 la caja es mock-up (input deshabilitado, nota "El chat se activa con backend real"); del ciclo 2 en adelante es interactiva.

La misma caja aparece en las 18 láminas analíticas. Que sea idéntica en todas es deliberado: el directorio aprende a reconocerla como "acá B|P-D le pregunta algo al GG, y acá está la respuesta del GG." Es lo que hace visible la coreografía.

---

## 3 · Estructura de secciones · la partitura

Orden fijo del deck:

| Sección | Contenido | Agente(s) |
|---|---|---|
| **0 · Apertura** | Portada · Chairman B\|P-D | — |
| **1 · Amazing Facts** | Los titulares del mes que el GG valida | Orquestador + Ventas |
| **2 · Carry-forward** | Compromisos del directorio anterior + status | Orquestador |
| **3 · Macro Bolivia** | Contexto macroeconómico · 9 indicadores · el GG comenta el más relevante del mes | Económico |
| **4 · Ventas** | Ventas totales · Mix · Concentración por sucursal · Drill modelo · **Market share** (incl. contexto mercado + benchmark) | Ventas + Industria |
| **5 · Financieras** | P&L · Márgenes · Balance comparativo · Crédito/deuda | Financiero + Márgenes + Crédito |
| **6 · Inventario** | Salud de inventario · Pipeline logístico | Inventario |
| **7 · Otros Temas** | Temas ad-hoc del mes | ad-hoc |
| **8 · Conclusiones** | Decisiones + acciones + propuestas al directorio | Orquestador |

El macro abre el cuerpo del deck (después de los titulares y el carry-forward) porque setea el escenario económico sobre el que se leen los resultados de Toyosa. El GG comenta cuál indicador es el más relevante ese mes y cómo afecta al negocio (Principio 2).

---

## 4 · Los tipos de lámina · las skills reutilizables

Cada tipo es una plantilla que un agente corre cada mes. Hay ~6 tipos. Definir bien estos seis define todo el deck.

### Tipo A · KPI Headline
**Usos:** Amazing Facts, Ventas totales, P&L, Balance.
**Referencia visual:** lámina "Datos Impresionantes" del deck Intermex.
**Estructura:**
- Números grandes en el marco de 4 comparaciones (Mes / YTD / Año ant / Presupuesto)
- Cada KPI con su delta y su semáforo (verde/ámbar/rojo)
- Capa 2: la lectura del cierre (qué historia cuentan los números juntos)
- Capa 3: el GG valida los titulares y explica las causas de los más notables
**Lógica de hipótesis:** rankear los KPIs por magnitud de delta; los 3-4 de mayor delta son los "amazing facts" candidatos que el GG valida.

### Tipo B · Composición / Mix
**Usos:** Mix por marca, Concentración por sucursal, Aging de inventario.
**Estructura:**
- Ancla de contexto arriba: el total (ventas, unidades) en Mes / YTD / Año anterior
- Dos tablas rankeadas: una en **unidades**, una en **dólares**, cada una con las tres columnas de período
- El ranking se lee distinto en cada dimensión — **esa brecha ES la historia** (ej. Yamaha #2 en unidades, último en dólares)
- Capa 2: cómo cambió la composición entre los tres períodos
- Capa 3: el GG explica el cambio de mix — ¿one-off o estructural? ¿implicaciones?
**Lógica de hipótesis:** detectar qué componente ganó/perdió más peso (pp) entre año anterior y YTD; ese es el cambio de mix a explicar.

### Tipo C · Drill / Hipótesis
**Usos:** Drill por modelo (LC70), márgenes, crédito.
**Estructura:**
- Tabla detallada ítem-a-ítem (modelo, banco, línea de margen)
- Una columna de **hipótesis B|P-D por fila** (la causa probable de cada delta)
- Capa 3: el GG confirma cuáles hipótesis aplican y cuáles descarta
**Lógica de hipótesis:** por cada ítem con delta material, el agente propone la causa más probable dado el contexto (mix, precio, disponibilidad, estacionalidad).

### Tipo D · Externo / Macro
**Usos:** Macro Bolivia, Mercado automotriz, Benchmark LATAM.
**Estructura:**
- Data de fuentes externas (no Teros). Cambia poco mes a mes.
- Marco de comparación: el indicador vs mes anterior + vs benchmark regional donde aplique
- Capa 3 (clave, por Principio 2): el GG comenta **cuál indicador es el más relevante ese mes para Toyosa, cómo afecta al negocio, y qué cambió**
**Lógica de hipótesis:** marcar el indicador con mayor cambio de semáforo o mayor implicación operativa como el "más relevante del mes" candidato.

### Tipo E · Tracking
**Usos:** Carry-forward, Conclusiones/Decisiones.
**Estructura:**
- Tabla de compromisos: [Punto acordado · Responsable · Status · Detalle/link]
- Para Carry-forward: los compromisos del directorio anterior
- Para Conclusiones: las decisiones y acciones que este directorio define
- Capa 3: el GG actualiza el status de cada compromiso
**Lógica de hipótesis:** el agente arrastra los compromisos abiertos del ciclo anterior y marca cuáles vencen este mes.

### Tipo Intro
**Usos:** Portada, Chairman B|P-D.
Fijas. Casi no cambian mes a mes (solo fecha y período). Sin diálogo GG.

---

## 5 · Taxonomía canónica de láminas · v1

Mapeo de cada lámina a sección, tipo, agente dueño, y diálogo GG. **Todas las analíticas tienen diálogo GG = sí (Principio 2).**

| # | Lámina | Sección | Tipo | Agente | GG |
|---|---|---|---|---|---|
| 1 | Portada | 0 | Intro | — | no |
| 2 | Chairman B\|P-D · 4 pilares | 0 | Intro | — | no |
| 3 | **Amazing Facts** · titulares del mes | 1 | A | Orq + Ventas | **sí** |
| 4 | Dashboard KPIs · lectura del cierre | 1 | A | Financiero | **sí** |
| 5 | **Carry-forward** · compromisos anteriores | 2 | E | Orquestador | **sí** |
| 6 | **Macro Bolivia** · 9 indicadores | 3 | D | Económico | **sí** |
| 7 | Ventas totales · Mes/YTD/Año ant/Presup | 4 | A | Ventas | **sí** |
| 8 | Mix por marca · unidades + $ · 3 períodos | 4 | B | Ventas | **sí** |
| 9 | Concentración por sucursal · 3 períodos | 4 | B | Ventas | **sí** |
| 10 | Drill por modelo · hipótesis | 4 | C | Ventas | **sí** |
| 11 | Market share + mercado automotriz | 4 | D | Industria | **sí** |
| 12 | Benchmark LATAM | 4 | D | Industria | **sí** |
| 13 | P&L resumen · gap EBITDA→neto | 5 | A | Financiero | **sí** |
| 14 | Márgenes | 5 | C | Márgenes | **sí** |
| 15 | Balance comparativo | 5 | A | Financiero | **sí** |
| 16 | Crédito / deuda bancaria | 5 | C | Crédito | **sí** |
| 17 | Salud de inventario · aging + cobertura | 6 | B | Inventario | **sí** |
| 18 | Pipeline logístico · etapas | 6 | C | Inventario | **sí** |
| 19 | (Otros temas ad-hoc del mes) | 7 | variable | ad-hoc | **sí** |
| 20 | Conclusiones · decisiones + propuestas | 8 | E | Orquestador | **sí** |

> Total v1.1 = 20 láminas. Extensible: postventa, flujo de caja, REIT/real estate, bridge macro→operativo, y otros pueden agregarse como láminas de su tipo correspondiente sin romper la estructura.

---

## 6 · Cómo se genera la capa 3 · el motor del diálogo GG

Esto es el corazón del valor y lo que hace al sistema replicable. La lógica es la misma para toda lámina:

1. **Detectar el delta material.** El agente compara el período actual vs anterior y identifica los cambios que superan un umbral (ej. >10% en una métrica, >2pp en mix, cambio de semáforo en macro).
2. **Formular la pregunta.** Por cada delta material, el agente arma: `[contexto del cambio] + [pregunta puntual] + [opciones de causa probable]`.
3. **Esperar la respuesta del GG.** La pregunta queda en la lámina como prompt. El GG responde en la previa.
4. **Integrar la respuesta como narrativa.** La respuesta del GG reemplaza la hipótesis tentativa y se vuelve la lectura oficial de la lámina.

La regla de oro: **si la pregunta abre escenarios que impactan decisiones, la respuesta del GG debe ser validada por un gerente antes de presentarse al directorio.** El sistema no presenta escenarios de decisión sin validación gerencial.

**Por qué es replicable:** la lógica "detectar delta → formular pregunta" es idéntica cada mes. Solo cambian los datos. El agente nunca improvisa la estructura de la pregunta; usa la plantilla de su tipo de lámina.

---

## 7 · Conexión con los skill files de los agentes

Cada agente "posee" un conjunto de láminas-tipo. Su skill file especifica:
- Qué láminas produce (por # y tipo)
- Qué vista SQL / fuente Tableau consume para cada una
- El marco de comparación de cada lámina
- La lógica de detección de delta material (umbrales)
- El formato del prompt de diálogo al GG

Ejemplo · Agente Ventas:
> Produce láminas 6 (Tipo A · Ventas totales), 7 (Tipo B · Mix), 8 (Tipo B · Concentración), 9 (Tipo C · Drill modelo). Consume `vista_ventas` sobre gtauto. Marco: Mes/YTD/Año ant/Presupuesto. Umbral delta: >10% unidades o $, >2pp mix. Por cada delta material, emite prompt GG según plantilla del tipo.

Esto hace cada skill file **concreto y testeable**: se puede verificar que el agente produjo la lámina correcta con el marco correcto y el prompt correcto.

---

## 8 · Pendientes de definir

1. **Umbrales de delta material** por tipo de métrica — calibrar con el GG y el CFO (qué tan grande debe ser un cambio para que el agente lo marque y pregunte).
2. **Láminas adicionales candidatas** (a decidir más adelante): postventa (¿propia o dentro de ventas?), flujo de caja, REIT/real estate, bridge macro→operativo. Cada una se asigna a un tipo existente sin romper la estructura.
3. **Marco de comparación de Tipo D** (externo/macro) — definir contra qué se compara cada indicador macro (mes anterior, trimestre, benchmark regional).

**Decidido en v1.1:** ubicación de Macro Bolivia (Sección 3, después de Carry-forward) · formato visual del prompt GG (caja de chat, ver Sección 2).
