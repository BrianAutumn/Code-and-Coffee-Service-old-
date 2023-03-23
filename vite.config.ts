import { resolve, dirname } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/web/index.tsx"),
      name:'Index',
      fileName: "index",
    },
  },
  resolve:{
    alias:{
      'react': 'https://unpkg.com/react@18/umd/react.production.min.js',
      'react-dom': 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'
    }
  }
});
