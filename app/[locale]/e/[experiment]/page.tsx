import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AudienceForm } from "@/components/forms/audience-form";
import { EventBeacon } from "@/components/analytics-beacon";
import {
  EXPERIMENTS,
  experimentsFor,
  type ExperimentId,
} from "@/config/experiments";
import { assignVariant, safeAnonymousId } from "@/lib/experiments/assign";
import { metadataFor } from "@/lib/seo";
import { isLocale } from "@/lib/locale";

function isExperimentId(value: string): value is ExperimentId {
  return value in EXPERIMENTS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; experiment: string }>;
}): Promise<Metadata> {
  const { locale, experiment } = await params;
  if (!isExperimentId(experiment)) return {};
  const pathLocale = isLocale(locale) ? locale : "es-co";
  const definition = experimentsFor(pathLocale)[experiment];
  return metadataFor(
    definition.title,
    definition.variants[0].body,
    `/${pathLocale}/e/${experiment}`,
    { noindex: true, locale: pathLocale },
  );
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ locale: string; experiment: string }>;
}) {
  const { locale: rawLocale, experiment } = await params;
  if (!isExperimentId(experiment)) notFound();
  const locale = isLocale(rawLocale) ? rawLocale : "es-co";

  const definition = experimentsFor(locale)[experiment];
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const anonymousId = safeAnonymousId(
    requestHeaders.get("x-chombly-anon-id") ||
      cookieStore.get("chombly_anon_id")?.value,
  );
  const variantId = assignVariant(experiment, anonymousId);
  const variant =
    definition.variants.find((item) => item.id === variantId) ||
    definition.variants[0];
  const route = `/${locale}/e/${experiment}`;

  return (
    <main id="main-content" className="experiment-page">
      <EventBeacon
        name="experiment_exposed"
        properties={{
          route,
          audience: definition.audience,
          experiment_id: experiment,
          thesis_id: definition.thesisId,
          variant_id: variant.id,
          source: definition.source,
        }}
      />
      <div className="container experiment-grid">
        <div className="experiment-copy">
          <p className="eyebrow">
            {definition.hypothesisLabel} {definition.priority} · {definition.title}
          </p>
          <h1>{variant.headline}</h1>
          <p>{variant.body}</p>
          <div className="experiment-disclosure">
            <strong>{definition.disclosureTitle}</strong>
            <span>{definition.disclosureBody}</span>
          </div>
          <dl className="experiment-context">
            <div>
              <dt>{definition.signalLabel}</dt>
              <dd>{definition.qualifiedSignal}</dd>
            </div>
            <div>
              <dt>{definition.nextLabel}</dt>
              <dd>{definition.downstream}</dd>
            </div>
          </dl>
        </div>
        <AudienceForm
          defaultAudience="owner"
          route={route}
          compact
          submitLabel={definition.cta}
          experiment={{
            experimentId: experiment,
            thesisId: definition.thesisId,
            variantId: variant.id,
          }}
        />
      </div>
    </main>
  );
}
