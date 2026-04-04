/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-navy": "#1A237E",
        "brand-orange": "#FF6D00",
        "brand-bg": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
