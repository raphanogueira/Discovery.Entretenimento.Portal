import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow overriding base via env (useful for CI deploys).
  base: process.env.VITE_BASE || '/Discovery.Entretenimento.Portal/',
  css: {
    postcss: './postcss.config.js',
  },
})
