/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raven: '#F9F9F9',   // Light background
        bokara: '#FFFFFF',  // White Card background
        phantom: '#E5E7EB', // Light Borders / secondary surface
        anchovy: '#4B5563', // Muted text
        sphinx: '#004F37',  // Dark Forest Green Accent
        dusty: '#091A12',   // Very dark green/black primary text
        lime: '#D4F772',    // Lime green accent
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
