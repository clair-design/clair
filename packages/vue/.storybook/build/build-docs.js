const { readFile, writeFile, ensureFile, emptyDir } = require('fs-extra')
const { resolve, basename, dirname, join } = require('path')
const globby = require('globby')

const { promisify } = require('util')
const option = require('./md2vue-option')

const md2vueP = promisify(require('md2vue'))
const absp = (...args) => resolve(__dirname, ...args)

;(async function main() {
  const output = absp('../dist')

  const opt = { cwd: __dirname }
  const compDocs = await globby(absp('../../packages/**/README.md'), opt)
  const restDocs = await globby(absp('../../docs/*.md'), opt)

  const configs = [...restDocs, ...compDocs].map(fullPath => {
    let filename = basename(fullPath, '.md')

    if (filename === 'README') {
      filename = basename(dirname(fullPath))
    }

    return {
      entry: fullPath,
      outputPath: join(output, `${filename}.js`)
    }
  })

  await emptyDir(output)
  await Promise.all(configs.map(compile))
})()

async function compile({ entry, outputPath }) {
  const file = { path: entry, contents: await readFile(entry, 'utf-8') }

  try {
    const res = await md2vueP(file, option)
    const data = res.data.frontmatter || {}

    // FIXME
    // 临时调整
    const contents = res.contents.split(/\n/)
    contents[0] = `const styleInject = require('md2vue/lib/styleInject.js');`
    contents[1] = contents[1].replace(/(\\n){2,}/g, '\\n')

    await ensureFile(outputPath)
    await writeFile(
      outputPath,
      [
        ...contents,
        `module.exports.group = ${JSON.stringify(data.group)}`,
        `module.exports.description = ${JSON.stringify(data.heading)}`
      ].join('\n')
    )
  } catch (e) {
    console.error(e)
  }
}
