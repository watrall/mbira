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
        accent: "#0094BC",
        secondary: "#484A50",
        bgSidebar: "#FFFFFF",
        bgContent: "#F9FAFB",
        borderDivider: "#DDE3F0",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        systemDanger: "#EF4444",
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
      },
    },
  },
  plugins: [forms],
};

export default config;
