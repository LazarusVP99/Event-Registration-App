import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://event-registration-app-kvd7.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
