const defaultOptions = {
  text: '',
  target: 'body',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  customClass: '',
  visible: true,
  size: 'large'
}
export function assembleOptions(options, el) {
  const combinedOption = Object.assign({}, defaultOptions, options)
  let targetDom = document.querySelector(combinedOption.target)
  if (combinedOption.target === 'body') {
    combinedOption.top = 0
    combinedOption.left = 0
    if (combinedOption.visible) {
      targetDom.classList.add(
        'c-loading-container--relative',
        'c-loading-container--hidden'
      )
    }
  } else {
    targetDom = el || targetDom
    const { position } = getComputedStyle(targetDom)
    combinedOption.top = targetDom.scrollTop
    combinedOption.left = targetDom.scrollLeft
    if (combinedOption.visible) {
      if (position === 'static') {
        targetDom.classList.add(
          'c-loading-container--relative',
          'c-loading-container--hidden'
        )
      } else {
        targetDom.classList.add('c-loading-container--hidden')
      }
    }
  }
  combinedOption.targetDom = targetDom
  return combinedOption
}
