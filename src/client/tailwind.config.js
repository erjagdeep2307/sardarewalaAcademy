 /** @type {import('tailwindcss').Config} */
export default {
  // Use class strategy so toggling a `.dark` class enables dark styles
  darkMode: 'class',
  // Include index.html and all source files so Tailwind picks up classes
  content: ["./index.html", "./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};