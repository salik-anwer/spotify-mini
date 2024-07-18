/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background-color',
      },
      transitionDuration: {
        '500': '500ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
    },
  },
  plugins: [],

}

