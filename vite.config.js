import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      VITE_API_POINT: JSON.stringify(env.VITE_API_POINT),
    },
    plugins: [react()],
  };
});
