const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  },
  theme: {
    colors: {
      'gray': {
        100: '#f4f4f4',
        300: '#94a3b7',
        400: '#6e7c8c'
      },
      'white': "#fff",
      'black': "#000",
      'blue': {
        100: '#2e85ec',
        900: "#314b62"
      },
    },
    fontFamily: {
      sans: ['sans-serif'],
    },
    extend: {
      zIndex: {
        '1000': '1000',
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};