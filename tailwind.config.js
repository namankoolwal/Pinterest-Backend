/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        'dragover': 'hsla(223, 10%, 60%, 0.2)',
      },
    },
  },
  plugins: [],
}

