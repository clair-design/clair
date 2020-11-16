import Vue from 'vue'
import { createPortal, destroyPortal } from './createPortal'
import { mount } from '@vue/test-utils'

const Demo = {
  render() {
    return (
      <div>
        <div>test portal</div>
        {createPortal(() => this.$scopedSlots.default(), this)}
      </div>
    )
  },
  destroyed() {
    destroyPortal(this)
  }
}

describe('createPortal', () => {
  it('should update slot reactively', async () => {
    const SlotComponent = {
      data() {
        return {
          content: oldContent
        }
      },
      render() {
        return <Demo>{this.content}</Demo>
      }
    }
    const oldContent = 'content'
    const newContent = 'new content'
    const wrapper = mount(SlotComponent)
    expect(document.body.lastChild.textContent).toBe(oldContent)
    wrapper.setData({
      content: newContent
    })
    await Vue.nextTick()
    expect(wrapper.vm.content).toBe(newContent)
    expect(document.body.lastChild.textContent).toBe(newContent)
    wrapper.vm.$destroy()
  })
})
