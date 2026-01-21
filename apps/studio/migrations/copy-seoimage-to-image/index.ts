import type { SanityDocument } from "sanity";
import { at, defineMigration, set } from "sanity/migrate";

interface ProjectDocument extends SanityDocument {
  seoImage?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
}

export default defineMigration({
  title: "Copy seoImage to image field for projects",
  documentTypes: ["project"],
  // Only migrate documents that have seoImage but don't have image
  filter: "defined(seoImage) && !defined(image)",

  migrate: {
    document(doc: ProjectDocument) {
      // Copy seoImage to image field
      if (doc.seoImage) {
        return [at("image", set(doc.seoImage))];
      }
      return undefined;
    },
  },
});
