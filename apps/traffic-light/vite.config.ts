import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4018,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? "/interactions/traffic-light/" : "/",
});
