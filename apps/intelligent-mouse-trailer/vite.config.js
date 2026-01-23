import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4011,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? '/interactions/intelligent-mouse-trailer/' : '/',
});
