import { ColorSchemeFragment } from "@/lib/sanity/queries/fragments";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useHeaderColorScheme = (colorScheme?: ColorSchemeFragment) => {
  if (typeof document === "undefined") return;

  const header = document.getElementById("navbar");

  const { ref, inView } = useInView({
    rootMargin: "-10% 0px -90% 0px",
  });

  useEffect(() => {
    if (inView) {
      const {
        background,
        text,
        primaryButton,
        secondaryButton,
        navBarBackground,
        navBarText,
      } = colorScheme ?? {};
      // Update CSS custom properties
      if (background) {
        header?.style.setProperty(
          "--colour-background",
          `${background.rgb.r}, ${background.rgb.g}, ${background.rgb.b}`,
        );
      }
      if (text) {
        header?.style.setProperty(
          "--colour-text",
          `${text.rgb.r}, ${text.rgb.g}, ${text.rgb.b}`,
        );
      }
      if (primaryButton) {
        header?.style.setProperty(
          "--colour-primary-button",
          `${primaryButton.rgb.r}, ${primaryButton.rgb.g}, ${primaryButton.rgb.b}`,
        );
      }
      if (secondaryButton) {
        header?.style.setProperty(
          "--colour-secondary-button",
          `${secondaryButton.rgb.r}, ${secondaryButton.rgb.g}, ${secondaryButton.rgb.b}`,
        );
      }
      if (navBarBackground) {
        header?.style.setProperty(
          "--colour-nav-bar-background",
          `${navBarBackground.rgb.r}, ${navBarBackground.rgb.g}, ${navBarBackground.rgb.b}`,
        );
      }
      if (navBarText) {
        header?.style.setProperty(
          "--colour-nav-bar-text",
          `${navBarText.rgb.r}, ${navBarText.rgb.g}, ${navBarText.rgb.b}`,
        );
      }
    }
  }, [colorScheme, inView, header]);

  return ref;
};
