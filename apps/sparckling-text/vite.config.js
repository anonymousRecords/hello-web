import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4014,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/sparckling-text/' : '/',
});
