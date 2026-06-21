import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { getServiceSlugs, getServiceMeta } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const meta = getServiceMeta(params.slug);
  if (!meta) return {};
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${meta.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const meta = getServiceMeta(params.slug);
  if (!meta) notFound();
  return <ServicePage slug={params.slug} />;
}
