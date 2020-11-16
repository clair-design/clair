import { mount } from '@vue/test-utils'
import Empty from './index'

describe('Empty', () => {
  it('should be large when set props large size', () => {
    const wrapper = mount(Empty, {
      propsData: {
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('c-empty--large')
  })

  it('could be set with custom description', () => {
    const wrapper = mount(Empty, {
      propsData: {
        description: 'Custom description'
      }
    })
    expect(wrapper.find('.c-empty__description').text()).toBe(
      'Custom description'
    )
  })

  it('could be set with custom image style', () => {
    const wrapper = mount(Empty, {
      propsData: {
        imgStyle: {
          width: '200px'
        }
      }
    })
    expect(wrapper.find('.c-empty__img').attributes().style).toBe(
      'width: 200px;'
    )
  })
})
