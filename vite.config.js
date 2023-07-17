
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    base: '/vite-popup-jsapp/',
    plugins: [
        copy({
          targets: [
            {src: 'node_modules/@esri/calcite-components/dist/calcite/assets/', dest: 'public/'}
          ]
        })
    ]
});