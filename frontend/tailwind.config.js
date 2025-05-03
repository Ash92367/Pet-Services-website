import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customMus: {
          50: '#FFF7E5',
          100: '#FFECCC',
          200: '#FFDA99',
          400: '#FFBE4D',
          600: '#FF9A00',
        },
      },
    },
  },
  plugins: [
    daisyui, 
  ],

};
