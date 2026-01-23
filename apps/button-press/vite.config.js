import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4001,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/button-press/' : '/',
});
