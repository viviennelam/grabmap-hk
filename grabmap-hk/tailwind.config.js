/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro gaming color scheme
        'retro-bg': '#0f0f1a',
        'retro-card': '#1a1a2a',
        'retro-hover': '#25253a',
        'retro-pink': '#ff2d75',
        'retro-blue': '#00d9ff',
        'retro-purple': '#b967ff',
        'retro-green': '#00ff88',
        'retro-text': '#ffffff',
        'retro-text-secondary': '#a0a0c0',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Arial', 'Noto Sans TC', 'sans-serif'],
        'retro': ['Poppins', 'Arial Black', 'Noto Sans TC Black', 'sans-serif'],
      },
      boxShadow: {
        'retro': '0 0 20px rgba(255, 45, 117, 0.3)',
        'retro-blue': '0 0 20px rgba(0, 217, 255, 0.3)',
        'retro-purple': '0 0 20px rgba(185, 103, 255, 0.3)',
        'retro-green': '0 0 20px rgba(0, 255, 136, 0.3)',
      },
    },
  },
  plugins: [],
}