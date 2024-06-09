import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'sounds/*',
          dest: 'sounds'
        },
        {
          src: 'images/*',
          dest: 'images'
        },
        {
          src: 'serviceWorker.js',
          dest: ''
        },
      ]
    })
  ]
});
