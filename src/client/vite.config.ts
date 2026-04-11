import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
import path from 'path';
export default defineConfig({
  server:{
    host:'0.0.0.0',
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      // This tells Vite that whenever it sees "@", it should look in the "src" folder
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Applied to reduce the large js files in production bundle
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true
      }
    },
    rollupOptions:{
      output:{
        manualChunks(id){
            if(id.includes('node_modules'))
            {
              if(id.includes('lucide-react') || id.includes('framer-motion') || id.includes('router'))
              {
                return 'core-libs';
              }
              return 'vendor';
            }
        }
      }
    }
  }
});
