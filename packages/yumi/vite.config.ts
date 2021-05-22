import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svelte from '@svitejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  base: '',
  plugins: [reactRefresh(), svelte(), visualizer({ open: true })],
  esbuild: {
    // jsxInject: 'import React from "react"\n',
  },
})
