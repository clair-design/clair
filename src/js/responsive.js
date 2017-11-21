import { breakpoints } from './config.js'

export default function (Vue) {
  const responsive = new Vue({
    data: { media: breakpoints[0] }
  })

  // create an element to listen viewport change
  if (typeof window === 'object') {
    const element = document.createElement('div')
    element.className = 'c-responsive-listener'
    document.body.appendChild(element)
    const getMediaType = _ => {
      return breakpoints[element.clientWidth]
    }
    element.addEventListener('transitionend', e => {
      const oldMedia = responsive.media
      const media = getMediaType()
      if (oldMedia === media) return // no media change
      responsive.$emit('change', media, oldMedia)
      responsive.media = media
    })
    responsive.media = getMediaType()
  }

  return responsive
}
