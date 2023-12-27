/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    './index.html',
    "./src/**/*.{html,js,svelte,ts}"
  ],


  plugins: [require("daisyui")],

  daisyui: {
    themes: true,
  },
};

module.exports = config;
