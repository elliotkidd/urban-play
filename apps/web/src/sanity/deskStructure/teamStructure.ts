import { PiUser } from "react-icons/pi";

import defineStructure from "../utils/defineStructure";

export default defineStructure((S) =>
  S.listItem()
    .title("Team")
    .icon(PiUser)
    .schemaType("person")
    .child(S.documentTypeList("person")),
);
