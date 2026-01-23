import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4004,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/curtain-reveal-menu/' : '/',
});
