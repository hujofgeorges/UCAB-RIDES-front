/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors:{
        
          verde: '#24CE6B',
          customGreen: '#2bb94f',
          fondo: '#f0f0f0',
          fondo_flecha: '#2d3748',
      }
    },
  },
  plugins: [],
}
