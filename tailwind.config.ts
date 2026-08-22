import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f7f4ed',
        'cream-surface': '#f7f4ed', // same as page bg, for seamless card-in-page look
        'off-white': '#fcfbf8', // button text on dark backgrounds
        charcoal: '#1c1c1c', // primary text, dark button bg
        'charcoal-83': 'rgba(28,28,28,0.83)',
        'charcoal-82': 'rgba(28,28,28,0.82)',
        'charcoal-40': 'rgba(28,28,28,0.4)', // interactive borders
        'charcoal-4': 'rgba(28,28,28,0.04)', // hover backgrounds
        'charcoal-3': 'rgba(28,28,28,0.03)', // barely-visible overlays
        muted: '#5f5f5d', // secondary text, descriptions
        'light-cream': '#eceae4', // card borders, dividers
        'ring-blue': 'rgba(59,130,246,0.5)', // focus ring
      },
      boxShadow: {
        'inset-btn':
          'rgba(255,255,255,0.2) 0px 0.5px 0px 0px inset, rgba(0,0,0,0.2) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.05) 0px 1px 2px 0px',
        'focus-soft': 'rgba(0,0,0,0.1) 0px 4px 12px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        micro: '4px',
        DEFAULT: '6px',
        comfortable: '8px',
        card: '12px',
        container: '16px',
        pill: '9999px',
      },
      spacing: {
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '14': '56px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
      },
    },
  },
  plugins: [],
};
export default config;
