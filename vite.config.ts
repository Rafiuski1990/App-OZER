import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Declaração simples para evitar erro de linter no process
declare const process: any;

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // O terceiro argumento '' garante que carregue todas as env vars, não apenas as que começam com VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Explicitly set root to current directory
    root: '.',
    plugins: [react()],
    define: {
      // Safely inject API key without overwriting the global process object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false
    }
  };
});