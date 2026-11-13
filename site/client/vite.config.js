import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Addresses the C# app answers. While developing with "npm run dev" (port
// 5173), Vite passes them on to the C# app started with "dotnet run".
const backend = 'http://localhost:5080'
const proxied = ['/api', '/v1', '/media', '/showcase']

export default defineConfig({
  plugins: [react()],
  build: {
    // The finished site goes where the C# app serves static files from
    outDir: '../wwwroot',
    emptyOutDir: true,
  },
  server: {
    proxy: Object.fromEntries(proxied.map((path) => [path, backend])),
  },
})
