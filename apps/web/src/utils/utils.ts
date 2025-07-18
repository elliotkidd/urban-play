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

export const getColorSchemeStyle: (
  colorScheme: ColorSchemeFragment | null,
) => React.CSSProperties = (colorScheme) => {
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

export const BLOG_GRID_COL_SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-8",
  "lg:col-span-4",
];

export const PROJECT_GRID_COL_SPANS = [
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
];

/**
 * Extracts the video ID from a Vimeo URL
 * @param vimeoUrl - The full Vimeo URL (e.g., "https://vimeo.com/123456789")
 * @returns The video ID as a string, or null if the URL is invalid
 */
export function extractVimeoId(
  vimeoUrl: string | null | undefined,
): string | null {
  if (!vimeoUrl) return null;

  const vimeoRegex =
    /^(https?:\/\/)?(www\.)?(vimeo\.com\/)(\d{1,10})(\/[a-zA-Z0-9\-_]+)?(\?.*)?$/;
  const match = vimeoUrl.match(vimeoRegex);

  return match ? match[4] : null;
}
