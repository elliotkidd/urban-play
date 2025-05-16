import { defineField } from "sanity";
import ProductTooltip from "../../../components/hotspots/ProductTooltip";
import type { HotspotTooltipProps } from "sanity-plugin-hotspot-array";

export const hotspots = defineField({
  name: "productHotspots",
  title: "Hotspots",
  type: "array",
  of: [
    {
      type: "spot",
    },
  ],
  options: {
    imageHotspot: {
      imagePath: "image",
      tooltip: ProductTooltip as unknown as React.ComponentType<
        HotspotTooltipProps<{ [key: string]: unknown }>
      >,
      pathRoot: "parent",
    },
  },
});
