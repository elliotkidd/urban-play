// documents
import colorScheme from "./documents/colorScheme";
import navigation from "./documents/navigation";
import page from "./documents/page";
import person from "./documents/person";
import post from "./documents/post";
import postCategory from "./documents/postCategory";
import redirect from "./documents/redirect";
import testimony from "./documents/testimony";
import accordion from "./modules/accordion";
// modules
import callToAction from "./modules/callToAction";
import carouselHeader from "./modules/carouselHeader";
import contact from "./modules/contact";
import homeHero from "./modules/homeHero";
import latestPosts from "./modules/latestPosts";
import lineBreak from "./modules/lineBreak";
import marqueeLogos from "./modules/marqueeLogos";
import moduleSettings from "./modules/moduleSettings";
import modules from "./modules/modules";
import pageTitle from "./modules/pageTitle";
import paragraph from "./modules/paragraph";
import richTextModule from "./modules/richTextModule";
import sectionHeader from "./modules/section-header";
import team from "./modules/team";
import testimonials from "./modules/testimonials";
import textAndMedia from "./modules/textAndMedia";
import values from "./modules/values";
import verticalProcess from "./modules/verticalProcess";
// objects
import blockContent from "./objects/blockContent";
import button from "./objects/button";
import buttonGroup from "./objects/buttonGroup";
import buttonWithVariants from "./objects/buttonWithVariants";
import form from "./objects/form";
import imageWithAlt from "./objects/imageWithAlt";
import link from "./objects/link";
import navItem from "./objects/navItem";
import seo from "./objects/seo";
import uid from "./objects/uid";
// settings
import settingsFooter from "./settings/footer";
import settingsGeneral from "./settings/general";
import settingsHeader from "./settings/header";
// singletons
import postsIndex from "./singletons/postsIndex";
import projectsIndex from "./singletons/projectsIndex";

const documents = [
  navigation,
  page,
  post,
  redirect,
  person,
  testimony,
  postCategory,
  colorScheme,
];

const singletons = [postsIndex, projectsIndex];

const objects = [
  seo,
  navItem,
  link,
  blockContent,
  imageWithAlt,
  button,
  buttonWithVariants,
  buttonGroup,
  uid,
  form,
];

const settings = [settingsGeneral, settingsFooter, settingsHeader];

const contentModules = [
  modules,
  paragraph,
  contact,
  lineBreak,
  homeHero,
  moduleSettings,
  textAndMedia,
  pageTitle,
  testimonials,
  callToAction,
  latestPosts,
  richTextModule,
  team,
  marqueeLogos,
  carouselHeader,
  values,
  sectionHeader,
  verticalProcess,
  accordion,
];

// register the schema
export const schemaTypes = [
  ...documents,
  ...singletons,
  ...objects,
  ...settings,
  ...contentModules,
];
