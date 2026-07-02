import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Galloway Roofing brand palette (per Thomas, 2026-07-02):
        // primary blue #004188, black for footer/dark sections #020202.
        // Token names kept as asDark/asRed/asGreen/asSlate to match the
        // shared SSP template (see /lib/brand.ts) — only the values changed.
        asDark: {
          DEFAULT: "#141414",
          mid: "#1f1f1f",
          soft: "#333333",
          deep: "#020202",
          mist: "#eef1f5",
        },
        asRed: {
          // primary CTA / link color — Galloway blue
          DEFAULT: "#004188",
          bright: "#1f67b1",
          deep: "#00315f",
        },
        asGreen: {
          // savings/accent green — derived from the logo's hammer-handle green
          DEFAULT: "#2f6b48",
          bright: "#3f8a5c",
          deep: "#1f4a32",
        },
        asSlate: {
          DEFAULT: "#2c3a47",
          deep: "#25313c",
          pattern: "#293642",
        },
        cream: "#f7f7f9",
        ink: "#15171d",
        slateWarm: "#5d626d",
      },
      fontFamily: {
        // Matches Galloway's live site: Open Sans (body) + Exo (headings/buttons)
        sans: ['"Open Sans"', "system-ui", "Arial", "sans-serif"],
        display: ['"Exo"', '"Open Sans"', "system-ui", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(2,2,2,0.04), 0 12px 32px -8px rgba(2,2,2,0.14)",
        cta: "0 12px 32px -8px rgba(0,65,136,0.5), 0 4px 12px -4px rgba(2,2,2,0.3)",
        deep: "0 24px 64px -16px rgba(2,2,2,0.55)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
