import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(),"./src"),
      "@lib": path.resolve(process.cwd(), "./src/lib"),
    }
  },
  server: {
    host: true,
    port : process.env.PORT ? parseInt(process.env.PORT) : 3001, // Change the port to your desired value
  },
})
