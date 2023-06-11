const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  },
  theme: {
    colors: {
      'border-color': 'hsla(0, 0%, 100%, .2)',
      transparent: 'transparent',
      white: "#fff",
      black: "#000",
      red: '#e55c6c',
      gray: {
        100: '#f4f4f4',
        300: '#94a3b7',
        400: '#6e7c8c'
      },
      blue: {
        100: '#0072e3',
        200: '#b9c8da',
        300: '#f3f6fa',
        400: '#eaeef4',
        500: '#dce3ed',
        900: "#314b62"
      },
    },
    fontFamily: {
      'sans': ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      zIndex: {
        '1000': '1000',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle at 50% 0, #82ffff, #0072e3 53%)',
      },
      fontSize: {
        xs: '0.8rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({
      addVariant
    }) => {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};