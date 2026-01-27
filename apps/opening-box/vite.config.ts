import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4019,
    strictPort: true,
  },
  base: process.env.BUILD_FOR_GALLERY ? "/interactions/opening-box/" : "/",
});
