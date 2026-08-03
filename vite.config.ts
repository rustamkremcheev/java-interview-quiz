import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      },
      manifest: {
        name: 'Java Mission Control',
        short_name: 'JavaMC',
        description: 'Practice, Diagnose, Explain, Master Senior Java Backend Engineering',
        theme_color: '#0b0f19',
        background_color: '#0b0f19',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/modules/oop/')) {
            return 'oop-content';
          }
          if (id.includes('node_modules/dexie')) {
            return 'vendor-dexie';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2400
  }
});
