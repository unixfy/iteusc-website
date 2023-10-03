/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'sans': ['Rubik', ...defaultTheme.fontFamily.sans],
      'display': ['Overpass', ...defaultTheme.fontFamily.display]
    },
    extend: {
      colors: {
        'usc-cardinal': '#990000',
        'usc-yellow': '#FFCC00',
        'ite-blue': '#00688F',
      }
    },
  },
  plugins: [require("daisyui")],
}
