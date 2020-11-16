import flow from 'lodash/flow'
import curry from 'lodash/curry'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import partialRight from 'lodash/partialRight'
import { message, warn, danger } from 'danger'
import { build } from './bin/build'
import { preview } from './packages/sites/bin/preview'

const IS_TARGET_MASTER = danger.gitlab.mr.target_branch === 'master'

// pass through arg while execute side effects
function passThrough<T = any>(sideEffect: Function, arg: T): T {
  sideEffect(arg)
  return arg
}

class AsyncIO {
  public value!: Promise<any>

  constructor(value: any) {
    this.value = Promise.resolve(value)
  }

  static of(value: any) {
    return value instanceof AsyncIO ? value : new AsyncIO(value)
  }

  map(fn: Function) {
    return AsyncIO.of(this.value.then(v => fn(v)))
  }
}

function asyncFlow<T = any>(fns: Function[]) {
  return function asyncFlowInternal(arg: T) {
    let result: AsyncIO = AsyncIO.of(arg)
    for (const fn of fns) {
      result = result.map(fn)
    }
    return result
  }
}

// side effects
// save input string in array
function accString(startStr: string = '') {
  const acc: string[] = [startStr]
  return function addStringToAcc(str: string = '') {
    acc.push(str)
    return acc
  }
}

function join(sep: string, strList: string[]) {
  return strList.join(sep)
}

function callIfTruthy(fn: Function, arg: any) {
  if (Boolean(arg)) {
    fn(arg)
  }
}

function trim(input: string) {
  return input.trim()
}

const cJoin = curry(join)
const cPassThrough = curry(passThrough)
const cCallIfTruthy = curry(callIfTruthy)
const messageIfTruthy = cCallIfTruthy(message)

function createMarkdownList(list: string[]) {
  return list
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => `- ${item}\n`)
    .join('')
}

const vueFiles = danger.git.fileMatch('*/vue/**/*.{js,md}')
const reactFiles = danger.git.fileMatch('*/react/**/*.{ts,tsx,md,mdx}')
const themeDefaultFiles = danger.git.fileMatch(
  '*/theme-default/**/*.{scss,html}'
)
const helpersFiles = danger.git.fileMatch('*/helpers/**/*.ts')
const iconsFiles = danger.git.fileMatch('*packages/icons/icons/**/*.ts')
const sitesFiles = danger.git.fileMatch('*packages/sites/**/*.*')
const scopes = {
  vue: vueFiles,
  react: reactFiles,
  themeDefault: themeDefaultFiles,
  helpers: helpersFiles,
  icons: iconsFiles,
  sites: sitesFiles
} as const

const editedScopes: string[] = []
Object.entries(scopes).forEach(([scope, files]) => {
  if (files.edited) {
    editedScopes.push(scope)
  }
})

const editFileAcc = accString()

const addEditedFilesHeader = cPassThrough((files: string[]) => {
  if (files.length) {
    editFileAcc(`**Edited files are:**`)
  }
})
const printEditedFiles = flow([
  addEditedFilesHeader,
  createMarkdownList,
  editFileAcc,
  cJoin('\n'),
  trim,
  messageIfTruthy
])

const affectedScopeAcc = accString()
const addAffectedScopeHeader = cPassThrough((scopes: string[]) => {
  if (scopes.length) {
    affectedScopeAcc(`**Affected scopes are:**`)
  }
})
const printAffectedScopes = flow([
  addAffectedScopeHeader,
  createMarkdownList,
  affectedScopeAcc,
  cJoin('\n'),
  trim,
  messageIfTruthy
])

type Commits = typeof danger.gitlab.commits
const filterOutCommitsHaveRelatedIssues = (commits: Commits) =>
  commits.filter(({ message }) => {
    return /ISSUES? CLOSED/.test(message)
  })

const filterOutIssuesFromCommits = (commits: Commits) =>
  commits.map(({ message }) => {
    const [_, issues = ''] = message.match(/ISSUES? CLOSED:\s*([^\n]+)/) ?? []
    return issues.trim().split(' ')
  })

// make sure no repeated issues are printed
const unifiedIssues = (issues: string[]): string[] => {
  const set = new Set(issues)
  return Array.from(set)
}

const getIssues = flow([
  filterOutCommitsHaveRelatedIssues,
  filterOutIssuesFromCommits,
  flatten,
  unifiedIssues
])

const issuesAcc = accString()
const addIssuesHeader = cPassThrough((issues: string[]) => {
  if (issues.length) {
    issuesAcc('**Related issues are:**')
  }
})

const warnIfNoIssues = cPassThrough((issues: string[]) => {
  if (!issues.length) {
    warn('**No related issue was found**, which is probably a bad thing')
  }
})
const printIssues = flow([
  getIssues,
  warnIfNoIssues,
  addIssuesHeader,
  createMarkdownList,
  issuesAcc,
  cJoin('\n'),
  trim,
  messageIfTruthy
])

const sites = ['vue', 'react']

// based on edited scopes, gather sites to be previewed
// TODO: probably should preview sites as long as there is scope change
const getPreviewSites = (scopes: string[]) => {
  const siteToBePreviewed = []
  for (let scope of scopes) {
    // impure
    if (sites.includes(scope)) {
      siteToBePreviewed.push(scope)
    }
  }
  return siteToBePreviewed
}

type Site = string
type Url = string
type PreviewResult = [Site, Url] | void
type ValidPreviewResult = Exclude<PreviewResult, void>

const asyncPreBuildInternalDepsInSerial = async (sites: string[]) => {
  await build(sites)
  return sites
}

const asyncGetPreviewUrlForSite = async (
  site: string
): Promise<PreviewResult> => {
  // impure
  if (sites.includes(site)) {
    try {
      const url = await preview(`uxc-${site}`)
      if (typeof url === 'string') {
        return [site, url]
      }
    } catch (e) {
      return void 0
    }
  }
}

function waitForAllPreviewsDone(previewResults: Promise<PreviewResult>[]) {
  return Promise.all(previewResults)
}

const generateUrlMessages = (urls: PreviewResult[]) => {
  return (urls.filter(Boolean) as ValidPreviewResult[]).map(([site, url]) => {
    return `You can preview **${site} site** in this 👉[**🔗URL**](${url})`
  })
}

const pickUpMessage = (messageList: string) => {
  if (messageList) {
    return `**Preview links are:**\n${messageList}`
  }
}

const printUrlMessages = flow([
  createMarkdownList,
  trim,
  pickUpMessage,
  messageIfTruthy
])

const printPreviewUrl = flow([
  getPreviewSites,
  asyncFlow([
    asyncPreBuildInternalDepsInSerial,
    partialRight(map, asyncGetPreviewUrlForSite),
    waitForAllPreviewsDone,
    generateUrlMessages,
    printUrlMessages
  ])
])

const getMRAssignee = () => danger.gitlab.mr.assignee
const warnIfNoAssignee = (assignee?: string) => {
  if (!assignee) {
    warn('Please assign someone to review this mr')
  }
}

const printAssigneeIssue = flow([getMRAssignee, warnIfNoAssignee])

printAssigneeIssue()
printEditedFiles([...danger.git.created_files, ...danger.git.modified_files])
printAffectedScopes(editedScopes)
printIssues(danger.gitlab.commits)

const conditionsToPreviewBothSites = [
  ['icons', 'helpers', 'sites', 'themeDefault'].some(scope =>
    editedScopes.includes(scope)
  ),
  IS_TARGET_MASTER
]
// preview both sites
if (conditionsToPreviewBothSites.some(condition => condition)) {
  printPreviewUrl(sites)
} else {
  printPreviewUrl(editedScopes)
}
