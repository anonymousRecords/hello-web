import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4009,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/hover-effect/' : '/',
});
