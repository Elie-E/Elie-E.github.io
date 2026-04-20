import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://www.oussematrabelsi.com',
  base: '/',
  server: {
    port: parseInt(process.env.PORT) || 4321,
    host: true
  },
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  redirects: {
    // Redirect old incorrect language codes
    '/jp': '/ja',
    '/cn': '/zh',
    // Redirect specific jp URLs to ja
    '/jp/contact': '/ja/contact',
    '/jp/about': '/ja/about',
    '/jp/portfolio': '/ja/portfolio',
    '/jp/blog': '/ja/blog',
    '/jp/resume': '/ja/resume',
    '/jp/recommendations': '/ja/recommendations',
    // Redirect jp blog articles to ja
    '/jp/blog/eloquent-performance-tricks': '/ja/blog/eloquent-performance-tricks',
    '/jp/blog/why-we-still-love-php-in-2025': '/ja/blog/why-we-still-love-php-in-2025',
    '/jp/blog/design-thinking-for-developers': '/ja/blog/design-thinking-for-developers',
    '/jp/blog/docker-for-local-development': '/ja/blog/docker-for-local-development',
    // Redirect specific cn URLs to zh
    '/cn/contact': '/zh/contact',
    '/cn/about': '/zh/about',
    '/cn/portfolio': '/zh/portfolio',
    '/cn/blog': '/zh/blog',
    '/cn/resume': '/zh/resume',
    '/cn/recommendations': '/zh/recommendations',
    // Redirect cn blog articles to zh
    '/cn/blog/eloquent-performance-tricks': '/zh/blog/eloquent-performance-tricks',
    '/cn/blog/why-we-still-love-php-in-2025': '/zh/blog/why-we-still-love-php-in-2025',
    '/cn/blog/design-thinking-for-developers': '/zh/blog/design-thinking-for-developers',
    '/cn/blog/docker-for-local-development': '/zh/blog/docker-for-local-development',
    // Redirect incorrect language combinations
    '/jp/*': '/ja/:splat',
    '/cn/*': '/zh/:splat',
    // Redirect specific problematic URLs to home
    '/fr/ar': '/fr',
    '/en/pt': '/en',
    '/ja/ko': '/ja',
    '/zh/ko': '/zh',
    '/ko/ko': '/ko',
    '/pt/ko': '/pt',
    '/es/ko': '/es',
    '/cn/en': '/zh',
  },
  integrations: [
    tailwind(),
    react(),
    sitemap()
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom']
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      }
    }
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
