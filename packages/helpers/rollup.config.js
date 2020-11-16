import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  plugins: [
    typescript({
      cacheRoot: '.rpt2_cache',
      tsconfig: './tsconfig.json',
      typescript: require('typescript')
    })
  ],
  output: [
    {
      format: 'es',
      file: pkg.module
    },
    {
      name: 'ClairHelpers',
      format: 'umd',
      file: pkg.main
    }
  ]
}
