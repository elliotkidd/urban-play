import { StructureResolver } from "sanity/structure";

import pagesStructure from "./pageStructure";
import postsStructure from "./postStructure";
import settingsStructure from "./settingsStructure";
import teamStructure from "./teamStructure";
import testimoniesStructure from "./testimoniesStructure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      pagesStructure(S, context),
      postsStructure(S, context),
      teamStructure(S, context),
      testimoniesStructure(S, context),
      S.divider(),
      settingsStructure(S, context),
    ]);
