"use server";

import { sanityFetch } from "@/lib/sanity/live";
import {
  projectIndexPageQuery,
  projectsQuery,
} from "@/lib/sanity/queries/documents";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { getColorSchemeStyle } from "@/utils/utils";
import PageHeader from "@/components/sections/PageHeader";
import { PageBuilder } from "@/components/pagebuilder";
import { getMetaData } from "@/lib/seo";
import { ProjectsHeader } from "../components/ProjectsHeader";
import { Suspense } from "react";
import { ProjectsGridSkeleton } from "../components/ProjectsGrid";

async function fetchProjectsIndexPageData() {
  return await sanityFetch({
    query: projectIndexPageQuery.query,
  });
}

export async function generateMetadata() {
  const { data } = await fetchProjectsIndexPageData();
  if (!data) {
    return getMetaData({});
  }
  return getMetaData(data);
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; tags: string[] }>;
}) {
  const { tags } = await searchParams;

  const { data } = await fetchProjectsIndexPageData();
  if (!data) return null;

  const {
    colorScheme,
    header,
    hero,
    description,
    solutions,
    pageBuilder,
    _id,
    _type,
    title,
  } = data ?? {};

  return (
    <main
      className="bg-background text-text"
      style={getColorSchemeStyle(colorScheme)}
    >
      <h1 className="sr-only">{title}</h1>
      <section
        style={getColorSchemeStyle(header.colorScheme)}
        className="relative bg-background text-text overflow-hidden h-screen flex items-center"
      >
        <PageHeader {...header} />
      </section>
      <ProjectsHeader description={description} solutions={solutions} />
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid tags={tags} />
      </Suspense>

      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
