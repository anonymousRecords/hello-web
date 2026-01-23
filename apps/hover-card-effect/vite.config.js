import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4008,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/hover-card-effect/' : '/',
});
