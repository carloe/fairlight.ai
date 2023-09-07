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
        'border-red-500', 'bg-red-300', 'stroke-red-500',
        'border-green-500', 'bg-green-300', 'stroke-green-500',
        'border-purple-500', 'bg-purple-300', 'stroke-purple-500',
        'border-blue-500', 'bg-blue-300', 'stroke-blue-500',
        'border-neutral-500', 'bg-neutral-300', 'stroke-neutral-500',
        'border-teal-500', 'bg-teal-300', 'stroke-teal-500',
      ],
    },
  },
  plugins: [

  ],
}

