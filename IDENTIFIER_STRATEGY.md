# Identifier strategy

All application identifiers are generated through `lib/ids.ts`. The helper uses
`crypto.getRandomValues`, sets the RFC 4122 version/variant bits, and never falls
back to `Math.random`. This keeps the implementation secure in browsers, edge
runtimes and servers that expose Web Crypto but omit `crypto.randomUUID`.

| Previous call site | Classification | Current strategy |
| --- | --- | --- |
| `components/forms/audience-form.tsx` | IDEMPOTENCY KEY / CLIENT ID | `createIdempotencyKey`; form stays disabled if secure entropy is unavailable |
| `components/booking-flow.tsx` | IDEMPOTENCY KEY / CLIENT ID | `createIdempotencyKey`; legacy gated flow fails closed if entropy is unavailable |
| `proxy.ts` | CLIENT ID | `createClientId` for the experiment anonymous cookie at the edge |
| `app/api/leads/route.ts` | SERVER ID | `createServerId` |
| `app/api/bookings/route.ts` | SERVER ID | `createServerId` |
| `app/api/professionals/route.ts` | SERVER ID | `createServerId` for profiles and schedule holds |
| `app/api/checkout/route.ts` | SERVER ID | `createServerId` inside the gated payment reference |
| `tests/{leads,booking,payment}.test.mjs` | TEST ONLY | Explicit Node `randomUUID` import; not bundled into the application |

`tests/ids.test.mjs` verifies format, version/variant bits, uniqueness and the
fail-closed behavior when cryptographic entropy is unavailable.

No sustituir esta estrategia por timestamps, contadores o `Math.random`. Si un runtime no ofrece `crypto.getRandomValues`, la operación se bloquea de forma explícita y no genera un identificador débil.
