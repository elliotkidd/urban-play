import localFont from "next/font/local";

const fontHeading = localFont({
  src: [{ path: "../fonts/centra-black.otf", weight: "900" }],
  variable: "--font-heading",
});

const fontBody = localFont({
  src: [
    {
      path: "../fonts/suisse-intl-bold.otf",
      weight: "700",
    },
    {
      path: "../fonts/suisse-intl-medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/suisse-intl-book.otf",
      weight: "400",
    },
  ],
  variable: "--font-body",
});

export const fonts = `
  ${fontHeading.variable}
  ${fontBody.variable} antialiased
`;
