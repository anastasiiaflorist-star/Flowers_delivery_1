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
        primary: {
          DEFAULT: '#c0516a',
          dark: '#a03d54',
        },
        dark: {
          DEFAULT: '#3a1e1e',
          medium: '#5a2e2e',
          muted: '#5a3a3a',
          wine: '#7a3a44',
        },
        muted: '#7a5a5a',
        blush: {
          soft: '#fdf0f3',
          pale: '#fce8ed',
          light: '#f9d4dc',
          border: '#f0d8dc',
        },
        cream: '#f5ede5',
        parchment: '#f9f3ec',
      },
      fontFamily: {
        serif: ['var(--font-jost)', 'sans-serif'],
        sans: ['var(--font-jost)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
