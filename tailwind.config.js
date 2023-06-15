/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],
  content: ["./views/**/*.ejs",
    "./node_modules/flowbite/**/*.js"],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [],
};
