import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';


export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: "../distributable"
  },
  root: "source",
});

console.log()
