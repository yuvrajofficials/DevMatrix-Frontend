import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import VitePluginBundleAnalyzer from 'vite-plugin-bundle-analyzer'; // Make sure to import the plugin

export default defineConfig({
  plugins: [
    react(),
    // VitePluginBundleAnalyzer() // Add both plugins in a single array
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';  // All node_modules dependencies go into a separate chunk
          }
        }
      }
    }
  }
});
