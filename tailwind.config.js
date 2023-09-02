/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'node-title': '7px', // Replace 'custom' with your desired name and '1.5rem' with your desired size
      },
    },
  },
  plugins: [],
}

