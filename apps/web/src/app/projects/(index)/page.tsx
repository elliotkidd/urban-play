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
  const { page, tags } = await searchParams;

  const { data } = await fetchProjectsIndexPageData();
  if (!data) return null;

  const {
    colorScheme,
    header,
    description,
    solutions,
    pageBuilder,
    _id,
    _type,
    title,
  } = data ?? {};

  const POSTS_PER_PAGE = 12;
  const currentPage = parseInt(page, 10) || 1;
  const indexFrom = (currentPage - 1) * POSTS_PER_PAGE;
  const indexTo = indexFrom + POSTS_PER_PAGE;

  return (
    <main
      className="bg-background text-text"
      style={getColorSchemeStyle(colorScheme)}
    >
      <section
        style={getColorSchemeStyle(header.colorScheme)}
        className="relative bg-background text-text overflow-hidden h-screen flex items-center"
      >
        <PageHeader {...header} />
      </section>
      <ProjectsHeader description={description} solutions={solutions} />
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid
          solutions={solutions}
          title={title}
          tags={tags}
          indexFrom={indexFrom}
          indexTo={indexTo}
          perPage={POSTS_PER_PAGE}
        />
      </Suspense>

      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
