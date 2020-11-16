export const waitFrames = (callback, frames = 1) => {
  if (frames === 0) {
    return callback()
  }
  requestAnimationFrame(() => waitFrames(callback, frames - 1))
}
