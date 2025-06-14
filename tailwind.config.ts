// import typography from '@tailwindcss/typography'
export default {
  darkMode: ['class'],
  prefix: '',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/ui/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: { pulse: 'pulseOpacity 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
      keyframes: { pulseOpacity: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.5 } } },
    },
  },
  plugins: [],
}
