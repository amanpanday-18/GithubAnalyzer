/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raven: '#09090B',   // Sleek black background
        bokara: '#18181B',  // Card background
        phantom: '#27272A', // Borders / secondary surface
        anchovy: '#A1A1AA', // Muted text
        sphinx: '#3B82F6',  // Professional Blue Accent
        dusty: '#FAFAFA',   // White primary text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
