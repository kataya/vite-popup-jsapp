
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

// https://qiita.com/tat_mae084/items/4051c61926dc8165e80b
export default defineConfig({
    base: process.env.GITHUB_PAGES 
        ? "/vite-popup-jsapp/"
        : "./" ,
    plugins: [
        copy({
          targets: [
            {src: 'node_modules/@esri/calcite-components/dist/calcite/assets/', dest: 'public/'}
          ]
        })
    ]
});