import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff0f3',
          100: '#ffe0e7',
          200: '#ffc6d4',
          300: '#ff9db2',
          400: '#ff6689',
          500: '#ff3365',
          600: '#f01250',
          700: '#ca0945',
          800: '#a80b3e',
          900: '#8f0d3a',
        },
        rose: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff6b6b',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c7d8c7',
          300: '#a0bc9f',
          400: '#749a72',
          500: '#547c52',
        },
        cream: '#fdf8f4',
        parchment: '#f9f3ec',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
