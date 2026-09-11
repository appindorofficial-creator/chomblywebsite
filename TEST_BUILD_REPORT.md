# Test and Build Report

Fecha: 2 de septiembre de 2026.

## Baseline legado

- Integridad: 143/143 archivos coinciden con el inventario SHA-256.
- Build baseline: PASS.
- Tests baseline: 53/54 PASS; el único fallo era una expectativa genérica de CSS `scrollbar-width: thin`, no una regla de dominio.

## Resultado Phase B

| Comando | Resultado |
|---|---|
| `npm run install:ci` | BLOCKED — preflight de tarball Vinext recibió HTTP 403 por acceso de red del entorno; `npm ci` no se inició |
| `npm ls --depth=0` | PASS — árbol instalado íntegro y `vinext@0.0.50` disponible |
| `npm exec tsc -- --noEmit` | PASS — 0 errores |
| `npm run lint` | PASS — 0 errores, 9 warnings |
| `npm test` | PASS — 51/51 |
| `npm run build` | PASS — 10 rutas públicas, 3 experimentos y APIs compiladas |
| Browser responsive smoke | PASS — 390/768/1024/1280/1440 y alcance detallado en QA |

Los 51 tests cubren booking, pagos, leads para las cuatro audiencias, UTMs, analítica sin PII, IDs Web Crypto, experimentos deterministas, rutas/claims/gates y contratos UI. El número es menor que el baseline porque se retiraron pruebas repetitivas de las seis páginas de servicio y del inglés no publicado; las reglas de dominio críticas se conservaron.

Warnings de lint: ocho usos intencionales de `<img>` sobre assets locales controlados/optimizados y una advertencia del React Compiler por `watch()` de React Hook Form. No son errores de build; migrar a una solución de imagen compatible con Vinext y revisar `useWatch` queda como optimización.

## NOT RUN

Consultar `QA_CHECKLIST.md`: emulación reduced-motion/save-data, axe, Lighthouse/CWV/RUM, slow network, lectores de pantalla, dispositivos físicos y smoke D1/CRM desplegado.
