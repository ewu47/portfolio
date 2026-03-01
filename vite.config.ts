import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to '/<repo-name>/'
  // e.g., base: '/portfolio/' or base: '/' for user site (ewu47.github.io)
  base: '/',
})
