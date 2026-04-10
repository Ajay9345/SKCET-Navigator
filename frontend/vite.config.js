import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components/ui": path.resolve(__dirname, "./src/shared/ui"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
})
