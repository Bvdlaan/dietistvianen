/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
      },
    },
  },
  plugins: [],
}
