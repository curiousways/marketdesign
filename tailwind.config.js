/** @type {import('tailwindcss').Config} * */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1920px',
      },
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'extra-light-grey': '#e8e8e8',
        'light-grey': '#BBBBBB',
        'dark-grey': '#7E7E7E',
        green: {
          dark: '#7DBB67',
          light: '#B7CDAF',
        },
        red: '#DE2B2B',
        brown: '#9D7F69',
        blue: {
          light: '#80CCE4',
        },
      },
      keyframes: {
        open: {
          from: { height: '0' },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        close: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        open: 'open .3s ease-in-out',
        close: 'close .4s ease-in-out',
      },
    },
  },
  plugins: [],
};
