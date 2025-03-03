import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadPostsPage } from "@/sanity/loader/loadQuery";

import BlogModulesLayout from "./BlogModulesLayout";

const BlogModulesPreview = dynamic(() => import("./BlogModulesPreview"));

export async function BlogModules() {
  const initial = await loadPostsPage();
  const isDraftMode = await draftMode();
  if (isDraftMode.isEnabled) {
    return <BlogModulesPreview initial={initial} />;
  }

  return <BlogModulesLayout data={initial.data} />;
}
