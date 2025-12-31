/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#6B1B3D',
      //   secondary: '#8B2952',
      //   dark: '#4A1229',
      //   light: '#D4A5BA',
      //   bg: '#F0FFFE',
      //   text: '#1A1A1A',
      // },
       colors: {
        primary: '#d64c3e',
        secondary: '#ff6b5a',
        dark: '#a03429',
        light: '#ffb3a7',
        bg: '#fff5f4',
        text: '#1A1A1A',
      },
    },
  },
  plugins: [],
}
