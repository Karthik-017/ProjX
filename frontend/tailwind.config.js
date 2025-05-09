/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',         // pure black
        secondary: '#ffffff',       // pure white
        offwhite: '#f8f9fa',        // light off-white background
        lightgray: '#f2f2f2',       // subtle light shade
        midgray: '#d1d1d1',         // medium shade for borders
        darkgray: '#333333',        // dark shade for text
        subtlegray: '#757575',      // subtle text color
      },
    },
  },
  plugins: [],
}