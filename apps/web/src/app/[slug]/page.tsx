import { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import Page from "@/components/layouts/page/Page";
import { loadPage } from "@/sanity/loader/loadQuery";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import processMetadata from "@/utils/generateMetadata";

const PagePreview = dynamic(
  () => import("@/components/layouts/page/PagePreview"),
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateStaticSlugs("page");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const { data: page } = await loadPage(slug);
  if (!page) notFound();
  return processMetadata(page);
}

export default async function PageRoute({ params }: Props) {
  const slug = (await params).slug;

  const initial = await loadPage(slug);

  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return <PagePreview params={params} initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  const page = initial.data;

  return <Page data={page} />;
}
