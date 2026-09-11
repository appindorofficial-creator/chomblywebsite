# Chomby Bogotá: implementation and launch boundary

## Delivered in this update

- Spanish and English routes, reciprocal language links, translated public content and booking/account UI.
- Six service-specific forms, simplified to three steps. Bogotá locality, Colombia time, species and service options, home address only when required, hotel departure, four-week recurrence where applicable.
- Requests persist in D1 and belong to the signed-in user's stable Site identity. The supported platform login is Sign in with ChatGPT. No app-owned password or OAuth implementation.
- Professional applications persist; only the owner-configured admin can approve them. Pending applicants cannot see requests. Unassigned approved professionals see care needs, dates and locality, but not email, phone or street address.
- Approved professionals submit a final COP total, scope, location or connection details, and cancellation terms. Proposals reserve the requested intervals for up to 24 hours, ending at least one hour before service. SQLite overlap trigger + atomic D1 batch prevent double booking, including recurring sessions and hotel stays.
- Customers review proposals, initiate Wompi hosted checkout, cancel unpaid requests, request review for payments in flight or already made, and download confirmed appointments as ICS.
- Server-signed checkout amount/reference/expiry; no client-provided charge amount. Signed Wompi events + authoritative transaction lookup verify the result. Browser redirects never confirm a payment. Duplicates do not downgrade a paid booking. Late successful payments with expired holds require review; cancellation during payment requires refund review.
- Automatic help chat answers platform FAQs, in the current language. It is not a human agent, generative medical service or diagnosis channel. Chat messages are not persisted.
- New illustrative photos for veterinary care, grooming and dog walking; clean mascot asset replaces the original screenshot containing phone UI. No fabricated professional identity or real-time availability.

## Actual launch dependencies

1. Merchant-owned Wompi production account: configure `WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET` and `WOMPI_EVENTS_SECRET` securely in Sites runtime settings. Do not paste secrets in public code, the manifest or chat.
2. Merchant dashboard webhook: the public Site origin plus `/api/wompi`. Use the correct production merchant and verify an end-to-end transaction, decline, cancellation and reconciliation before enabling real customers. Current integration intentionally blocks collection without all production keys. Provider verification uses its event secret and authoritative API lookup; external service integration has not been exercised with a real merchant.
3. Actual professional onboarding/credential verification and agreements. No sample providers are activated or seeded. Profiles may not self-approve.
4. Final price in COP (US$10 remains informational), commissions/settlement/refund operations, complete legal identity, verified support channel, privacy retention and service terms. The explanatory privacy page is not a completed commercial policy.
5. Video calls, prescription issuance, automatic emails/SMS and automated refunds are not integrated. Professionals must state their actual connection/location details in the offer. Status messages are in the account; no notifications are implied.
6. Public publication requires owner approval under Sites hosting rules. This source update is saved before asking. D1 migration is applied at deployment, not by local tests.

## Validation

50 tests currently pass against the production Worker bundle using an isolated SQLite D1 adapter and synthetic identities/payment events. They cover bilingual SSR, all six forms, authorization, request persistence and idempotency, input validation, professional approval, privacy of unassigned requests, overlap rollback, cancellation and signed checkout/webhook state changes. No test sends real funds or books a real professional.

The supervised browser rendered and visually inspected the Spanish home and chat; the chat's price answer was exercised. The cloud browser blocked navigation to the English preview path with `ERR_BLOCKED_BY_CLIENT`; both languages and all routes were checked by Worker SSR tests. Mobile layout is implemented with responsive CSS; device-specific browser QA is still required. TypeScript reports the starter's missing Cloudflare ambient types (`cloudflare:workers`, `Fetcher`, `D1Database`); the production Vite/Worker build passes.

## SEO and AEO

Canonical and reciprocal hreflang URLs, server-rendered Spanish/English text, descriptive titles, semantic headings and visible FAQ JSON-LD. No invented reviews, ratings, prices or veterinary licenses. Search engine indexing stays disabled while commercial setup is incomplete. Enable indexing and update the sitemap only after launch facts and the final public domain are confirmed. Search ranking or inclusion in AI answers is not guaranteed.

Integration sources checked: https://docs.wompi.co/en/docs/colombia/widget-checkout-web/ and https://docs.wompi.co/en/docs/colombia/eventos/ and https://docs.wompi.co/en/docs/colombia/transacciones/ .
