/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `error.{js,ts,vue}`
  ],
  theme: {
    screens: {
      'xs': '450px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#FFA500",
        "primary-faded": "#FFB651",
      },
      display: ["group-hover"]
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
