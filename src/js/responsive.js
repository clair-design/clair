import { breakpoints } from './config.js'

export default function (Vue) {
  // get media type from window width
  const getMedia = function () {
    const defaultWidth = 1200
    const width = typeof window === 'object' ? window.innerWidth : defaultWidth
    const media = breakpoints.find(b => width <= b.width)
    return media.name
  }

  const responsive = new Vue({
    data: { media: getMedia() }
  })

  // create an element to listen viewport change
  if (typeof window == 'object') {
    window.addEventListener('resize', e => {
      const media = getMedia()
      const oldMedia = responsive.media
      if (oldMedia === media) return // no media change
      responsive.$emit('change', media, oldMedia)
      responsive.media = media
    })
  }

  return { breakpoints, responsive }
}
