/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-page': "url('src/assets/home_page.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'note-grid': 'repeat(auto-fit, minmax(250px, 0.2fr))',
      },
      gridTemplateRows: {
        'note-grid': 'repeat(auto-fit, minmax(250px, 0.2fr))',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}

