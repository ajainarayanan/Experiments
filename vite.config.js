import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(),svgr()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true, // also necessary
  }
});