import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This tells Vite that whenever it sees "@", it should look in the "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
});