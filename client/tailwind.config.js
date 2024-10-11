/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#E5D5FF', // Replace with your desired color codes
          DEFAULT: '#6B5B9A',
          dark: '#4C2A6C',
          // Add more shades as needed
        },
        black: '#000000', // Optional, if you want a specific black shade
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(128, 0, 128, 0.1), 0px 1px 0px 0px rgba(128, 0, 128, 0.02), 0px 0px 0px 1px rgba(128, 0, 128, 0.08)`,
      },
      keyframes: {
        'bg-position': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      keyframes: {
        trail: {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
      },
      animation: {
        trail: 'trail var(--duration) linear infinite',
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
