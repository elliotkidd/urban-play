import { LINK_REFERENCE_FRAGMENT } from "@/lib/sanity/queries/link";
import { stegaClean } from "@sanity/client/stega";
import { InferType } from "groqd";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function (
  page: InferType<typeof LINK_REFERENCE_FRAGMENT>,
  {
    base = false,
    params,
  }: {
    base?: boolean;
    params?: string;
  } = {},
) {
  let directory = "";
  switch (page._type) {
    case "post":
      directory = "posts";
      break;
    case "postCategory":
      directory = "posts/category";
      break;
    case "postsIndex":
      directory = "posts";
      break;
    case "projectsIndex":
      directory = "projects";
      break;
    case "project":
      directory = "projects";
      break;
    case "project":
      directory = "projects";
  }

  const slug = page.slug?.replace(/^\/+/, "");
  const path = page.slug === "index" ? null : slug;

  return (
    (base ? BASE_URL + "/" : "/") +
    [directory, path, stegaClean(params)].filter(Boolean).join("/")
  );
}
