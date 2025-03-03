import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadPostsPage } from "@/sanity/loader/loadQuery";

import BlogIndexHeaderLayout from "./BlogIndexHeaderLayout";

const BlogIndexHeaderPreview = dynamic(
  () => import("./BlogIndexHeaderPreview"),
);

export async function BlogIndexHeader() {
  const initial = await loadPostsPage();
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    return <BlogIndexHeaderPreview initial={initial} />;
  }

  return <BlogIndexHeaderLayout data={initial.data} />;
}
