// Colores originales
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//   theme: {
//     extend: {
//       animation: {
//         'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       }
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#fafaf8',
          100: '#f5f4f0',
          200: '#ebe9e0',
          300: '#ddd9cc',
          400: '#b8b3a3',
          500: '#8e8977',
          600: '#6b6658',
          700: '#534f45',
          800: '#3a372f',
          900: '#252320',
          950: '#141311',
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
