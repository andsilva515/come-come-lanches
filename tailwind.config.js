/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./login/**/*.{html,js}",
  "./painel/**/*.{html,js}",
  "./scripts/**/*.js"
],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}