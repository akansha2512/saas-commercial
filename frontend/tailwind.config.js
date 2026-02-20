/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient':
          'linear-gradient(to right, #ec4899, #22c55e, #3b82f6)',
      },
    },
    
  },
  plugins: [],
}

