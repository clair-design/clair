const media = {
  xs: '(max-width: 600px)',
  sm: '(min-width: 601px) and (max-width: 900px)',
  md: '(min-width: 901px) and (max-width: 1200px)',
  lg: '(min-width: 1201px) and (max-width: 1920px)',
  xl: '(min-width: 1921px) and (max-width: 2560px)',
  xxl: '(min-width: 2561px)'
}

const mediaArray = /*@__PURE__*/ Object.entries(media)

type MediaQueryItem = [string, MediaQueryList]
// assigned later for SSR support
// since no window available for server side
let mediaQueryLists: MediaQueryItem[] = []
const getMediaQueryLists = () =>
  mediaArray.map<MediaQueryItem>(([size, mediaQuery]) => [
    size,
    window.matchMedia(mediaQuery)
  ])

type CCustomEvent = Pick<CustomEvent<{ size: string }>, 'detail'>

type Listener = (e: (MediaQueryListEvent & CCustomEvent) | CCustomEvent) => void

let queue: Listener[] = []

export const listenToMediaQuery = (callback: Listener) => {
  if (!queue.includes(callback)) {
    queue.push(callback)
  }
  if (!mediaQueryLists.length) {
    mediaQueryLists = getMediaQueryLists()
    mediaQueryLists.forEach(([size, mediaQueryList]) => {
      mediaQueryList.addListener(e => {
        if (e.matches) {
          queue.forEach(cb =>
            cb({
              ...e,
              detail: {
                size
              }
            })
          )
        }
      })
    })
  }
  // invoke callback for the first call
  mediaQueryLists.forEach(([size, mediaQueryList]) => {
    if (mediaQueryList.matches) {
      callback({ detail: { size } })
    }
  })
  // provide a way to remove listener
  return {
    removeListener() {
      queue = queue.filter(cb => cb !== callback)
    }
  }
}
