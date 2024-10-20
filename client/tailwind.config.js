/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    extract,
  ],
  theme: {
    extend: {},
    fontSize,
    screens,
  },
  plugins: [
    fluid
  ],
}

