# Run Local

## Requisitos

- Node.js 22.13 o superior.
- npm con el lockfile incluido.
- Wrangler y Vinext se instalan como dependencias del proyecto.

## Instalación y desarrollo

```bash
npm run install:ci
npm run dev
```

`install:ci` valida y descarga el tarball de Vinext fijado antes de ejecutar `npm ci`. Si el entorno restringe el registry y responde 403, el resultado correcto es `BLOCKED`, no un fallo del source. En un checkout ya instalado se puede comprobar integridad operativa con `npm ls --depth=0` y ejecutar la batería siguiente; Engineering debe repetir la instalación limpia en una red con acceso al registry configurado.

Para inicializar D1 local cuando se prueben formularios:

```bash
npm exec wrangler d1 migrations apply DB --local --config wrangler.d1.jsonc
```

Preview compatible con ChatGPT Sites:

```bash
sites-preview start "$PWD"
sites-preview status
sites-preview stop
```

## Verificación

```bash
npm exec tsc -- --noEmit
npm run lint
npm test
npm run build
```

`npm test` ejecuta build y las pruebas Node. Los tests habilitan los gates legados con variables `CHOMBLY_TEST_ONLY_*` únicamente contra el host sentinel `.invalid`; estas variables no deben configurarse en ningún entorno desplegado.

Abrir siempre el smoke principal en `/es-co`. Probar además las cuatro variantes de `/es-co/join?audience=owner|professional|clinic|partner` y las tres rutas `/es-co/e/*`.
