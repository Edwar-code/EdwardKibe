import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // custom theme
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1200px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    // custom stuff
    extend: {
      colors: {
        brown0: '#fffaf3',
        brown1: '#fefae0',
        brown2: '#faedcd',
        brown3: '#f2e3bf',
        brown4: '#d5c294',
        brown5: '#D18445',

        gray8: '#2b2a33',
      },

      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },

      animation: {
        // Hero section availability ping
        'ping-lg': 'ping-lg 1s ease-in-out infinite',
        // take animate-left keyframe and add this tailwind to its classname
        'left-movement': 'left-movement 1s linear infinite',
        'right-movement': 'right-movement 1s linear infinite',
      },
      keyframes: {
        'ping-lg': {
          '75%, 100%': {
            transform: 'scale(3)',
            opacity: '0',
          },
        },
        'left-movement': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        'right-movement': {
          '0%': {
            transform: 'translateX(-50%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
