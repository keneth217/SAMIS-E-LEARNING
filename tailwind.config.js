// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: 'class',
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extended colors for better dark mode contrast
      colors: {
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#2563eb',  // blue-600
        },
        secondary: {
          light: '#10b981', // emerald-500
          dark: '#059669',  // emerald-600
        },
      },
      // Animation utilities for smooth theme transitions
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [

  ],
}