import { PiQuotes as icon } from "react-icons/pi";
import { defineArrayMember, defineField } from "sanity";

export default defineField({
  title: "Testimonials",
  name: "testimonials",
  type: "object",
  // @ts-ignore
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
      title: "Testimonials",
      name: "testimonials",
      type: "array",
      of: [
        defineArrayMember({
          name: "testimony",
          title: "Testimony",
          type: "reference",
          to: [{ type: "testimony" }],
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
      testimonials: "testimonials",
      media: "image",
    },

    prepare(selection) {
      const { testimonials = [], media } = selection;
      const testimonialCount = testimonials.length;
      const testimonialText =
        testimonialCount === 1 ? "Testimonial" : "Testimonials";

      return {
        media,
        title: `${testimonialCount} ${testimonialText}`,
        subtitle: "Testimonials",
      };
    },
  },
});
