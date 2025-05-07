import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

function withOpacityValue(variable: string) {
  return ({ opacityValue }: { opacityValue: string | undefined }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(var(${variable}), ${opacityValue})`;
  };
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /col-start-(1|2|3|4|5|6|7|8|9)/,
      variants: ["xl", "md"],
    },
    {
      pattern: /col-end-(1|2|3|4|5|6|7|8|9)/,
      variants: ["xl", "md"],
    },
    {
      pattern: /row-start-(1|2|3|4|5|6|7|8|9)/,
      variants: ["xl", "md"],
    },
    {
      pattern: /row-end-(1|2|3|4|5|6|7|8|9)/,
      variants: ["xl", "md"],
    },
  ],
  theme: {
    extend: {
      aspectRatio: {
        landscape: "6 / 4",
        portrait: "6 / 8",
      },
      spacing: {
        "fluid-xs": "var(--space-xs)",
        "fluid-sm": "var(--space-sm)",
        fluid: "var(--space)",
        "fluid-md": "var(--space-md)",
        "fluid-lg": "var(--space-lg)",
        "fluid-xl": "var(--space-xl)",
        nav: "var(--height-nav)",
        screen: "var(--screen-height, 100vh)",
        "screen-no-nav":
          "calc(var(--screen-height, 100vh) - var(--height-nav))",
        "screen-dynamic": "var(--screen-height-dynamic, 100vh)",
      },
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        //@ts-ignore
        background: withOpacityValue("--colour-background"),
        //@ts-ignore
        text: withOpacityValue("--colour-text"),
        //@ts-ignore
        "primary-button": withOpacityValue("--colour-primary-button"),
        //@ts-ignore
        "secondary-button": withOpacityValue("--colour-secondary-button"),
        //@ts-ignore
        "nav-bar-background": withOpacityValue("--colour-nav-bar-background"),
        //@ts-ignore
        "nav-bar-text": withOpacityValue("--colour-nav-bar-text"),
        "theme-green": "#12BF65",
        "theme-blue": "#008EDA",
        "theme-yellow": "#F2BD06",
        "theme-red": "#ED3E61",
        //@ts-ignore
        "bottle-green": withOpacityValue("--bottle-green"),
      },
      fontSize: {
        "5xl": "var(--text-5xl)",
        "4xl": "var(--text-4xl)",
        "3xl": "var(--text-3xl)",
        "2xl": "var(--text-2xl)",
        xl: "var(--text-xl)",
        lg: "var(--text-lg)",
        md: "var(--text-md)",
        base: "var(--text-base)",
        sm: "var(--text-sm)",
        xs: "var(--text-xs)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: "auto",
            "--tw-prose-body": theme("colors.text/60"),
            "--tw-prose-headings": theme("colors.text"),
            "--tw-prose-lead": theme("colors.text"),
            "--tw-prose-links": theme("colors.text"),
            "--tw-prose-bold": theme("colors.text"),
            "--tw-prose-counters": theme("colors.text"),
            "--tw-prose-bullets": theme("colors.text"),
            "--tw-prose-hr": theme("colors.text/10"),
            "--tw-prose-quotes": theme("colors.text"),
            "--tw-prose-quote-borders": theme("colors.text"),
            "--tw-prose-captions": theme("colors.text"),
            "--tw-prose-code": theme("colors.text"),
            "--tw-prose-pre-code": theme("colors.text"),
            "--tw-prose-pre-bg": theme("colors.text/0.1"),
            "--tw-prose-th-borders": theme("colors.text/0.5"),
            "--tw-prose-td-borders": theme("colors.text/0.1"),
            "--tw-prose-invert-body": theme("colors.text"),
            "--tw-prose-invert-headings": theme("colors.text"),
            "--tw-prose-invert-lead": theme("colors.text"),
            "--tw-prose-invert-links": theme("colors.text"),
            "--tw-prose-invert-bold": theme("colors.text"),
            "--tw-prose-invert-counters": theme("colors.text"),
            "--tw-prose-invert-bullets": theme("colors.text"),
            "--tw-prose-invert-hr": theme("colors.text/0.1"),
            "--tw-prose-invert-quotes": theme("colors.text"),
            "--tw-prose-invert-quote-borders": theme("colors.text"),
            "--tw-prose-invert-captions": theme("colors.text"),
            "--tw-prose-invert-code": theme("colors.text"),
            "--tw-prose-invert-pre-code": theme("colors.text"),
            "--tw-prose-invert-pre-bg": theme("colors.text/0.1"),
            "--tw-prose-invert-th-borders": theme("colors.text/0.5"),
            "--tw-prose-invert-td-borders": theme("colors.text/0.1"),
            h2: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-3xl)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
            },
            h3: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-xl)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
            },
            h4: {
              fontSize: "var(--text-md)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
            },
            h5: {
              fontSize: "var(--text-base)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
            },
            h6: {
              fontSize: "var(--text-xs)",
              fontWeight: 900,
              textTransform: "uppercase",
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "0.05em",
            },
            '[class~="lead"]': {
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "120%",
            },
            p: {
              fontSize: "var(--text-base)",
              fontWeight: 400,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "120%",
            },
            li: {
              fontSize: "var(--text-base)",
              fontWeight: 400,
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "120%",
            },
            a: {
              color: theme("colors.accent"),
              "&:hover": {
                color: theme("colors.contrast"),
              },
            },
          },
        },
        white: {
          css: {
            maxWidth: "auto",
            "--tw-prose-body": "rgba(255, 255, 255, 0.7)",
            "--tw-prose-headings": "white",
            "--tw-prose-lead": "white",
            "--tw-prose-links": "white",
            "--tw-prose-bold": "white",
            "--tw-prose-counters": "white",
            "--tw-prose-bullets": "white",
            "--tw-prose-hr": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-quotes": "white",
            "--tw-prose-quote-borders": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-captions": "white",
            "--tw-prose-code": "white",
            "--tw-prose-pre-code": "white",
            "--tw-prose-pre-bg": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-th-borders": "rgba(255, 255, 255, 0.5)",
            "--tw-prose-td-borders": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-invert-body": "white",
            "--tw-prose-invert-headings": "white",
            "--tw-prose-invert-lead": "white",
            "--tw-prose-invert-links": "white",
            "--tw-prose-invert-bold": "white",
            "--tw-prose-invert-counters": "white",
            "--tw-prose-invert-bullets": "white",
            "--tw-prose-invert-hr": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-invert-quotes": "white",
            "--tw-prose-invert-quote-borders": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-invert-captions": "white",
            "--tw-prose-invert-code": "white",
            "--tw-prose-invert-pre-code": "white",
            "--tw-prose-invert-pre-bg": "rgba(255, 255, 255, 0.1)",
            "--tw-prose-invert-th-borders": "rgba(255, 255, 255, 0.5)",
            "--tw-prose-invert-td-borders": "rgba(255, 255, 255, 0.1)",
            h2: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-3xl)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              textTransform: "uppercase",
            },
            h3: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-xl)",
              textTransform: "uppercase",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
            },
            h4: {
              fontSize: "var(--text-md)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
            },
            h5: {
              fontSize: "var(--text-base)",
              fontWeight: 900,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "-0.05em",
            },
            h6: {
              fontSize: "var(--text-xs)",
              fontWeight: 900,
              textTransform: "uppercase",
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "100%",
              letterSpacing: "0.05em",
            },
            p: {
              fontSize: "var(--text-base)",
              fontWeight: 400,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "120%",
            },
            '[class~="lead"]': {
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "120%",
            },
            li: {
              fontSize: "var(--text-base)",
              fontWeight: 400,
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "120%",
            },
            a: {
              color: theme("colors.accent"),
              "&:hover": {
                color: theme("colors.contrast"),
              },
            },
          },
        },
      }),
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;
