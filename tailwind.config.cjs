/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
        'display': ['Overpass', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'usc-cardinal': '#990000',
        'usc-yellow': '#FFCC00',
        'ite-blue': '#00688F',
      }
    },
  },
  plugins: [require("daisyui")],
}
