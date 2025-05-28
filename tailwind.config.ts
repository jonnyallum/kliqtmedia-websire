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
        'kliqt-primary': '#8AFF00',
        'kliqt-secondary': '#FF008F',
        'kliqt-dark': '#0f0f0f',
        'kliqt-gray': '#1c1c1c',
      },
      backgroundImage: {
        'kliqt-gradient': 'linear-gradient(135deg, #8AFF00 0%, #FF008F 100%)',
        'kliqt-dark-gradient': 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8AFF00' },
          '100%': { boxShadow: '0 0 20px #8AFF00, 0 0 30px #8AFF00' },
        },
      },
    },
  },
  plugins: [],
}
export default config