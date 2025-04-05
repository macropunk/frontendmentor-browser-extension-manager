import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/frontendmentor-browser-extension-manager",
  build: {
    outDir: 'dist',
    emptyOutDir: true // ensures the folder is cleared before build
  }
})
