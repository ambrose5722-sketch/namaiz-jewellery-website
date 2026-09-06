import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F3EEE6",
        cream: "#EAE1CE",
        espresso: "#241C16",
        bark: "#3A2E24",
        moss: "#3E4A38",
        moss2: "#2B3527",
        gold: "#B08A4E",
        goldlight: "#D6B87C",
        thread: "#4E6357",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
