/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#f9f1d8',
          200: '#f0e0b0',
          300: '#e6cf88',
          400: '#ddbe60',
          500: '#d4af37',
          600: '#c5a059',
          700: '#b08d2f',
          800: '#8c7025',
          900: '#68541b',
        },
        crimson: {
          500: '#8b0000',
          600: '#a52a2a',
          700: '#701010',
        },
        ink: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0a0a0a',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cloud-pattern': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">%3Cpath d=\"M10 10 Q 20 0 30 10 T 50 10 T 70 10 T 90 10\" stroke=\"%23d4af37\" stroke-width=\"0.5\" fill=\"none\" opacity=\"0.2\"/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
