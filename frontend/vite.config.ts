import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Port untuk development server
    open: true, // Otomatis buka browser saat npm run dev
  },
  build: {
    outDir: 'dist', // Folder output untuk production build
    sourcemap: true, // Generate sourcemap untuk debugging
  },
})

