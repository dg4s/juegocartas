import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      strategies: 'generateSW',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'home-scene.png'],
      manifest: {
        name: 'NÚMERO FLASH',
        short_name: 'NÚMERO FLASH',
        description:
          'Actividad de observación, retención breve y reconstrucción con cartas.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#081a3a',
        theme_color: '#081a3a',
        lang: 'es',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        navigateFallback: '/index.html',
        skipWaiting: false,
        clientsClaim: false,
      },
    }),
  ],
})
