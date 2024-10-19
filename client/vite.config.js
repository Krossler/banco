import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // URL de tu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe el prefijo '/api'
      },
    },
  },
});