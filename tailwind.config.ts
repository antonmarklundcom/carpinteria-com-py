import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        faint: "var(--faint)",
        gold: "var(--gold)",
        "gold-bright": "var(--gold-bright)",
        green: "var(--green)",
        card: "var(--card)",
        border: "var(--border)",
        "input-border": "var(--input-border)",
        tint: "var(--tint)",
        dark: "var(--dark)",
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      maxWidth: {
        shell: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
