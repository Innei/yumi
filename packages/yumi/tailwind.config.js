/*
 * @Author: Innei
 * @Date: 2021-02-03 20:37:04
 * @LastEditTime: 2021-02-04 12:37:52
 * @LastEditors: Innei
 * @FilePath: /web/tailwind.config.js
 * @Mark: Coding with Love
 */

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx,vue}'],
  },
  darkMode: true,
  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        phone: { raw: '(max-width: 768px)' },
        desktop: { raw: '(min-width: 1024px)' },
        tablet: { raw: '(max-width: 1023px)' },
      },

      colors: {
        red: 'var(--red)',
      },
    },
  },
  variants: {},
  plugins: [],
}
