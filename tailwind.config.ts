import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#0094BC",
          strong: "#006A8F",
          contrast: "#004B66",
          surface: "#E6F4F9",
        },
        secondary: "#484A50",
        bgSidebar: "#FFFFFF",
        bgContent: "#F9FAFB",
        borderDivider: "#DDE3F0",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        systemDanger: {
          DEFAULT: "#B91C1C",
          surface: "#FEE2E2",
          contrast: "#7F1D1D",
        },
        systemSuccess: "#10B981",
        systemWarning: "#F59E0B",
        systemNeutral: "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "page-title": [
          "24px",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        header: [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "500",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
      },
      ringColor: {
        accent: "#0094BC",
        "accent-strong": "#006A8F",
      },
    },
  },
  plugins: [forms],
};

export default config;
