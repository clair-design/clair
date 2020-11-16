export function displayElement(element: HTMLElement) {
  const display = getComputedStyle(element).display
  const displayInInlineStyle = element.style.display
  const isHidden = display === 'none'
  if (isHidden) {
    element.style.display = 'block'
  }
  const recover = () => {
    if (isHidden) {
      element.style.display = displayInInlineStyle
    }
  }
  return {
    recover
  }
}
