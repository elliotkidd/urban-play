import { PiQuotes } from "react-icons/pi";

import defineStructure from "../utils/defineStructure";

export default defineStructure((S) =>
  S.listItem()
    .title("Testimonies")
    .icon(PiQuotes)
    .schemaType("testimony")
    .child(S.documentTypeList("testimony")),
);
