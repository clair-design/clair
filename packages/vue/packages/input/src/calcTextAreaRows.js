const CONTAINER_STYLE = {
  visibility: 'hidden',
  position: 'absolute',
  zIndex: -1,
  top: 0,
  minHeight: 'auto',
  maxHeight: 'none',
  overflowY: 'auto',
  height: 'auto'
}

export default function calcTextAreaRows(
  targetEl,
  minRows = 1,
  maxRows = null
) {
  const hiddenTextareaNode = targetEl.cloneNode()
  // 覆盖样式
  Object.assign(hiddenTextareaNode.style, CONTAINER_STYLE)
  document.body.appendChild(hiddenTextareaNode)

  // ! 重要 确保样式的基准是 “1行” 的 textarea
  hiddenTextareaNode.setAttribute('rows', 1)

  const style = getComputedStyle(hiddenTextareaNode)
  const [lineHeight, paddingTop, paddingBottom] = [
    'line-height',
    'padding-top',
    'padding-bottom'
  ].map(property => Number(style.getPropertyValue(property).replace(/px$/, '')))

  hiddenTextareaNode.value = targetEl.value || targetEl.placeholder || ''

  const height = hiddenTextareaNode.scrollHeight - paddingTop - paddingBottom

  // 当前内容 究竟占用了多少行
  let rows = Math.ceil(height / lineHeight)

  if (minRows !== null) {
    rows = Math.max(minRows, rows)
  }

  if (maxRows !== null) {
    rows = Math.min(rows, maxRows)
  }

  hiddenTextareaNode.parentNode &&
    hiddenTextareaNode.parentNode.removeChild(hiddenTextareaNode)

  return rows
}
