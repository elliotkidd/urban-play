import localFont from "next/font/local";

// The .woff2 files are the .otf masters subset to Latin (Basic, Latin-1,
// Latin Extended-A, punctuation and arrows) with fontTools. Regenerate them
// from the .otf files if the masters change or more characters are needed.
//
// centra-black.woff2 also has its OS/2 typo metrics set to match its hhea
// metrics (ascent 1000, descent -300, line gap 0). The master's typo metrics
// (700 / -300 / 300) are what Windows browsers and Firefox use, and with our
// tight heading line-heights they push cap tops out of the line box, so the
// tops got clipped wherever a parent has overflow hidden. Redo that step if
// the file is regenerated.
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
