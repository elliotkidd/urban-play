import localFont from "next/font/local";

// The .woff2 files are the .otf masters subset to Latin (Basic, Latin-1,
// Latin Extended-A, punctuation and arrows) with fontTools. Regenerate them
// from the .otf files if the masters change or more characters are needed.
const fontHeading = localFont({
  src: [{ path: "../fonts/centra-black.woff2", weight: "900" }],
  variable: "--font-heading",
});

const fontBody = localFont({
  src: [
    {
      path: "../fonts/suisse-intl-bold.woff2",
      weight: "700",
    },
    {
      path: "../fonts/suisse-intl-medium.woff2",
      weight: "500",
    },
    {
      path: "../fonts/suisse-intl-book.woff2",
      weight: "400",
    },
  ],
  variable: "--font-body",
});

export const fonts = `
  ${fontHeading.variable}
  ${fontBody.variable} antialiased
`;
