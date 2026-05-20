# Solicitud de accesos — toyosa-directorio MVP

**Para:** Juan Carlos Herrera (CFO) · Israel · Manuel Diaz
**De:** Noel Poler (B|P Intelligence)
**Fecha:** W1 — 2026-05-19 → 2026-05-26
**Asunto:** Accesos necesarios para construir el deck del directorio con agentes IA en 30 días

---

Hola Juan Carlos, Israel y Manuel,

Para arrancar la construcción del nuevo deck del directorio (kickoff Lunes 2026-05-19, target ~2026-06-19), necesitamos los accesos abajo. Marqué con **🚦 gating** los que bloquean W2 si no llegan; el resto puede llegar durante W1-W2.

Todo es **read-only**. No modificamos data. Si algún acceso requiere aprobación interna o vendor, avísenme y movemos al fallback.

---

## 1. Alchemy ERP — 🚦 gating W2

| Item | Detalle |
|---|---|
| Tipo de acceso | Read-only |
| Módulos | Ventas · Inventario · P&L · Balance · CxC · CxP |
| Mecanismo preferido | API REST con API key + IP allowlist |
| Fallback aceptable | Export CSV diario a SFTP / Google Drive shared folder |
| Owner Toyosa | Manuel Diaz |
| Owner B|P | Noel + Dylan (automation) |

**Pregunta:** ¿Alchemy expone API REST o solo permite exports? Si solo exports, ¿podemos configurar un job programado a las 7:00am diario a una carpeta Drive `toyosa-erp-export/{YYYY-MM-DD}/`?

---

## 2. Tableau Cloud — 🚦 gating W2

| Item | Detalle |
|---|---|
| Tipo de acceso | PAT token (Personal Access Token) |
| Scope | Workbooks: Ventas · Financiero · Inventario · Share-of-Market |
| APIs habilitadas | REST API v3.12+ · Metadata GraphQL API · Hyper API si aplica |
| Mecanismo | PAT con expiry 90 días, renovable. Scope project-level (no admin del site). |
| Fallback | Embed token + REST API v3.12 con login service account |
| Owner Toyosa | Israel |

**Pregunta:** ¿Tienen disponibilidad de generar un PAT con scope limitado? Si no, propongo cuenta service-account `bp-intelligence@toyosa.bo` con permisos read-only a los workbooks listados.

---

## 3. Google Drive — 9 archivos Excel

| Item | Detalle |
|---|---|
| Tipo | Shared folder read-only |
| Archivos requeridos | Costeo.xlsx · Flujo Proyectado.xlsx · Bancos.xlsx · EERR_{YYYY-MM}.xlsx · Balance_{YYYY-MM}.xlsx · Reconciliación Crown.xlsx · Reconciliación Toyosa.xlsx · Stock.xlsx · Directorio_{YYYY-MM}.pptx |
| Mecanismo | Google Drive shared folder con cuenta `noel@poler.org` (read) |
| Fallback | OneDrive shared link |
| Owner Toyosa | Juan Carlos (financieros) · Rudy (Stock) |

**Pregunta:** ¿Pueden compartir una carpeta Drive `toyosa-data-bp/` con los 9 archivos? Para cierre mensual, ¿pueden auto-uploadear los archivos del cierre Mayo el día 5 de Junio?

---

## 4. Balance mensual — recurrente

| Item | Detalle |
|---|---|
| Cadencia | Cierre día 5 del mes siguiente |
| Formato | Excel consistente (mismo template cada mes) |
| Mecanismo | Drive auto-upload a `toyosa-data-bp/Balance_{YYYY-MM}.xlsx` |
| Fallback | Email a `data-directorio@bpintelligence.com` (TBD) |
| Owner Toyosa | Juan Carlos |

---

## 5. Macro Bolivia — sin gestión Toyosa, FYI

| Item | Detalle |
|---|---|
| Fuentes | INE Bolivia · BCB · IMF WEO · World Bank |
| Mecanismo | WebFetch directo (sin auth) |
| Owner B|P | Noel (AI Económico) |

No requiere acción de su parte. Solo confirmar que está OK que consultemos fuentes públicas Bolivia desde nuestros servidores.

---

## 6. Industria automotriz Bolivia

| Item | Detalle |
|---|---|
| Fuentes | ANCB (Asoc. Nacional de Comerciantes en Bolivia) · Asoc. Importadores · Toyota LATAM monthly reports |
| Mecanismo preferido | WebFetch + subscripción email ANCB |
| Fallback | PDF manual upload a Drive `toyosa-data-bp/industria/` |
| Owner Toyosa | Edwin (gestiona relación ANCB) |

**Pregunta:** Edwin — ¿ANCB publica registros vehiculares mensual en su web sin login, o requiere subscripción? ¿Tienes acceso a Toyota LATAM monthly?

---

## 7. Inventario tránsito Intermex → Bolivia

| Item | Detalle |
|---|---|
| Data | Shipments con fecha embarque · ETA · unidades · costo unitario |
| Mecanismo | Excel Stock.xlsx hoja "Tránsito" + email shipping agent |
| Fallback | Update semanal manual por Rudy |
| Owner Toyosa | Rudy |

**Pregunta:** Rudy — ¿la hoja "Tránsito" del Stock.xlsx tiene fecha embarque + ETA + unidades + costo por shipment? Si falta algo, ajustamos.

---

## 8. Líneas de crédito (7 bancos)

| Item | Detalle |
|---|---|
| Data | Utilización mensual por banco · tasa vigente · covenants |
| Mecanismo | Excel Bancos.xlsx |
| Fallback | Reporte mensual de tesorería en PDF |
| Owner Toyosa | Juan Carlos |

**Pregunta:** ¿El Excel Bancos.xlsx incluye todos los 7 bancos (Chile, USA, Panamá según engagement)? ¿Las tasas se actualizan automáticamente o manualmente?

---

## Siguiente paso

Idealmente confirmamos los items 1, 2, 3 (los 🚦 gating) **antes del martes 26-mayo 17:00** (próximo weekly sync). Para los demás, agradezco confirmación a más tardar **viernes 30-mayo**.

Cualquier alternativa o restricción del lado IT/seguridad, encantado de ajustar el mecanismo. La data nunca sale del entorno Toyosa sin aprobación explícita de Juan Carlos.

Saludos,
Noel
