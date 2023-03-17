import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'

export default {
  input: 'src/lambda/index.ts',
  output: {
    file: 'lambda-package/index.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    typescript(),
    json(),
    commonjs(),
    resolve(),
    terser()
  ]
};