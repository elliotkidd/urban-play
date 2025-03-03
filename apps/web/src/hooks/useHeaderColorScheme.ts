import { COLOR_SCHEME_FRAGMENT } from "@/sanity/lib/queries/color";
import { TypeFromSelection } from "groqd";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type ColorScheme = TypeFromSelection<typeof COLOR_SCHEME_FRAGMENT>;

export const useHeaderColorScheme = (colorScheme?: ColorScheme) => {
  // if (typeof document === "undefined") return;

  const header = document.getElementById("header");

  const { ref, inView } = useInView({
    rootMargin: "-10% 0px -90% 0px",
  });

  useEffect(() => {
    if (inView) {
      const { primary, contrast, accent, complimentary } = colorScheme ?? {};

      // Update CSS custom properties
      if (primary) {
        header?.style.setProperty(
          "--color-primary",
          `${primary.rgb.r}, ${primary.rgb.g}, ${primary.rgb.b}`,
        );
      }

      if (contrast) {
        header?.style.setProperty(
          "--color-contrast",
          `${contrast.rgb.r}, ${contrast.rgb.g}, ${contrast.rgb.b}`,
        );
      }

      if (accent) {
        header?.style.setProperty(
          "--color-accent",
          `${accent.rgb.r}, ${accent.rgb.g}, ${accent.rgb.b}`,
        );
      }

      if (complimentary) {
        header?.style.setProperty(
          "--color-complimentary",
          `${complimentary.rgb.r}, ${complimentary.rgb.g}, ${complimentary.rgb.b}`,
        );
      }
    }
  }, [colorScheme, inView, header?.style]);

  return ref;
};
