import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/usuarios': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/cultivos': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})