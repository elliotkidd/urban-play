import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const socialLinks = defineField({
  name: "socialLinks",
  title: "Social Media Links",
  description: "Add links to your social media profiles",
  type: "object",
  options: {},
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      description: "Full URL to your LinkedIn profile/company page",
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      description: "Full URL to your Facebook profile/page",
      type: "string",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      description: "Full URL to your Twitter/X profile",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      description: "Full URL to your Instagram profile",
      type: "string",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      description: "Full URL to your YouTube channel",
      type: "string",
    }),
  ],
});

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Settings",
  description: "Global settings and configuration for your website",
  icon: CogIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Settings",
      title: "Label",
      description: "Label used to identify settings in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
      description:
        "The main title of your website, used in browser tabs and SEO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: "Site Description",
      description: "A brief description of your website for SEO purposes",
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Site Logo",
      description: "Upload your website logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactDetails",
      type: "object",
      title: "Contact Details",
      description: "Contact details for your website",
      fields: [
        defineField({
          name: "email",
          type: "string",
          title: "Email",
          description: "Primary contact email address for your website",
        }),
        defineField({
          name: "phone",
          type: "string",
          title: "Phone",
          description: "Primary contact phone number for your website",
        }),
        defineField({
          name: "address",
          type: "string",
          title: "Address",
          description: "Primary contact address for your website",
        }),
      ],
    }),
    defineField({
      name: "formEmailRecipients",
      title: "Form Email Recipients",
      description:
        "Email addresses that will receive notifications when this form is submitted",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "email",
              title: "Email",
              type: "string",
              validation: (Rule) => Rule.required().email(),
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
          ],
          preview: {
            select: {
              email: "email",
              name: "name",
            },
            prepare({ email, name }) {
              return {
                title: name || email,
                subtitle: name ? email : undefined,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    socialLinks,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Settings",
      media: CogIcon,
    }),
  },
});
