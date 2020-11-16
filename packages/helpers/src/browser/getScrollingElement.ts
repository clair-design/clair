// https://imququ.com/post/document-scrollingelement-in-chrome.html
export function getScrollingElement() {
  return <HTMLElement>(document.scrollingElement || document.body)
}
