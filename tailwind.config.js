/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
      boxShadow: {
        'green': '0px 22px 70px 4px rgba(32, 201, 119, 0.15)',
        'blue': '0px 22px 70px 4px rgba(92, 124, 250, 0.15)',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(0px, -5px) scale(1.02) rotate(120deg)',
          },
          '66%': {
            transform: 'translate(-2px, 2px) scale(0.98) rotate(240deg)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1) rotate(360deg)',
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5c7cfa",
          "secondary": "#7190ed",
          "accent": "#f06595",
          "neutral": "#090909",
          "base-100": "#010101",
          "info": "#20c997",
          "success": "#40c057",
          "warning": "#fab005",
          "error": "#ff6b6b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
