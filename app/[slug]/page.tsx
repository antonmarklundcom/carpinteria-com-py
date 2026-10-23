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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zona = getZonaByRouteSlug(slug);
  if (zona) {
    return buildMetadata({
      title: `Carpintería a Medida en ${zona.zona}`,
      description: zona.intro,
      path: `/${slug}`,
    });
  }
  const meta = getServiceMeta(slug);
  if (!meta) return {};
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${meta.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (getZonaByRouteSlug(slug)) {
    return <ZonaPage routeSlug={slug} />;
  }
  const meta = getServiceMeta(slug);
  if (!meta) notFound();
  return <ServicePage slug={slug} />;
}
