/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(56, 189, 248, 0.2), 0 30px 60px rgba(14, 116, 144, 0.25)',
      },
    },
  },
  plugins: [],
};

