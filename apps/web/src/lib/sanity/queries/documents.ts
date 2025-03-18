import { InferType, q } from "groqd";
import { HERO_FRAGMENT, SECTIONS_FRAGMENT } from "./sections";
import {
  COLOR_SCHEME_FRAGMENT,
  IMAGE_FRAGMENT,
  TILE_FRAGMENT,
} from "./fragments";
import { RICHTEXT_BLOCKS } from "./richText";

export const homePageQuery = q("*")
  .filterByType("homePage")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("homePage"),
    title: q.string(),
    pageBuilder: SECTIONS_FRAGMENT,
  });

export const pageQuery = q("*")
  .filterByType("page")
  .filter(`slug.current == $slug`)
  .slice(0)
  .grab({
    _type: q.literal("page"),
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    pageBuilder: SECTIONS_FRAGMENT,
  });

export const projectIndexPageQuery = q("*")
  .filterByType("projectIndex")
  .slice(0)
  .grab({
    _id: q.string(),
    _type: q.literal("projectIndex"),
    title: q.string(),
    description: q.string(),
    solutions: q("*", { isArray: true })
      .filterByType("solution")
      .grab({
        _id: q.string(),
        title: q.string(),
        slug: q.slug("slug"),
      }),
    hero: q("hero").grab(HERO_FRAGMENT),
    pageBuilder: SECTIONS_FRAGMENT,
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
  });

export const projectsQuery = q("*").filterByType("project").grab(TILE_FRAGMENT);

export const projectsQueryBySolution = q("*")
  .filterByType("project")
  .filter(`$slug in solutions[]->slug.current`)
  .grab(TILE_FRAGMENT);

export type ProjectIndexPage = InferType<typeof projectIndexPageQuery>;
export type Projects = InferType<typeof projectsQuery>;

export const projectPageQuery = q("*")
  .filterByType("project")
  .filter(`slug.current == $slug`)
  .slice(0)
  .grab({
    _type: q.literal("project"),
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    hero: q("hero").grab(HERO_FRAGMENT),
    description: q.string(),
    richText: q("richText[]").select(RICHTEXT_BLOCKS),
    image: q("image").grab(IMAGE_FRAGMENT),
    client: q.string(),
    construction: q.string(),
    status: q.string(),
    pageBuilder: SECTIONS_FRAGMENT,
    colorScheme: q("colorScheme").deref().grab(COLOR_SCHEME_FRAGMENT),
    relatedProjects: q("*", { isArray: true })
      .filterByType("project")
      .grab(TILE_FRAGMENT),
  });

export type ProjectPage = InferType<typeof projectPageQuery>;
