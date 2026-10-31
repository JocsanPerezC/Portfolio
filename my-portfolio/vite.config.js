import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // The 3D model chunk (Three.js + drei) is ~870 kB and loads lazily near its section,
    // so it never blocks the first paint. Keep the warning for anything bigger.
    chunkSizeWarningLimit: 900,
  },
})