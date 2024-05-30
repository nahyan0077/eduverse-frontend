import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(),"./src"),
      "@lib": path.resolve(process.cwd(), "./src/lib"),
      'vite-env': path.resolve(__dirname, 'src', 'vite-env.d.ts'),
    }
  },
  server: {
    host: true,
    port : process.env.PORT ? parseInt(process.env.PORT) : 3001, // Change the port to your desired value
  },
})
