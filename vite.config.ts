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
      // CRITICAL: We define specific keys to avoid overwriting the entire process.env object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  };
});