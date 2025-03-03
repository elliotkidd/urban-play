import { Observable, map } from "rxjs";
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from "sanity/presentation";

export const locate: DocumentLocationResolver = (params, context) => {
  if (
    params.type === "page" ||
    params.type === "post" ||
    params.type === "postCategory" ||
    params.type === "person" ||
    params.type === "testimony"
  ) {
    /* 
      Listen to all changes in the selected document 
      and all documents that reference it
    */
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title, name}`,
      params,
      { perspective: "previewDrafts" },
    ) as Observable<
      | {
          _type: string;
          slug?: { current: string };
          shop?: { slug: { current: string } };
          title?: string | null;
          name?: string | null;
        }[]
      | null
    >;
    // pipe the real-time results to RXJS's map function
    return doc$.pipe(
      map((docs) => {
        if (!docs) {
          return {
            message: "Unable to map document type to locations",
            tone: "critical",
          } satisfies DocumentLocationsState;
        }

        // Generate all the locations for page documents
        const pageLocations = docs
          .filter(({ _type, slug }) => _type === "page" && slug?.current)
          .map(({ title, slug }) => ({
            title: title || "Title missing",
            href: `/${slug?.current}`,
          }));

        // Generate all the locations for post documents
        const postLocations: Array<any> = docs
          .filter(({ _type, slug }) => _type === "post" && slug?.current)
          .map(({ title, slug }) => ({
            title: title || "Title missing",
            href: `/posts/${slug?.current}`,
          }));

        return {
          locations: [
            ...pageLocations,
            ...postLocations,

            // Add a link to the "All posts" page when there are post documents
            postLocations.length > 0 && {
              title: "All posts",
              href: "/posts",
            },
          ].filter(Boolean),
        } satisfies DocumentLocationsState;
      }),
    );
  }

  return null;
};
