const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      ...defaultTheme.screens
    },
    fontFamily: {
      "krona": ['"Krona One"', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}