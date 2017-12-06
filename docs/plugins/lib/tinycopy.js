/**
 * create a temp textarea
 */
const createTextArea = () => {
  const elem = document.createElement('textarea')

  elem.style.width = 1
  elem.style.height = 0
  document.body.appendChild(elem)

  return elem
}

/**
 * exec copy command
 */
const execCopy = () => {
  try {
    document.execCommand('copy')
  } catch (e) {}
}

/**
 * copy from element
 */
const copyFromElement = elem => {
  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNode(elem)

  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }

  selection.addRange(range)
  execCopy()
  selection.removeAllRanges()
}

/**
 * copy from textarea
 */
const copyFromText = string => {
  const textArea = createTextArea()

  textArea.innerHTML = string
  textArea.focus()
  textArea.select()
  execCopy()
  setTimeout(() => document.body.removeChild(textArea))
}

const tinyCopy = (elem) => {
  // eslint-disable-next-line
  if (elem instanceof HTMLTextAreaElement) {
    elem.focus()
    elem.select()
    execCopy()
    return
  }

  // eslint-disable-next-line
  if (elem instanceof HTMLElement || elem === document) {
    elem = elem === document ? elem.documentElement : elem
    return copyFromElement(elem)
  }

  if (typeof elem === 'string') {
    copyFromText(elem)
  }
}

module.exports = tinyCopy
