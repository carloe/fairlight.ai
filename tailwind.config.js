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
  purge: {
    options: {
      safelist: [
        'border-red-500', 'bg-red-300',
        'border-green-500', 'bg-green-300',
        'border-purple-500', 'bg-purple-300',
        'border-blue-500', 'bg-blue-300',
        'border-neutral-500', 'bg-neutral-300',
        'border-teal-500', 'bg-teal-300',
      ],
    },
  },
  plugins: [],
}

