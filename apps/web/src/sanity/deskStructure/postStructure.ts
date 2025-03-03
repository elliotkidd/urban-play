import { PiArticle, PiSquaresFour, PiTagSimple } from "react-icons/pi";

import defineStructure from "../utils/defineStructure";

export default defineStructure((S) =>
  S.listItem()
    .title("Posts")
    .icon(PiArticle)
    .child(
      S.list()
        .title("Posts")
        .items([
          S.listItem()
            .title("Posts Index")
            .icon(PiSquaresFour)
            .child(
              S.editor()
                .title("Posts Index")
                .schemaType("postsIndex")
                .documentId("posts-index"),
            ),
          S.listItem()
            .title("Posts")
            .icon(PiArticle)
            .schemaType("post")
            .child(S.documentTypeList("post")),
          S.listItem()
            .title("Categories")
            .icon(PiTagSimple)
            .schemaType("postCategory")
            .child(S.documentTypeList("postCategory")),
        ]),
    ),
);
