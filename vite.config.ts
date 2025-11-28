
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env for standard Node.js style usage in frontend code
    // Fallback to empty string to prevent build crash/runtime undefined error if env var is missing
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || "")
  }
});
