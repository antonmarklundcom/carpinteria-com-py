# carpinteria.com.py

Sitio SEO + generación de leads para una carpintería paraguaya que construye
en madera a medida (quinchos, casas, cocinas, aberturas, decks, placares y
más). Todo el sitio empuja a un objetivo: **pedir un presupuesto gratis por
WhatsApp**.

- **Mercado:** Paraguay. **Idioma:** español paraguayo (voseo).
- **Modelo de conversión:** WhatsApp-first. Cada página termina en un CTA de
  WhatsApp con mensaje prellenado.
- **Stack:** Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS.
  Contenido en MDX, sin base de datos.
- **Diseño:** "Warm Minimal" (Design 4) — blanco cálido, acento arena/oro,
  verde de confianza en todos los CTAs.

---

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completá al menos el número de WhatsApp
npm run dev                  # http://localhost:3000
npm run build                # build de producción
npm start                    # servir el build
```

Requiere **Node 22.x LTS**.

---

## Variables de entorno

El sitio funciona completo con solo las variables mínimas. Las demás se agregan
después y degradan con elegancia (si faltan, simplemente no se loguea a ese
destino, pero el lead siempre llega a WhatsApp).

| Variable | ¿Mínima? | Descripción |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL canónica del sitio (ej. `https://carpinteria.com.py`). |
| `NEXT_PUBLIC_BRAND_NAME` | ✅ | Nombre de la marca que aparece en header, footer y metadatos. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ | Número en formato internacional, sin `+` ni espacios (ej. `595981123456`). |
| `NEXT_PUBLIC_ZONE` | ✅ | Reemplaza el token `[Zona]` en H1s y copy (ej. `Gran Asunción`). |
| `GHL_WEBHOOK_URL` | ⬜ | Webhook de GoHighLevel para loguear leads. |
| `SHEETS_WEBHOOK_URL` | ⬜ | Webhook de Google Sheets (ej. Apps Script) para loguear leads. |

> **El sitio buildea y corre con las variables pendientes vacías.** Los secretos
> van solo en el panel del host, nunca commiteados.

---

## Cómo funcionan los leads

Flujo único, nunca bloqueante, WhatsApp-first:

1. El usuario completa el formulario (`nombre`, `whatsapp`, `tipo`, `mensaje`
   opcional) o toca un botón de WhatsApp.
2. El cliente arma el `waUrl` (deep link `wa.me` prellenado) y, en el mismo
   handler, manda el lead a `POST /api/v1/lead` con
   [`navigator.sendBeacon`](https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon)
   (fallback a `fetch` con `keepalive`) y **redirige a WhatsApp**. Así el lead
   se loguea aunque la pestaña navegue a WhatsApp.
3. El endpoint valida con zod y hace fan-out en paralelo (`Promise.allSettled`,
   3 reintentos con backoff) a:
   - `lib/ghl.ts` → `GHL_WEBHOOK_URL`
   - `lib/sheets.ts` → `SHEETS_WEBHOOK_URL`
4. **Nunca bloquea:** si un logger falla, está sin configurar o da timeout, el
   endpoint igual responde `{ ok: true, waUrl }`. El usuario siempre llega a
   WhatsApp.

No hay webhooks entrantes, pagos, auth ni base de datos.

---

## Cómo agregar o editar un servicio

Cada página de servicio es un archivo MDX en `content/servicios/<slug>.mdx`.
El "chrome" de la página (breadcrumb, hero, formulario, FAQ, bloque de
relacionados, CTA, footer, barra sticky) lo renderiza la plantilla compartida
`components/ServicePage.tsx` — **no se escribe en el MDX**.

### Contrato del frontmatter (validado con zod en build)

```yaml
---
title: "Título para <title> y meta"            # string
h1: "H1 visible (puede usar el token [Zona])"  # string
slug: "mi-servicio"                            # debe coincidir con el nombre del archivo
pillar: "obra"                                 # "obra" | "aberturas" | "a-medida"
primaryKw: "palabra clave principal"           # string
description: "Meta description en voseo"        # string
h2s:                                            # se usan para SEO / referencia
  - "Primera sección"
  - "Segunda sección"
faq:                                            # incluí siempre una de "¿cuánto sale...?"
  - q: "¿Cuánto sale...?"
    a: "Respuesta que rutea a WhatsApp, nunca un precio inventado."
related:                                         # slugs para el cluster de relacionados
  - "otro-servicio"
order: 1                                         # orden en índices
listed: true                                     # false = oculto de nav/índice/sitemap
---

Párrafo de intro (va antes del primer ##; se muestra en el hero).

## Primera sección
Copy en voseo bajo este H2. La plantilla agrega un CTA de WhatsApp al cierre.

## Segunda sección
Más copy...
```

El cuerpo se parte por encabezados `##`: lo que va antes del primer `##` es la
intro del hero; cada `##` se convierte en una `<section>` con su copy y un CTA
de WhatsApp al final.

Para **ocultar** un servicio del nav, el índice y el sitemap (pero dejarlo
accesible por URL), poné `listed: false` (ej. `/durlock-y-cielorrasos`).

---

## SEO

- `metadata` por página desde el frontmatter (title, description, canonical,
  OpenGraph).
- JSON-LD: `Organization` + `LocalBusiness` en el home; `Service` + `FAQPage` +
  `BreadcrumbList` en las páginas de servicio. Sin `aggregateRating`/reviews
  inventados.
- `app/sitemap.ts` y `app/robots.ts` se generan desde el contenido.
- Linkeo interno automático desde `pillar` + `related`, con bloque visible de
  "Servicios relacionados".
- Solo gradientes locales como placeholders — sin imágenes remotas.

---

## Deploy en Hostinger (Node.js gestionado)

Build/start estándar de Next.js. **Nunca usar `output: 'export'`** (hay una
API route).

1. hPanel → **Websites** → **Add Website** → **Node.js Apps**.
2. **Import Git Repository** → branch `main`.
3. Preset **Next.js** → root `./` → **Node 22.x LTS**.
4. Cargá las variables de entorno (mínimo: `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_ZONE`).
5. **Deploy** → asociá el dominio.

CI: en cada push corre `npm ci && npm run build`
(`.github/workflows/ci.yml`). GitHub es la fuente de verdad; el repo es
privado.

---

## Rutas

```
/                                Home
/servicios                       Índice de servicios (por pilar)
/quienes-somos                   Nosotros
/contacto                        Contacto + zonas

# Pilar 1 — Obra y estructuras en madera
/quinchos                        Quinchos a Medida            (FLAGSHIP)
/galerias-y-porches              Galerías y Porches de Madera
/casas-de-madera                 Casas y Cabañas de Madera
/decks-y-pergolas                Decks y Pérgolas de Madera
/techos-de-madera                Techos y Estructuras de Madera
/escaleras-de-madera             Escaleras de Madera a Medida

# Pilar 2 — Aberturas de madera
/puertas-de-madera               Puertas de Madera a Medida   (FLAGSHIP)
/portones-de-madera              Portones de Madera a Medida
/ventanas-y-aberturas            Ventanas y Aberturas de Madera

# Pilar 3 — Carpintería a medida / empotrados
/muebles-de-cocina               Muebles de Cocina a Medida   (FLAGSHIP)
/mesadas-de-cocina               Mesadas de Cocina a Medida
/placares-y-vestidores           Placares y Vestidores a Medida
/machimbre-y-revestimientos      Machimbre y Revestimientos de Madera
/muebles-de-bano                 Muebles de Baño a Medida
/muebles-a-medida                Muebles a Medida y Empotrados

# Opcional (unlisted hasta confirmar cuadrilla de durlock)
/durlock-y-cielorrasos           Durlock y Cielorrasos
```
