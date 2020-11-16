import { displayElement } from './displayElement'
import { Rect } from 'src/browser/placement/types'

interface Ref<T = any> {
  current: null | T
}

type DisplayFunction = typeof displayElement

export interface RectCollection {
  selfRect: Rect
  refRect: Rect
  parentRect: Rect
}

interface ElementCollection {
  self: HTMLElement
  ref: HTMLElement
  parent: HTMLElement
}

export type NodeCollectionType = RectCollection & ElementCollection

// Instead of passing around multiple HTMLElements,
// initiate NodeCollection and only pass around its instance,
// which holds the reference to those HTMLElements and has some helper functions
export class NodeCollection implements NodeCollectionType {
  display!: DisplayFunction
  constructor(
    public self: HTMLElement,
    public ref: HTMLElement,
    public parent: HTMLElement
  ) {
    // default, can be overrode
    this.setDisplay(displayElement)
  }

  setDisplay(display: DisplayFunction) {
    this.display = display
  }

  displayEffect(element: HTMLElement, effect: (el?: HTMLElement) => any) {
    const { recover } = this.display(element)
    effect(element)
    recover()
  }

  private getRect(element: HTMLElement) {
    const ref: Ref = { current: null }
    this.displayEffect(element, () => {
      ref.current = element.getBoundingClientRect()
    })
    return ref.current
  }

  get selfRect() {
    return this.getRect(this.self)
  }

  get refRect() {
    return this.getRect(this.ref)
  }

  get parentRect() {
    return this.getRect(this.parent)
  }
}
