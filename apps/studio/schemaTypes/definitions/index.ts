import { button } from "./button";
import { contentBlock } from "./contentBlocks";
import { customUrl } from "./custom-url";
import { pageBuilder } from "./pagebuilder";
import { richText } from "./rich-text";
import { hotspots } from "./hotspots";

export const definitions = [
  customUrl,
  richText,
  button,
  pageBuilder,
  contentBlock,
  ...hotspots,
];
