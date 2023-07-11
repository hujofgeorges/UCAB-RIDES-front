/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors:{
        
          verde: '#24CE6B',
          customGreen: '#2bb94f',
          hoverGreen: '#1e953a',
          fondo: '#f0f0f0',
          fondo_flecha: '#f0f0f0',
          letra_clara: '#a295a7',
          azul: '#37b4e3',
      }
    },
  },
  plugins: [],
}
