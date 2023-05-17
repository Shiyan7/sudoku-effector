const { typewindTransforms } = require("typewind/transform");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    transform: typewindTransforms,
  },
  theme: {
    colors: {
      'white': "#fff",
      'polar': '#f4f9fd',
      'blue': {
        100: '#2e85ec',
        900: "#314b62"
      },
    },
    fontFamily: {
      sans: ['sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};