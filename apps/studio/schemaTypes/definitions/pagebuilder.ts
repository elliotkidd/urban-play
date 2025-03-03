import { defineArrayMember, defineType } from "sanity";

import { pageBuilderSections } from "../sections";

export const pagebuilderBlockTypes = pageBuilderSections.map(({ name }) => ({
  type: name,
}));

export const pageBuilder = defineType({
  name: "pageBuilder",
  type: "array",
  of: pagebuilderBlockTypes.map((section) => defineArrayMember(section)),
});
