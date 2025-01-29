/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb',    // blue-600
        },
        secondary: {
          DEFAULT: '#6b7280', // gray-500
          dark: '#4b5563',    // gray-600
        },
      },
    },
  },
  plugins: [],
} 