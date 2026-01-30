import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4020,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? "/interactions/stranger-things/" : "/",
});
