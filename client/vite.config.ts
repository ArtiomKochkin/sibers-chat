import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
        { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
        { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
        { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      ]
    })
  ],
})
