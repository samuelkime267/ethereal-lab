import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        space: "var(--space-grotesk)",
      },
      colors: {
        pri: "#1ABC9C",
        bg: "#ECF0F1",
        vBlack: "#1A1A1A",
        gray: "#BDC3C7",
        grayLight: "#d4d9dc",
      },
    },
  },
  plugins: [],
};
export default config;
