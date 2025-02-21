import { defineConfig } from 'vite';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

export default defineConfig({
  plugins: [
    ViteSvgSpriteWrapper({
      icons: './src/icons/**/*.svg',
      outputDir: './public/',
    }),
  ],
});
