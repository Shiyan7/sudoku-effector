const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    colors: {
      'border-color': 'hsla(0, 0%, 100%, .2)',
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      red: '#e55c6c',
      current: 'currentColor',
      gray: {
        100: '#f4f4f4',
        300: '#94a3b7',
        400: '#6e7c8c',
      },
      blue: {
        100: '#0072e3',
        200: '#b9c8da',
        300: '#f3f6fa',
        400: '#eaeef4',
        500: '#dce3ed',
        900: '#314b62',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
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
