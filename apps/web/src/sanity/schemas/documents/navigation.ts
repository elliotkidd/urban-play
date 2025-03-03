import { LinkIcon, MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField } from "sanity";

export default defineField({
  name: "navigation",
  type: "document",
  //@ts-ignore
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
    }),
  ],
});
