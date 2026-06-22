import { author } from "./author";
import { award } from "./award";
import { blog } from "./blog";
import { blogIndex } from "./blog-index";
import { category } from "./category";
import { colorScheme } from "./colorScheme";
import { form } from "./form";
import { faq } from "./faq";
import { footer } from "./footer";
import { homePage } from "./home-page";
import { navbar } from "./navbar";
import { page } from "./page";
import { project } from "./project";
import { projectIndex } from "./project-index";
import { settings } from "./settings";
import { solution } from "./solution";
import { testimony } from "./testimony";

export const singletons = [
  homePage,
  blogIndex,
  settings,
  footer,
  navbar,
  projectIndex,
];
export const documents = [
  blog,
  page,
  award,
  form,
  faq,
  author,
  colorScheme,
  category,
  solution,
  project,
  testimony,
  ...singletons,
];
