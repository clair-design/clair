module.exports = {
  extends: [
    '@commitlint/config-lerna-scopes',
    '@commitlint/config-conventional'
  ],
  // Overrides `@commitlint/config-conventional`, because
  // `cz-lerna-changelog`'s default questions are slightly
  // different from that of `cz-conventional-changelog`.
  // We can also override other rules: http://t.cn/EM2aRQs
  rules: {
    // fix `WIP`
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'WIP'
      ]
    ]
  }
}
