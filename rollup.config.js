import postcss from 'rollup-plugin-postcss'
import rollupVue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import cssnext from 'postcss-cssnext'
import cssimport from 'postcss-import'
import postcssfor from 'postcss-for'

const isRelease = process.env.release
const distDir = isRelease ? 'dist' : 'docs/resources'

export default [

  // clair Vue components
  {
    entry: 'src/js/main.js',
    dest: `${distDir}/js/clair.js`,
    moduleName: 'Clair',
    format: 'umd',
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
