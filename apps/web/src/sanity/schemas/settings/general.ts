import { CogIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  title: "General",
  name: "settingsGeneral",
  type: "document",
  // @ts-ignore
  icon,
  groups: [
    { title: "Displays", name: "displays" },
    { title: "Socials", name: "socials" },
  ],
  fields: [
    defineField({
      title: "Homepage",
      description: "Designate which page of the website is the homepage",
      name: "homepage",
      type: "reference",
      to: [{ type: "page" }],
      group: "displays",
    }),
    defineField({
      title: "Error Page",
      description: "Designate which page of the website shows for 404 errors",
      name: "errorPage",
      type: "reference",
      to: [{ type: "page" }],
      group: "displays",
    }),
    defineField({
      title: "X URL",
      name: "xUrl",
      type: "url",
      group: "socials",
    }),
    defineField({
      title: "Github URL",
      name: "githubUrl",
      type: "url",
      group: "socials",
    }),
    defineField({
      title: "LinkedIn URL",
      name: "linkedInUrl",
      type: "url",
      group: "socials",
    }),
    defineField({
      title: "Instagram URL",
      name: "instagramUrl",
      type: "url",
      group: "socials",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "General Settings",
      };
    },
  },
});
