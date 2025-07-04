/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Italian flag inspired colors
        primary: {
          50: '#f0f9f0',   // Very light green
          100: '#dcf2dc',  // Light green
          200: '#b8e5b8',  // Lighter green
          300: '#8fd68f',  // Medium light green
          400: '#5cb85c',  // Medium green
          500: '#228B22',  // Forest green (main)
          600: '#1e7e1e',  // Darker green
          700: '#1a6b1a',  // Dark green
          800: '#155815',  // Very dark green
          900: '#104510',  // Darkest green
        },
        accent: {
          50: '#fef2f2',   // Very light red
          100: '#fee2e2',  // Light red
          200: '#fecaca',  // Lighter red
          300: '#fca5a5',  // Medium light red
          400: '#f87171',  // Medium red
          500: '#DC143C',  // Crimson (main)
          600: '#c41e3a',  // Darker red
          700: '#a91b2e',  // Dark red
          800: '#8e1823',  // Very dark red
          900: '#741518',  // Darkest red
        },
        neutral: {
          50: '#fafafa',   // Off white
          100: '#f5f5f5',  // Light gray
          200: '#e5e5e5',  // Gray
          300: '#d4d4d4',  // Medium gray
          400: '#a3a3a3',  // Dark gray
          500: '#737373',  // Darker gray
          600: '#525252',  // Very dark gray
          700: '#404040',  // Almost black
          800: '#262626',  // Very dark
          900: '#171717',  // Black
        }
      }
    },
  },
  plugins: [],
} 