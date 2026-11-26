import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ and mirrors clean dist/ into public/undangan & docs/
      // so GitHub Pages works whether served from GitHub Actions, /docs, or / (root).
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        buildStart(): void {
          const publicBuiltDir = path.resolve(__dirname, 'public/undangan');
          if (fs.existsSync(publicBuiltDir)) {
            fs.rmSync(publicBuiltDir, {recursive: true, force: true});
          }
        },
        transformIndexHtml(html: string): string {
          return html.replace(
            /\s*<!-- GH_ROOT_FALLBACK_START -->[\s\S]*?<!-- GH_ROOT_FALLBACK_END -->/g,
            '',
          );
        },
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
          const docsDir = path.resolve(__dirname, 'docs');
          const publicBuiltDir = path.resolve(__dirname, 'public/undangan');
          if (fs.existsSync(distDir)) {
            fs.rmSync(docsDir, {recursive: true, force: true});
            fs.cpSync(distDir, docsDir, {recursive: true, force: true});
            fs.rmSync(publicBuiltDir, {recursive: true, force: true});
            fs.cpSync(distDir, publicBuiltDir, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
