import type { PortableTextBlock } from "sanity";

const defaults = { nonTextBehavior: "remove" };

export function blocksToText(blocks: PortableTextBlock[] = [], opts = {}) {
  if (typeof blocks === "string") {
    return blocks;
  }

  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return (block.children as Array<{ text: string }>)
        .map((child) => child.text)
        .join("");
    })
    .join("\n\n");
}
