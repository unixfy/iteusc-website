/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
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
