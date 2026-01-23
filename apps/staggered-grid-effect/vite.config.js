import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4015,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/staggered-grid-effect/' : '/',
});
