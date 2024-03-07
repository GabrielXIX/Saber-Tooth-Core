/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#191919",
        nero1: "#212121",
        nero2: "#2C2C2C",
        charcoal: "#373737",
        denim: "#23232D",
        sky: "#1B98E0",
        skyLight: "#67BAFE",
        whiteSmoke: "#D4D4D4",
        silver: "#C0C0C0",
        highlight: "#171d46",
        selection: "#1A3149",
      },
    },
    fontFamily: {
      lexend: ["Lexend", "sans-serif"],
    },
  },
  plugins: [],
};
