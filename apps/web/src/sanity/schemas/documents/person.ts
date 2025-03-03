import { PiUser as icon } from "react-icons/pi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "imageWithAlt",
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Bio",
    }),
  ],
  preview: {
    select: {
      media: "avatar",
      name: "name",
      role: "role",
    },
    prepare(selection) {
      const { media, name, role } = selection;

      return {
        media,
        title: name,
        subtitle: role,
      };
    },
  },
});
