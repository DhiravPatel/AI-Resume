import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@landing': path.resolve(__dirname, 'landing'),
      '@dashboard': path.resolve(__dirname, 'dashboard'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
