import { modalService } from '.'

describe('modalService', () => {
  it('should update mask properly after `onEnter`, `onLeave`, and `onAfterLeave`', () => {
    const div = document.createElement('div')
    modalService.onEnter(div)
    const mask = document.querySelector('.c-mask') as Element
    expect(mask).toBeTruthy()
    expect(mask.classList.contains('c-mask-active')).toBe(true)
    modalService.onLeave(div)
    expect(mask.classList.contains('c-mask-active')).toBe(false)
    expect(mask.classList.contains('c-mask-deactive')).toBe(true)
    modalService.onAfterLeave()
    expect(document.body.contains(mask)).toBe(false)
  })

  it('should handle modals with overlap lifecycle properly', () => {
    const modalA = document.createElement('div')
    const modalB = document.createElement('div')
    const modalC = document.createElement('div')
    modalService.onEnter(modalA)
    const mask = document.querySelector('.c-mask') as HTMLElement
    const zIndexA = mask.style.zIndex
    modalService.onEnter(modalB)
    const zIndexB = mask.style.zIndex
    // ! important
    modalService.onLeave(modalA)
    modalService.onAfterLeave()
    const zIndexAfterALeave = mask.style.zIndex
    expect(document.body.contains(mask)).toBe(true)
    modalService.onEnter(modalC)
    const zIndexC = mask.style.zIndex
    const maskList = document.querySelectorAll('.c-mask') as NodeList
    expect(maskList.length).toBe(1)
    expect(mask.classList.contains('c-mask-active')).toBe(true)
    // destroy modalC, now only modalB is left
    modalService.onLeave(modalC)
    modalService.onAfterLeave()
    const zIndexAfterCLeave = mask.style.zIndex
    expect(Number(zIndexB)).toBeGreaterThan(Number(zIndexA))
    expect(zIndexAfterALeave).toBe(zIndexB)
    expect(Number(zIndexC)).toBeGreaterThan(Number(zIndexB))
    expect(zIndexAfterCLeave).toBe(zIndexB)
    // clean up, destroy all modals
    modalService.onLeave(modalB)
    modalService.onAfterLeave()
  })

  it('`document.body` should be locked when modal appear and unlock after since', () => {
    const modalA = document.createElement('div')
    modalService.onEnter(modalA)
    expect(document.body.style.overflow).toBe('hidden')
    const modalB = document.createElement('div')
    modalService.onEnter(modalB)
    modalService.onLeave(modalA)
    modalService.onAfterLeave()
    expect(document.body.style.overflow).toBe('hidden')
    modalService.onLeave(modalB)
    modalService.onAfterLeave()
    expect(document.body.style.overflow).toBeFalsy()
  })
})
