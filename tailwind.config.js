/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bg-pan': 'bg-pan 15s ease infinite',
        'text-glow': 'text-glow 3s ease-in-out infinite',
        'hover-glow': 'glow-hover 1.5s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'bg-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px #f0f, 0 0 20px #0ff' },
          '50%': { textShadow: '0 0 20px #0ff, 0 0 40px #f0f' },
        },
        'glow-hover': {
      '0%, 100%': { textShadow: '0 0 8px #00f2ff, 0 0 20px #00f2ff' },
      '50%': { textShadow: '0 0 16px #00f2ff, 0 0 32px #00f2ff' },
        },
      },
    },
  },
  plugins: [],
};
