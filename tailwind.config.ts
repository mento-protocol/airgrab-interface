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
    },
  },
  plugins: [],
};
export default config;
