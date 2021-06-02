import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { visualizer } from 'rollup-plugin-visualizer'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '',
  plugins: [reactRefresh(), visualizer({ open: false }), tsconfigPaths()],
  esbuild: {
    jsxInject: 'import React from "react"\n',
  },
})
