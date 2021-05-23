import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { visualizer } from 'rollup-plugin-visualizer'
const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

export default defineConfig({
  base: '',
  plugins: [reactRefresh(), visualizer({ open: true }), vuePlugin(), vueJsx()],
  esbuild: {
    // jsxInject: 'import React from "react"\n',
  },
})
