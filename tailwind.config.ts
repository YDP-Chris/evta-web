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
        // EVTA Brand Colors
        'evta-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'evta-brown': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#d6c4b8',
          400: '#b8977a',
          500: '#9c7a5c',
          600: '#846548',
          700: '#6b5340',
          800: '#5a4638',
          900: '#4d3c31',
        },
        // Trail difficulty colors
        'trail-easy': '#22c55e',
        'trail-moderate': '#f59e0b',
        'trail-difficult': '#ef4444',
        // Status colors
        'status-open': '#22c55e',
        'status-caution': '#f59e0b',
        'status-closed': '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
