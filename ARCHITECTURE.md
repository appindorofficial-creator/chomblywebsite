# Architecture

## Decisión

Se mantiene Next.js App Router sobre Vinext, React, TypeScript, Cloudflare Workers, D1 y Drizzle. La experiencia pública nueva se separa del dominio transaccional legado; no se migra D1 ni Workers durante pre-PMF porque el backend preservado ya tiene reglas y pruebas valiosas.

## Límites

1. `config/`: modo, claims, audiencias, rutas, experimentos, liderazgo y feature flags.
2. `app/[locale]` + `components/marketing`: experiencia pública sin autenticación.
3. `components/forms` + `app/api/leads`: captación de investigación, sin texto clínico libre.
4. `lib/analytics` y `lib/crm`: contratos desacoplados de proveedor.
5. `app/api/bookings|professionals|checkout|wompi` y componentes legacy: dominio futuro, gated.

## Modos

| Modo | Web pública | Leads | Booking legado | Pagos | Indexing |
|---|---:|---:|---:|---:|---:|
| PRELAUNCH | Sí | Sí | No | No | No |
| PILOT | Sí | Sí | Solo flag explícito | No | No por defecto |
| LIVE | Sí | Sí | Solo flag explícito | Solo flag explícito | Solo flag explícito |

Una capacidad pendiente nunca cambia de estado por el copy. `config/claims.ts` permite `LIVE`, `PRELAUNCH`, `PILOT`, `VISION`, `PENDING_PRODUCT` y `PENDING_LEGAL`; los dos estados pendientes no se renderizan públicamente.

## Flujo de leads

Navegador → React Hook Form/Zod → `POST /api/leads` → validación de origen/tamaño/esquema → idempotencia/rate limit → D1 `leads` → adapter CRM opcional. El cliente recompone metadata confiable (`audience`, source, route, UTMs y atribución experimental) desde estado/configuración al enviar; el servidor vuelve a validar todo. Analytics recibe solo propiedades permitidas y nunca el payload del formulario.

## Datos

- `leads`: señales de validación y consentimiento.
- `professionals`, `bookings`, `holds`: dominio heredado preservado.
- La migración nueva es `drizzle/0001_serious_kid_colt.sql`.
- No hay R2 ni almacenamiento de archivos en esta fase.

## Auth y seguridad

La web pública no exige login. El adapter SIWC legado se conserva únicamente para el producto gated y no se considera la solución final de identidad de Chombly. Los endpoints de producto responden 404 fuera de sus gates. Wompi exige modo LIVE, flag, firma de evento, consulta autoritativa de la transacción y validación de comercio/importe/moneda.

El límite de reemplazo de auth está en `app/chatgpt-auth.ts` y los consumidores del dominio legado. Una identidad futura debe resolver sesión server-side, roles, revocación y auditoría sin confiar en headers aportados por un cliente público; no cambia los formularios de marketing anónimos.

Los identificadores de navegador, edge y servidor usan la estrategia Web Crypto
compartida de `IDENTIFIER_STRATEGY.md`. Ninguna ruta de aplicación depende de
`crypto.randomUUID`, que no está disponible en todos los navegadores embebidos.

## Localización

`LocaleCode` contempla `es-co` y `en-us`; solo `es-co` está habilitado. El routing rechaza locales no publicados. La extracción completa de copy a diccionarios se difiere hasta aprobar contenido en inglés.
