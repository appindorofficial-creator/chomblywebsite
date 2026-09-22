# Azure App Service (Node) — Chombly website

## Objetivo

Publicar este sitio (Next.js / Vinext standalone) en el App Service `chomblywebsite`, alineado con el resto de proyectos en Azure (mismo portal y GitHub Actions), sin reescribir a .NET.

## Requisitos en Azure Portal

1. App Service **`chomblywebsite`**
2. Stack: **Node 22 LTS** (Linux). Si quedó en .NET, cámbialo en **Configuración → Configuración general → Stack**.
3. **Comando de inicio**:
   ```bash
   node server.js
   ```
4. Application settings (mínimo PRELAUNCH):

| Nombre | Valor sugerido |
|---|---|
| `NEXT_PUBLIC_CHOMBLY_SITE_MODE` | `PRELAUNCH` |
| `NEXT_PUBLIC_CHOMBLY_INDEXING_ENABLED` | `false` |
| `NEXT_PUBLIC_CHOMBLY_BASE_URL` | URL pública real, p. ej. `https://chomblywebsite-aga4dshkgcdhctdp.westus3-01.azurewebsites.net` (o `https://www.chombly.com` cuando exista). Define canonicals, sitemap y OG. |
| `NEXT_PUBLIC_CHOMBLY_APP_WELCOME_URL` | App producto, p. ej. `https://chombly-dqdzd0h4escvhyfe.westus3-01.azurewebsites.net/Welcome` |
| `NEXT_PUBLIC_CHOMBLY_WHATSAPP` | (Opcional) Solo dígitos internacionales, p. ej. `573001234567` → CTA WhatsApp post-formulario |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | (Opcional) Activa analytics PostHog en el front |
| `CHOMBLY_LEADS_ADMIN_TOKEN` | Token (≥16 chars) para `/es-co/leads` y `GET /api/leads/admin` |
| `CHOMBLY_LEGACY_PRODUCT_ENABLED` | `false` |
| `CHOMBLY_PAYMENTS_ENABLED` | `false` |
| `CHOMBLY_CRM_ADAPTER` | `local` |
| `CHOMBLY_SQLITE_PATH` | `/home/web_sierra/wwwroot/data/chombly.sqlite` |
| `HOST` | `0.0.0.0` |
| `VINEXT_TRUST_PROXY` | `1` |

5. Publish Profile → secret de GitHub `AZURE_WEBAPP_PUBLISH_PROFILE` (ya configurado si lo pegaste antes).

## Deploy

Push a `main` o Actions → **Deploy ChomblyWebsite to Azure** → Run workflow.

El workflow hace `vinext build` (salida `dist/standalone`) y publica el zip en el App Service.

## Base de datos

- PRELAUNCH usa **SQLite** en disco (`CHOMBLY_SQLITE_PATH`), con las migraciones de `drizzle/`.
- Es adecuado para un solo instancia. Si más adelante hay varias instancias o necesidad fuerte de Azure SQL, se migra el driver aparte.
- La DB Azure SQL del wizard **no** se usa todavía con este código.

## Local

```bash
npm ci
npm run dev
# http://localhost:5173/es-co
```

Build de prueba Azure en local:

```bash
npm run build:azure
HOST=0.0.0.0 PORT=8080 npm run start:azure
```

## Notas

- No es el pipeline `dotnet publish` de `chombly`; es el mismo Azure App Service con Node.
- Las animaciones y la UI Next se conservan.
- SEO: con `INDEXING_ENABLED=false` el sitio sigue en `noindex` + `Disallow: /`, pero `/sitemap.xml` ya lista las rutas públicas ES/EN. Al pasar a LIVE, activa indexing, confirma `BASE_URL` y envía el sitemap en Search Console.
