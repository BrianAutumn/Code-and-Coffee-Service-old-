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
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        }
      }
    },
  },
  resolve:{
    alias:{
      'react':'https://esm.sh/react@18.2.0',
      'react-dom':'https://esm.sh/react-dom@18.2.0'
    }
  }
});
