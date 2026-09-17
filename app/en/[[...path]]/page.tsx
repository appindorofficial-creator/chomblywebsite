import { redirect } from "next/navigation";

/** Legacy `/en/*` paths → current `/en-us/*` locale routes. */
export default async function LegacyEnPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const suffix = path?.length ? `/${path.join("/")}` : "";
  redirect(`/en-us${suffix}`);
}
