import Vue from 'vue'
import { mount } from '@vue/test-utils'
import directive from './directive'
Vue.use(directive)

describe('[v-loading]', () => {
  it('should work with boolean value', async () => {
    const Demo = {
      data() {
        return {
          loading: false
        }
      },
      render() {
        return (
          <div class="loading" v-loading={this.loading}>
            loading
          </div>
        )
      }
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-mask').element).toBeFalsy()
    wrapper.setData({
      loading: true
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-mask').element).toBeTruthy()
  })

  it('should work with options', async () => {
    const customClass = 'test'
    const Demo = {
      data() {
        return {
          options: {
            customClass
          },
          loading: true
        }
      },
      template: `
        <div v-loading:[options]="loading">test</div>
      `
    }
    const wrapper = mount(Demo)
    await Vue.nextTick()
    expect(wrapper.find('.c-loading-mask').classes(customClass)).toBe(true)
  })
})
