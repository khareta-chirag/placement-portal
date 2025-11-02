/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7ff',
          100: '#efeaff',
          300: '#c9b9ff',
          500: '#6b46ff', // purple brand
          700: '#5a3be6'
        },
        surface: '#0f1724'
      },
      boxShadow: {
        'purple-lg': '0 10px 30px rgba(107,70,255,0.15)'
      }
    },
  },
  plugins: [],
}
