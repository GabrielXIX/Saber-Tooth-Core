/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#121212",
        nero1: "#1A1A1A",
        nero2: "#2C2C2C",
        charcoal: "#3E3E3E",
        denim: "#23232D",
        denimLight: "#2f2f3c",
        sky: "#1B98E0",
        skyLight: "#67BAFE",
        whiteSmoke: "#F0F0F0",
        silver: "#C0C0C0",
        highlight: "#43435a",
        selection: "#656588",
      },
    },
    fontFamily: {
      lexend: ["Lexend", "sans-serif"],
      openSans: ["Open Sans", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
      bioRhyme: ["BioRhyme", "sans-serif"],
    },
  },
  plugins: [],
};
