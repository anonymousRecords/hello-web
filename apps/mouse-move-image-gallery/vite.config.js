import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4013,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/mouse-move-image-gallery/' : '/',
});
