import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4005,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/fancy-gradient-hover-link/' : '/',
});
