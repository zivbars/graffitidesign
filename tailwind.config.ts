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
        sans: ['var(--font-heebo)', 'sans-serif'],
        heebo: ['var(--font-heebo)', 'sans-serif'],
        fredoka: ['var(--font-fredoka)', 'sans-serif'],
      },
      colors: {
        primary: {
          pink: "#C04182",
          turquoise: "#49B4A3",
          mustard: "#D0A32D",
        },
        base: {
          black: "#1A1A1A",
          white: "#F7F5F2",
          gray: "#E1E1E1",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        bounce: "bounce 0.6s ease-in-out",
        slideIn: "slideIn 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

