import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
import path from "path"
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // DO NOT rewrite
      },
    },
  },
  resolve: {
    alias: {
        '@src': path.resolve(__dirname, 'src'),  // Alias @ to the 'src' folder
        '@api': path.resolve(__dirname, 'src/openapi-request/services'),  // Alias @routes to the 'src/router' folder
        '@assets': path.resolve(__dirname, 'src/assets'),  // Alias @assets to the 'src/assets' folder
        '@states': path.resolve(__dirname, 'src/states'),  // Alias @stores to the 'src/stores' folder
        '@utils': path.resolve(__dirname, 'src/utils'),  // Alias @utils to the 'src/utils' folder
        '@shared': path.resolve(__dirname, 'src/pages/shared'),
        '@openapi' : path.resolve(__dirname, 'src/openapi-request/services'),
        '@context' : path.resolve(__dirname, 'src/context'),
        '@bank-app-common' : path.resolve(__dirname, '@bank-app-common'),
         ///Users/suryadeep/Documents/projects/learning/javascript/reactjs/test-react-app/src/openapi-request/services/UsersManagementService.ts
        '@layouts': path.resolve(__dirname, 'src/layouts'),  // Alias @layouts to the 'src/layouts' folder
        // '@plugins': path.resolve(__dirname, 'src/plugins'),  // Alias @plugins to the 'src/plugins' folder
    },
},
})
