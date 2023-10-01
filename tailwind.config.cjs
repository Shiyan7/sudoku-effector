const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    colors: {
      'border-color': 'hsla(0, 0%, 100%, .2)',
      transparent: 'transparent',
      white: '#fff',
      black: '#030305',
      dark: {
        100: '#24242C',
        200: '#16151A',
        300: '#353342',
        400: '#121212',
      },
      red: {
        100: '#f7cfd6',
        200: '#e55c6c',
        300: '#6A0307',
      },
      current: 'currentColor',
      gray: {
        100: '#91949D',
        300: '#94a3b7',
        400: '#6e7c8c',
      },
      blue: {
        100: '#0072e3',
        '100-dark': '#6B94CA',
        200: '#b9c8da',
        300: '#EEF2F8',
        400: '#eaeef4',
        500: '#dce3ed',
        600: '#013E7F',
        700: '#bbdefb',
        800: '#e2ebf3',
        900: '#314b62',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderWidth: {
        'sudoku-border': '2.5px',
      },
      zIndex: {
        1000: '1000',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle at 50% 0, #82ffff, #0072e3 53%)',
      },
      fontSize: {
        xs: '0.8rem',
      },
    },
    backgroundPosition: {
      'flag-position-1': '.1261% 99.9641%',
      'flag-position-2': '99.8961%98.761%',
      'flag-position-3': '.1342% 89.0976%',
    },
    backgroundSize: {
      'flag-size-1': '182.6041% 1049.3197%',
      'flag-size-2': '221.8987% 1186.5384%',
      'flag-size-3': '173.9087% 833.7837%',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addVariant }) => {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};
