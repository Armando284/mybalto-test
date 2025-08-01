import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      width: {
        '458': '458px',
        '720': '720px',
        '856': '856px',
      },
      backgroundImage: {
        'radial-circle': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'radial-ellipse': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
