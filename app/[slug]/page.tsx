import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { ZonaPage } from "@/components/ZonaPage";
import { getServiceSlugs, getServiceMeta } from "@/lib/content";
import { getZonaRouteSlugs, getZonaByRouteSlug } from "@/lib/zonas";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getServiceSlugs(), ...getZonaRouteSlugs()].map((slug) => ({
    slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const zona = getZonaByRouteSlug(params.slug);
  if (zona) {
    return buildMetadata({
      title: `Carpintería a Medida en ${zona.zona}`,
      description: zona.intro,
      path: `/${params.slug}`,
    });
  }
  const meta = getServiceMeta(params.slug);
  if (!meta) return {};
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${meta.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  if (getZonaByRouteSlug(params.slug)) {
    return <ZonaPage routeSlug={params.slug} />;
  }
  const meta = getServiceMeta(params.slug);
  if (!meta) notFound();
  return <ServicePage slug={params.slug} />;
}
