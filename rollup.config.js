import postcss from 'rollup-plugin-postcss'
import rollupVue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import cssnext from 'postcss-cssnext'
import cssimport from 'postcss-import'
import postcssfor from 'postcss-for'

const isRelease = process.env.release
const distDir = isRelease ? 'dist' : 'docs/resources'
const targets = [
  { dest: `${distDir}/js/clair.js`, format: 'umd' },
  { dest: `${distDir}/js/clair.common.js`, format: 'cjs' },
  { dest: `${distDir}/js/clair.esm.js`, format: 'es' }
]

export default [

  // clair Vue components
  {
    sourceMap: true,
    useStrict: true,
    moduleName: 'Clair',
    entry: 'src/js/main.js',
    targets: isRelease ? targets : targets.slice(0, 1),
    plugins: [
      rollupVue(),
      postcss({
        plugins: [ cssimport(), postcssfor(), cssnext() ],
        extract: `${distDir}/css/clair.css`
      })
    ]
  },

  // clair design system website
  {
    entry: 'docs/src/js/main.js',
    dest: `docs/resources/js/main.js`,
    format: 'iife',
    plugins: [
      resolve(),
      rollupVue(),
      postcss({
        plugins: [ cssimport(), postcssfor(), cssnext() ],
        extract: `docs/resources/css/main.css`
      })
    ]
  }

]
