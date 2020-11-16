import { waitFrames } from './waitFrames'
// take slow cpu factor into consideration
const DELTA_IN_MS = 5
test('`waitFrames` functionality', async () => {
  const start = Date.now()
  return new Promise(resolve => {
    const count = 10
    const SECOND_IN_MIL = 1000
    const FRAMES_PER_SEC = 60
    const MIL_SEC_PER_FRAME = SECOND_IN_MIL / FRAMES_PER_SEC
    waitFrames(() => {
      const end = Date.now()
      const duration = end - start
      const MIL_SEC_PER_COUNT = duration / count
      expect(
        Math.abs(MIL_SEC_PER_COUNT - MIL_SEC_PER_FRAME) < DELTA_IN_MS
      ).toBe(true)
      resolve()
    }, count)
  })
})
