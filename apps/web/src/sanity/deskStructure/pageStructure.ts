import { PiFile } from "react-icons/pi";

import defineStructure from "../utils/defineStructure";

export default defineStructure((S) =>
  S.listItem()
    .title("Pages")
    .icon(PiFile)
    .schemaType("page")
    .child(S.documentTypeList("page")),
);
