import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Palette
        surface: {
          light: '#F8F9FA', // warm off-white
          dark: '#0F172A',  // deep dark slate
        },
        card: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#1E293B', // deep navy primary
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // primary accent
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          DEFAULT: '#14B8A6',
        },
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // secondary accent: sunset orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#F97316',
        },
        coral: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          DEFAULT: '#ff5a5f',
          dark: '#e0484d',
        },
        sand: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#e8dcce',
          300: '#d7c2ae',
          400: '#c2a38b',
          500: '#b08b6f',
        }
      },
      borderRadius: {
        'card': '1.25rem', // 20px
        'card-sm': '1rem',  // 16px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 25px -5px rgba(249, 115, 22, 0.3)',
        'glow-teal': '0 0 25px -5px rgba(20, 184, 166, 0.3)',
        'dark-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
