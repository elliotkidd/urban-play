import {
  PiArrowElbowRight,
  PiArrowLineDown,
  PiArrowLineUp,
  PiGearFine,
  PiList,
  PiPalette,
} from "react-icons/pi";

import defineStructure from "../utils/defineStructure";

export default defineStructure((S) =>
  S.listItem()
    .title("Settings")
    .icon(PiGearFine)
    .child(
      S.list()
        .title("Settings")
        .items([
          S.listItem()
            .title("General")
            .icon(PiGearFine)
            .child(
              S.document()
                .title("General")
                .schemaType("settingsGeneral")
                .documentId("settingsGeneral"),
            ),
          S.listItem()
            .title("Header")
            .icon(PiArrowLineUp)
            .child(
              S.editor()
                .title("Header")
                .schemaType("settingsHeader")
                .documentId("settingsHeader"),
            ),

          S.listItem()
            .title("Footer")
            .icon(PiArrowLineDown)
            .child(
              S.document()
                .title("Footer")
                .schemaType("settingsFooter")
                .documentId("settingsFooter"),
            ),
          S.listItem()
            .title("Navigation")
            .icon(PiList)
            .schemaType("navigation")
            .child(S.documentTypeList("navigation")),
          S.listItem()
            .title("Redirects")
            .icon(PiArrowElbowRight)
            .schemaType("redirect")
            .child(S.documentTypeList("redirect")),
          S.listItem()
            .title("Color Schemes")
            .icon(PiPalette)
            .schemaType("colorScheme")
            .child(S.documentTypeList("colorScheme")),
        ]),
    ),
);
