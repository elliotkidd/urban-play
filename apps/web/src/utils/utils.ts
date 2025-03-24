import { ColorSchemeFragment } from "@/lib/sanity/queries/fragments";

export function missingClass(string?: string, prefix?: string) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, "g");
  return regex.exec(string) === null;
}

export const accordionColors = [
  {
    hover: "hover:bg-theme-green",
    open: "data-[state=open]:bg-theme-green",
  },
  {
    hover: "hover:bg-theme-blue",
    open: "data-[state=open]:bg-theme-blue",
  },
  {
    hover: "hover:bg-theme-yellow",
    open: "data-[state=open]:bg-theme-yellow",
  },
  { hover: "hover:bg-theme-red", open: "data-[state=open]:bg-theme-red" },
];

export const getColorSchemeStyle = (
  colorScheme: ColorSchemeFragment | null,
) => {
  if (!colorScheme) return {};

  if (
    !colorScheme?.background?.rgb ||
    !colorScheme?.text?.rgb ||
    !colorScheme?.primaryButton?.rgb ||
    !colorScheme?.secondaryButton?.rgb ||
    !colorScheme?.navBarBackground?.rgb ||
    !colorScheme?.navBarText?.rgb
  )
    return {};

  return {
    "--colour-background": `${colorScheme.background.rgb.r}, ${colorScheme.background.rgb.g}, ${colorScheme.background.rgb.b}`,
    "--colour-text": `${colorScheme.text.rgb.r}, ${colorScheme.text.rgb.g}, ${colorScheme.text.rgb.b}`,
    "--colour-primary-button": `${colorScheme.primaryButton.rgb.r}, ${colorScheme.primaryButton.rgb.g}, ${colorScheme.primaryButton.rgb.b}`,
    "--colour-secondary-button": `${colorScheme.secondaryButton.rgb.r}, ${colorScheme.secondaryButton.rgb.g}, ${colorScheme.secondaryButton.rgb.b}`,
    "--colour-nav-bar-background": `${colorScheme.navBarBackground.rgb.r}, ${colorScheme.navBarBackground.rgb.g}, ${colorScheme.navBarBackground.rgb.b}`,
    "--colour-nav-bar-text": `${colorScheme.navBarText.rgb.r}, ${colorScheme.navBarText.rgb.g}, ${colorScheme.navBarText.rgb.b}`,
  } as React.CSSProperties;
};
