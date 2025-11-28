import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    // Explicitly set root to ensure Vercel finds the entry point
    root: '.',
    plugins: [react()],
    define: {
      // CRITICAL: We define `process.env` to prevent crashes in browser
      'process.env': {
        API_KEY: env.API_KEY || "",
        NODE_ENV: mode
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  };
});