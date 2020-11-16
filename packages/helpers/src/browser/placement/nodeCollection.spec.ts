import { NodeCollection } from './nodeCollection'

describe('[NodeCollection]', () => {
  it('should invoke callback passed to `displayEffect`', () => {
    const self = document.createElement('div')
    const ref = document.createElement('div')
    const parent = document.body
    const nc = new NodeCollection(self, ref, parent)
    let count = 0
    nc.displayEffect(nc.self, () => {
      count++
    })
    expect(count).toBe(1)
  })

  it('should invoke callback passed to `displayEffect` with specified element', () => {
    const self = document.createElement('div')
    const ref = document.createElement('div')
    const parent = document.body
    const nc = new NodeCollection(self, ref, parent)

    nc.displayEffect(nc.self, element => {
      expect(element).toBe(nc.self)
    })
  })

  it('should return proper rect', () => {
    const self = document.createElement('div')
    const ref = document.createElement('div')
    const parent = document.body
    const nc = new NodeCollection(self, ref, parent)
    // mimic `getBoundingClientRect`
    // @ts-ignore
    nc.self.getBoundingClientRect = () => {
      return {
        left: 1
      }
    }
    expect(nc.selfRect.left).toBe(1)
  })
})
