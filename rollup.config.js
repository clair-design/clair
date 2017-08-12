import postcss from 'rollup-plugin-postcss'
import rollupVue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import cssnext from 'postcss-cssnext'
import cssimport from 'postcss-import'
import postcssfor from 'postcss-for'

const targets = [
  { dest: `dist/js/clair.js`, format: 'umd' },
  { dest: `dist/js/clair.common.js`, format: 'cjs' },
  { dest: `dist/js/clair.esm.js`, format: 'es' }
]
const postCSSPlugins = [
  cssimport(),
  postcssfor(),
  cssnext()
]

export default [
  // clair Vue components
  {
    sourceMap: true,
    useStrict: true,
    moduleName: 'Clair',
    entry: 'src/js/main.js',
    targets,
    plugins: [
      rollupVue(),
      postcss({
        plugins: postCSSPlugins,
        extract: `dist/css/clair.css`
      })
    ]
  },

  // clair design system website
  {
    entry: 'src/js/main.js',
    dest: 'document/assets/clair.bundle.js',
    format: 'es',
    moduleName: 'Clair',
    plugins: [
      resolve(),
      rollupVue(),
      postcss({
        plugins: postCSSPlugins,
        extract: 'document/assets/clair.bundle.css'
      })
    ]
  }
]
