/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Playful arcade colors
        'arcade-pink': '#FF6B9D',
        'arcade-blue': '#4ECDC4',
        'arcade-yellow': '#FFE66D',
        'arcade-purple': '#A8E6CF',
        'arcade-orange': '#FF8B94',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}