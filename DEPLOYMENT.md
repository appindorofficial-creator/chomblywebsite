# Deployment and Engineering Handoff

## Pasos exactos para Oscar / Engineering

1. Importar el ZIP final y ejecutar `npm run install:ci` con Node 22.13+ en una red con acceso al registry fijado; no reutilizar `node_modules` del paquete.
2. Confirmar `npm ls --depth=0`, `npm exec tsc -- --noEmit`, `npm run lint`, `npm test` y `npm run build`.
3. Crear/configurar D1 y aplicar `drizzle/0000_groovy_legion.sql` seguido de `drizzle/0001_serious_kid_colt.sql` en staging.
4. Cargar variables de `ENVIRONMENT.md` por entorno; nunca copiar secretos a `.env.example` ni al cliente.
5. Mantener `NEXT_PUBLIC_CHOMBLY_SITE_MODE=PRELAUNCH`, indexing false, producto legado false y pagos false.
6. Desplegar primero un preview privado que abra en `/es-co`; ejecutar smoke de 10 rutas, 3 experimentos, cuatro formularios, metadata/noindex y 404 del producto legado.
7. Conectar un dominio solo cuando esté registrado y aprobado; actualizar `NEXT_PUBLIC_CHOMBLY_BASE_URL` y volver a build/deploy.
8. Aprobar legal, privacidad, retención, figura operativa, títulos públicos, fotos, fuentes y CRM antes de abrir acceso.
9. Para PILOT: cambiar solo el modo a `PILOT`; habilitar producto legado únicamente si existe runbook, soporte y aprobación explícita. Pagos continúan false.
10. Para LIVE: completar `RELEASE_CHECKLIST.md`; activar indexing y, por separado, producto/pagos. Ejecutar migraciones y smoke antes de cambiar tráfico.

El reemplazo de identidad se realiza detrás del límite de `app/chatgpt-auth.ts`: autenticar y autorizar server-side, mapear roles y retirar cualquier dependencia de headers confiables del entorno Sites antes de exponer producto fuera de ese entorno.

## Migraciones remotas

Aplicar mediante el mecanismo D1 del entorno. Ejemplo de Wrangler cuando la cuenta lo permita:

```bash
npm exec wrangler d1 migrations apply DB --remote
```

Resolver primero el binding real; no usar el UUID placeholder local de `vite.config.ts`.

## Rollback

- Revertir a la versión Sites anterior.
- Volver el modo a `PRELAUNCH` y desactivar `CHOMBLY_LEGACY_PRODUCT_ENABLED`, `CHOMBLY_PAYMENTS_ENABLED` e indexing.
- Las migraciones son aditivas; no eliminar la tabla `leads` como parte de un rollback de aplicación.

## DNS, secretos y dominio

El equipo propietario mantiene DNS, hosting, credenciales y secretos. Este paquete no contiene un dominio registrado, claves Wompi, token CRM ni clave PostHog.
