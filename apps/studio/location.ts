import { defineLocations } from "sanity/presentation";

export const locations = {
  blog: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      return {
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `${doc?.slug}`,
          },
          {
            title: "Blog",
            href: "/blog",
          },
          {
            title: "Project",
            href: "/project",
          },
        ],
      };
    },
  }),
  home: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: () => {
      return {
        locations: [
          {
            title: "Home",
            href: "/",
          },
        ],
      };
    },
  }),
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      return {
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `${doc?.slug}`,
          },
        ],
      };
    },
  }),
  project: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      return {
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `${doc?.slug}`,
          },
          {
            title: "Project",
            href: "/project",
          },
        ],
      };
    },
  }),
};
