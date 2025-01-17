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
        pri: "#ff7225",
        sec: "#5b71db",
        priDark: "#6d200f",
        bg: "#070f1c",
        gray: "#5e646e",
        grayLight: "#424954",
      },
    },
  },
  plugins: [],
};
export default config;
