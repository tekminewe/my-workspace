import plugin from './src/components/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: {
    files: ['./src/**/*.{ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [plugin()],
};
