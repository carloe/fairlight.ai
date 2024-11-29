// Use ES module syntax throughout the file

import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './index.html',
  ],
  theme: {
    extend: {
      fontSize: {
        'node-title': '7px',
      },
    },
  },
  safelist: [
    'border-red-500', 'bg-red-300', 'stroke-red-500',
    'border-green-500', 'bg-green-300', 'stroke-green-500',
    'border-purple-500', 'bg-purple-300', 'stroke-purple-500',
    'border-blue-500', 'bg-blue-300', 'stroke-blue-500',
    'border-neutral-500', 'bg-neutral-300', 'stroke-neutral-500',
    'border-teal-500', 'bg-teal-300', 'stroke-teal-500',
  ],
  plugins: [
    forms,
  ],
}
