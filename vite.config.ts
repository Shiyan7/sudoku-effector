import { defineConfig } from 'vite';
import svg from '@neodx/svg/vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svg({
      root: 'src/shared/ui/icon/assets',
      group: true,
      output: 'public/sprites',
      definitions: 'src/shared/ui/icon/sprite.h.ts',
    }),
  ],
  server: {
    host: true,
  },
});
