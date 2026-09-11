import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AudienceForm } from "@/components/forms/audience-form";
import { EventBeacon } from "@/components/analytics-beacon";
import { EXPERIMENTS, type ExperimentId } from "@/config/experiments";
import { assignVariant, safeAnonymousId } from "@/lib/experiments/assign";
import { metadataFor } from "@/lib/seo";

function isExperimentId(value: string): value is ExperimentId {
  return value in EXPERIMENTS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ experiment: string }>;
}): Promise<Metadata> {
  const { experiment } = await params;
  if (!isExperimentId(experiment)) return {};
  const definition = EXPERIMENTS[experiment];
  return metadataFor(
    definition.title,
    definition.variants[0].body,
    `/es-co/e/${experiment}`,
    { noindex: true },
  );
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ experiment: string }>;
}) {
  const { experiment } = await params;
  if (!isExperimentId(experiment)) notFound();

  const definition = EXPERIMENTS[experiment];
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
  const route = `/es-co/e/${experiment}`;

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
            Hipótesis {definition.priority} · {definition.title}
          </p>
          <h1>{variant.headline}</h1>
          <p>{variant.body}</p>
          <div className="experiment-disclosure">
            <strong>Esto es una prueba de concepto.</strong>
            <span>
              No es un producto clínico, un diagnóstico ni una capacidad disponible.
            </span>
          </div>
          <dl className="experiment-context">
            <div>
              <dt>Señal calificada</dt>
              <dd>{definition.qualifiedSignal}</dd>
            </div>
            <div>
              <dt>Siguiente paso</dt>
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

