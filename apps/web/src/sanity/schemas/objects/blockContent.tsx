import {
  PiCircle,
  PiHighlighter,
  PiImage,
  PiLink,
  PiQuotes,
  PiTextUnderline,
} from "react-icons/pi";
import { defineArrayMember, defineField, defineType } from "sanity";

const smallRender = (props: any) => (
  <p style={{ fontSize: "0.875rem" }}>{props.children}</p>
);

const leadRender = (props: any) => (
  <p style={{ fontSize: "1.25rem", margin: "0" }}>{props.children}</p>
);

const h2LargeRender = (props: any) => (
  <h2 style={{ fontSize: "3.2rem", lineHeight: "1.2", margin: "0" }}>
    {props.children}
  </h2>
);

const HighlightDecorator = (props) => (
  <span style={{ backgroundColor: "yellow" }}>{props.children}</span>
);
const CircleDecorator = (props) => (
  <span
    style={{
      borderRadius: "9999px",
      borderColor: "yellow",
      border: "1px solid",
      padding: "2px",
    }}
  >
    {props.children}
  </span>
);

const UnderlineDecorator = (props) => (
  <span style={{ textDecoration: "underline" }}>{props.children}</span>
);

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H2 Large", value: "h2-large", component: h2LargeRender },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        {
          title: "Small Paragraph",
          value: "small",
          component: smallRender,
        },
        {
          title: "Lead Paragraph",
          value: "lead",
          component: leadRender,
        },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Highlight",
            value: "highlight",
            icon: PiHighlighter,
            component: HighlightDecorator,
          },
          {
            title: "Circle",
            value: "circle",
            icon: PiCircle,
            component: CircleDecorator,
          },
          {
            title: "Underline",
            value: "underline",
            icon: PiTextUnderline,
            component: UnderlineDecorator,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "link",
            icon: PiLink,
          },
        ],
      },
    }),

    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      title: "Image",
      name: "imageWithAlt",
      type: "imageWithAlt",
      //@ts-ignore
      icon: PiImage,
    }),

    defineArrayMember({
      title: "Button",
      name: "button",
      type: "buttonWithVariants",
    }),
    defineArrayMember({
      title: "Button Group",
      name: "buttonGroup",
      type: "object",
      fields: [
        defineField({ name: "buttons", title: "Buttons", type: "buttonGroup" }),
      ],
      preview: {
        prepare() {
          return {
            title: "Button Group",
          };
        },
      },
    }),
    defineArrayMember({
      title: "Testimonial",
      name: "testimonial",
      type: "reference",
      to: [{ type: "testimony" }],
      //@ts-ignore
      icon: PiQuotes,
    }),
  ],
});
