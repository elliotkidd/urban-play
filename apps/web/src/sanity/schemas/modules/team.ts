import { PiUserList as icon } from "react-icons/pi";
import { defineArrayMember, defineField } from "sanity";

export default defineField({
  title: "Team",
  name: "team",
  type: "object",
  icon,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({
      name: "index",
      title: "Index",
      type: "number",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),
    defineField({
      title: "Team",
      name: "team",
      type: "array",
      of: [
        defineArrayMember({
          name: "person",
          title: "Person",
          type: "reference",
          to: [{ type: "person" }],
        }),
      ],
      group: "content",
    }),
    defineField({
      title: "Settings",
      name: "settings",
      type: "moduleSettings",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      team: "team",
      media: "image",
    },
    prepare(selection) {
      const { team, media } = selection;
      return {
        media,
        title:
          team.length > 1 ? `${team.length} Team Members` : "1 Team Member",
        subtitle: `Team`,
      };
    },
  },
});
