import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routes, allEntries } from "@/data/content";
import { Home, StandardPage, Detail, titles } from "@/components/pages";
export const dynamicParams = false;
export function generateStaticParams() {
  return routes.map((r) => ({ path: r ? r.split("/") : [] }));
}
type Props = { params: Promise<{ path?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = ((await params).path || []).join("/");
  const entry = allEntries.find((e) => e.slug === path.split("/").at(-1));
  return {
    title: titles[path] || entry?.title || "Sembrar voces, florecer cambios.",
    description:
      entry?.summary || "Florecer: plataforma estudiantil de demostración.",
  };
}
export default async function Page({ params }: Props) {
  const path = ((await params).path || []).join("/");
  if (!routes.includes(path)) notFound();
  if (!path) return <Home />;
  if (titles[path]) return <StandardPage path={path} />;
  const entry = allEntries.find((e) => e.slug === path.split("/").at(-1));
  if (!entry) notFound();
  return <Detail entry={entry} />;
}
