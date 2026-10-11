/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080D1A',
          900: '#0F172A', // Midnight navy
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        brand: {
          blue: {
            DEFAULT: '#2563EB',
            light: '#3B82F6',
            dark: '#1D4ED8',
            subtle: '#EFF6FF',
            glow: 'rgba(37, 99, 235, 0.15)',
          },
          green: {
            DEFAULT: '#16A34A',
            light: '#22C55E',
            dark: '#15803D',
            subtle: '#F0FDF4',
            glow: 'rgba(22, 163, 74, 0.15)',
          },
          surface: {
            offwhite: '#F5F7FA', // Off-white
            card: '#FFFFFF',
            darkcard: '#131D33',
            darkborder: '#1E293B',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-green': '0 0 25px -5px rgba(22, 163, 74, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
