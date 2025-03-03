// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = [
  "settingsFooter",
  "settingsGeneral",
  "settingsHeader",
  "postsIndex",
  "ecosystemIndex",
  "media.tag",
];

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: "page" },
  { type: "post" },
  { type: "postsIndex" },
  { type: "postCategory" },
  { type: "projectsIndex" },
];

// How many documents to display per page on listings
export const POSTS_PER_PAGE = 8;

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = "2022-10-25";
