import type { Config } from "tailwindcss";

export default {
  content: ["{app,components}/**/*.{ts,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      // The `typography` key is specific to the Tailwind CSS Typography plugin
      // and is used to customize its default styles.
      typography: {
        DEFAULT: {
          css: {
            h1: { fontWeight: 500 },
            h2: { fontWeight: 500 },
            h3: { fontWeight: 500 },
            h4: { fontWeight: 500 },
            h5: { fontWeight: 500 },
            h6: { fontWeight: 500 },
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-lead": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--foreground))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--foreground))",
            "--tw-prose-bullets": "hsl(var(--foreground))",
            "--tw-prose-hr": "hsl(var(--foreground))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--foreground))",
            "--tw-prose-captions": "hsl(var(--foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-pre-code": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": "hsl(var(--background))",
            "--tw-prose-th-borders": "hsl(var(--foreground))",
            "--tw-prose-td-borders": "hsl(var(--foreground))",
            "--tw-prose-invert-headings": "hsl(var(--foreground))",
            "--tw-prose-invert-lead": "hsl(var(--foreground))",
            "--tw-prose-invert-links": "hsl(var(--foreground))",
            "--tw-prose-invert-bold": "hsl(var(--foreground))",
            "--tw-prose-invert-counters": "hsl(var(--foreground))",
            "--tw-prose-invert-bullets": "hsl(var(--foreground))",
            "--tw-prose-invert-hr": "hsl(var(--foreground))",
            "--tw-prose-invert-quotes": "hsl(var(--foreground))",
            "--tw-prose-invert-quote-borders": "hsl(var(--foreground))",
            "--tw-prose-invert-captions": "hsl(var(--foreground))",
            "--tw-prose-invert-code": "hsl(var(--foreground))",
            "--tw-prose-invert-pre-code": "hsl(var(--foreground))",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": "hsl(var(--foreground))",
            "--tw-prose-invert-td-borders": "hsl(var(--foreground))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
