import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { fg: ["var(--font-fg)"], inter: ["var(--font-inter)"] },
      fontWeight: {
        medium: "500",
      },
      fontSize: {
        sm: "18px", // 18px
        base: "1.375rem", // 22px
        xl: "1.375rem", // 22px
        "2xl": "2rem", // 32px
      },
      backgroundImage: {
        "gradient-radial-primary-light":
          "radial-gradient(ellipse 544px 501px, #8CA5FE, transparent)",
        "gradient-radial-primary-light-mobile":
          "radial-gradient(ellipse 200px 217px, #8CA5FE, transparent)",
      },
      colors: {
        "primary-dark": "#02010A",
        "primary-blue": "#4D62F0",
        "primary-blush": "#FCD7FC",
        "body-light": "#636768",
        "body-dark": "#8F9394",
        "body-additional": "#AAB3B6",
        "clean-white": "#FFFFFF",

        background: "var(--background)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 1s linear infinite",
      },
      screens: {
        "token-header-touchpoint": "1155px", // Width at which the page header touches token icon
      },
    },
  },
  plugins: [],
};
export default config;
