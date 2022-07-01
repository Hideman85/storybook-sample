import * as path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { UserConfig } from 'vite';

// https://vitejs.dev/config/
const config: UserConfig = {
  define: {
    // 'process.env': process.env,
  },
  server: {
    port: 3005,
  },
  preview: {
    port: 3006,
  },
  plugins: [
    react({
      babel: {
        configFile: true,
      },
      exclude: /node_modules/,
    }),
    process.env.NODE_ENV === 'production' &&
      visualizer({
        filename: `dist/stats_treemap_${new Date().toISOString()}.html`,
        open: false,
        template: 'treemap',
        gzipSize: true,
      }),
    process.env.NODE_ENV === 'production' &&
      visualizer({
        filename: `dist/stats_network_${new Date().toISOString()}.html`,
        open: false,
        template: 'network',
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '#app': path.resolve(__dirname, './packages/app/src'),
    },
  },
  clearScreen: false,
  envDir: path.resolve(__dirname, '.env'),
  cacheDir: path.resolve(__dirname, 'node_modules/.vite'),
};

// eslint-disable-next-line import/no-default-export
export default config;
