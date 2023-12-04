/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  // const darkTheme = () => {
  //   document.querySelector('html')?.setAttribute('data-theme', 'light')
  // }
}

