import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const { fontFamily } = defaultTheme;

function withOpacityValue(variable: string) {
  return ({ opacityValue }: any) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(var(${variable}), ${opacityValue})`;
  };
}

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        sm: "var(--border-radius-sm)",
        lg: "var(--border-radius-lg)",
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
        sans: ["halyard-display", ...fontFamily.sans],
        mono: [...fontFamily.mono],
        heading: ["adelle-sans-condensed", ...fontFamily.sans],
      },
      colors: {
        //@ts-expect-error
        primary: withOpacityValue("--color-primary"),
        //@ts-expect-error
        contrast: withOpacityValue("--color-contrast"),
        //@ts-expect-error
        accent: withOpacityValue("--color-accent"),
        //@ts-expect-error
        complimentary: withOpacityValue("--color-complimentary"),
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

      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.contrast/0.7"),
            "--tw-prose-headings": theme("colors.contrast"),
            "--tw-prose-lead": theme("colors.contrast"),
            "--tw-prose-links": theme("colors.accent"),
            "--tw-prose-bold": theme("colors.contrast"),
            "--tw-prose-counters": theme("colors.contrast"),
            "--tw-prose-bullets": theme("colors.accent"),
            "--tw-prose-hr": theme("colors.contrast/10"),
            "--tw-prose-quotes": theme("colors.contrast"),
            "--tw-prose-quote-borders": theme("colors.accent"),
            "--tw-prose-captions": theme("colors.contrast"),
            "--tw-prose-code": theme("colors.contrast"),
            "--tw-prose-pre-code": theme("colors.contrast"),
            "--tw-prose-pre-bg": theme("colors.contrast/0.1"),
            "--tw-prose-th-borders": theme("colors.contrast/0.5"),
            "--tw-prose-td-borders": theme("colors.contrast/0.1"),
            "--tw-prose-invert-body": theme("colors.primary"),
            "--tw-prose-invert-headings": theme("colors.primary"),
            "--tw-prose-invert-lead": theme("colors.primary"),
            "--tw-prose-invert-links": theme("colors.primary"),
            "--tw-prose-invert-bold": theme("colors.primary"),
            "--tw-prose-invert-counters": theme("colors.primary"),
            "--tw-prose-invert-bullets": theme("colors.primary"),
            "--tw-prose-invert-hr": theme("colors.primary/0.1"),
            "--tw-prose-invert-quotes": theme("colors.primary"),
            "--tw-prose-invert-quote-borders": theme("colors.primary"),
            "--tw-prose-invert-captions": theme("colors.primary"),
            "--tw-prose-invert-code": theme("colors.primary"),
            "--tw-prose-invert-pre-code": theme("colors.primary"),
            "--tw-prose-invert-pre-bg": theme("colors.primary/0.1"),
            "--tw-prose-invert-th-borders": theme("colors.primary/0.5"),
            "--tw-prose-invert-td-borders": theme("colors.primary/0.1"),
            h2: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-2xl)",
              fontWeight: 400,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "1em",
            },
            h3: {
              fontFamily: `${theme("fontFamily.heading").join(", ")}`,
              fontSize: "var(--text-xl)",
              fontWeight: 500,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "1em",
            },
            h4: {
              fontSize: "var(--text-md)",
              fontWeight: 600,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "1em",
              letterSpacing: "-0.05em",
            },
            h5: {
              fontSize: "var(--text-base)",
              fontWeight: 600,
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "1em",
              letterSpacing: "-0.05em",
            },
            h6: {
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              marginTop: "1.2rem",
              marginBottom: "1.2rem",
              lineHeight: "1em",
              letterSpacing: "0.05em",
            },
            '[class~="lead"]': {
              fontSize: "var(--text-lg)",
              fontWeight: 400,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.25em",
            },
            p: {
              fontSize: "var(--text-base)",
              fontWeight: 100,
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.5em",
            },
            li: {
              fontSize: "var(--text-base)",
              fontWeight: 100,
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              lineHeight: "1.5em",
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
  plugins: [require("@tailwindcss/typography")],
};

export default config;
