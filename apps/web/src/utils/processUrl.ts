import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { stegaClean } from "@sanity/client/stega";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function (
  page: LinkReferenceType,
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
  }

  const slug = page.slug?.replace(/^\/+/, "");
  const path = page.slug === "index" ? null : slug;

  return (
    (base ? BASE_URL + "/" : "/") +
    [directory, path, stegaClean(params)].filter(Boolean).join("/")
  );
}
