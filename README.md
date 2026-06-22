# carpinteria.com.py

Sitio SEO + generación de leads para una **carpintería y ebanistería a medida**
paraguaya — un taller con un **equipo de 20 años de experiencia**, no un
unipersonal. Trabaja en **madera y melamina**: cocinas, placares, puertas,
mesadas, muebles de melamina, aberturas y más. Todo el sitio empuja a un
objetivo: **pedir un presupuesto gratis por WhatsApp**.

La construcción pesada (casas, piscinas, techos estructurales, mampostería,
durlock, herrería) vive en el sitio hermano **obra.com.py**, con un bloque de
cross-link reusable (`components/ObraCrossLink.tsx`).

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
| `NEXT_PUBLIC_OBRA_URL` | ⬜ | URL del sitio hermano de obra para el cross-link (default `https://obra.com.py`). |
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
title: "Título para <title> (se le agrega ' | <Brand>')"  # string, sin la marca
h1: "H1 visible (puede usar el token [Zona])"             # string
slug: "mi-servicio"                                       # debe coincidir con el archivo
group: "cocina"                                           # "cocina" | "a-medida" | "madera-exterior" | "servicios"
primaryKw: "palabra clave principal"                      # string
navLabel: "Etiqueta corta"                                # opcional; label en nav/cards (default: h1 recortado)
description: "Meta description en voseo"                   # string
h2s:                                                      # se usan para SEO / referencia
  - "Primera sección"
  - "Segunda sección"
faq:                                                      # incluí siempre una de "¿cuánto sale...?"
  - q: "¿Cuánto sale...?"
    a: "Respuesta que rutea a WhatsApp, nunca un precio inventado."
related:                                                   # slugs para el cluster de relacionados
  - "otro-servicio"
order: 1                                                   # orden dentro del grupo / índices
listed: true                                               # false = oculto de nav/índice/sitemap
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
accesible por URL), poné `listed: false`.

---

## Páginas de zona (red local para "carpintería cerca de mí")

Las location pages viven en `content/zonas/<slug>.mdx` y se renderizan en
`/carpinteria-<slug>` mediante la plantilla `components/ZonaPage.tsx` (reusa el
shell compartido). El slug no lleva acentos ni ñ (ej. `nemby`, `capiata`).

```yaml
---
zona: "Ñemby"                 # nombre display (con acentos/ñ)
slug: "nemby"                 # URL-safe; ruta = /carpinteria-nemby
barrios:                      # barrios/landmarks reales (chips + copy)
  - "Centro"
  - "Cerro Ñemby"
priority: 1                   # menor = más prioridad (Guarambaré = base = 0)
intro: "Lead-in localizado y único (se usa como meta description)."
---

Cuerpo ÚNICO por zona (barrios reales, línea de confianza local, CTA). No
clonar copy entre zonas — penaliza por contenido fino.
```

Agregar/quitar una zona es un archivo: nav, footer, sitemap, JSON-LD
`areaServed` y el strip del home se actualizan solos.

---

## SEO

- `metadata` por página desde el frontmatter. El `<title>` siempre termina en
  ` | <Brand>` (absoluto, vía `buildMetadata`).
- JSON-LD: `Organization` + `LocalBusiness` en el home; `LocalBusiness` en las
  páginas de zona; `Service` + `FAQPage` + `BreadcrumbList` en las de servicio.
  `areaServed` se arma desde las zonas construidas. Sin `aggregateRating`/reviews
  inventados.
- `app/sitemap.ts` y `app/robots.ts` se generan desde el contenido (servicios +
  zonas).
- Clusters de linkeo interno vía `related`: (a) cocina ↔ mesadas ↔ melamina ↔
  placard; (b) puertas ↔ aberturas ↔ machimbre ↔ pérgolas.
- Redirects 301 (renames + merges) en `next.config.mjs`.
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
/servicios                       Índice de servicios (por grupo)
/quienes-somos                   Nosotros
/contacto                        Contacto + zonas

# Servicios (12) — grupos de nav
# Cocina
/muebles-de-cocina               Muebles de Cocina a Medida
/mesadas-de-cocina               Mesadas de Cocina a Medida
# A Medida
/placares                        Placares y Vestidores a Medida
/muebles-de-melamina             Muebles de Melamina a Medida
/muebles-a-medida                Muebles a Medida y Empotrados
/mobiliario-comercial            Mobiliario Comercial y Oficinas
# Madera & Exterior
/puertas-de-madera               Puertas de Madera a Medida
/aberturas-de-madera             Ventanas, Portones y Aberturas de Madera
/machimbre                       Machimbre y Revestimientos de Madera
/pergolas-y-decks                Pérgolas y Decks de Madera
# Servicios
/instalacion-y-terminaciones     Instalación y Terminaciones
/restauracion-y-mantenimiento    Restauración y Mantenimiento

# Zonas (11) — red local /carpinteria-<slug>
/carpinteria-guarambare          (base)   /carpinteria-nemby
/carpinteria-villa-elisa                  /carpinteria-lambare
/carpinteria-asuncion                     /carpinteria-fernando-de-la-mora
/carpinteria-san-lorenzo                  /carpinteria-luque
/carpinteria-capiata                      /carpinteria-mariano-roque-alonso
/carpinteria-limpio

# Redirects 301 (next.config.mjs)
/placares-y-vestidores       → /placares
/machimbre-y-revestimientos  → /machimbre
/decks-y-pergolas            → /pergolas-y-decks
/ventanas-y-aberturas        → /aberturas-de-madera   (merge)
/portones-de-madera          → /aberturas-de-madera   (merge)
/quinchos, /casas-de-madera, /galerias-y-porches      → /servicios
/techos-de-madera, /durlock-y-cielorrasos             → /machimbre
/escaleras-de-madera, /muebles-de-bano                → /muebles-a-medida
```
