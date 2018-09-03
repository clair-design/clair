/**
 * Base on: https://github.com/vuejs/vue/blob/dev/scripts/verify-commit-msg.js
 */
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?: (.{1,50})/

const errMsg =
  `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
  chalk.red(
    `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
  ) +
  `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
  `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
  chalk.red(`  See guides/COMMIT_CONVENTION.md for more details.\n`) +
  chalk.red(
    `  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`
  )

if (!commitRE.test(msg)) {
  console.log()
  console.error(errMsg)
  process.exit(1)
} else {
  if (checkMsgCase(msg) === false) {
    process.exit(1)
  }
}

function checkMsgCase (msg) {
  const startWithUpperCase = s => /^\s*[A-Z]/.test(s)

  const match = msg.match(commitRE)
  const scope = match[3].replace(/^\(|\)$/g, '') || 'scope'
  const subject = match[4]
  const messages = []

  if (startWithUpperCase(scope)) {
    messages.push(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid scope:`)} ${scope}`
    )
  }

  if (startWithUpperCase(subject)) {
    messages.push(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid subject:`)} ${subject}`
    )
  }

  if (messages.length) {
    console.log()
    messages.forEach(msg => console.error(msg))

    console.error(
      chalk.red(
        `\n  Either scope or subject should START with LOWER CASE letters.\n` +
          `  Proper commit message format is required for automated changelog generation. Examples:\n`
      ) +
        `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
        `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n`
    )
    return false
  }

  return true
}
