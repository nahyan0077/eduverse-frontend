/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily:{
      info:["Reddit Sans", "sans-serif"]
    },
  },
  plugins: [require("daisyui")],
}