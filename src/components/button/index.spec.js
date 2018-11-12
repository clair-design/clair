import { shallowMount, mount } from '@vue/test-utils'
import Button from './index.vue'

it('should works with different themes and flavors', () => {
  const snapshotTest = propsData => {
    const wrapper = shallowMount(Button, {
      propsData,
      slots: { default: 'My Button' }
    })
    expect(wrapper).toMatchSnapshot()
  }

  const themes = ['default', 'primary', 'success', 'warning', 'danger']
  const flavors = ['round', 'outline', 'flat']

  for (let theme of themes) {
    for (let flavor of flavors) {
      const propsData = {}
      if (theme !== 'default') {
        propsData[theme] = true
      }
      propsData[flavor] = true
      snapshotTest(propsData)
    }
  }
})

it('should works with feather icon', () => {
  const wrapper = mount(Button, {
    propsData: { icon: 'send' },
    slots: { default: 'My Button' }
  })
  expect(wrapper.find('svg')).toMatchSnapshot()
  expect(wrapper).toMatchSnapshot()
})

it('should emit event when clicked', () => {
  let clicked = false
  const wrapper = mount(Button, {
    slots: { default: 'My Button' },
    listeners: {
      click () {
        clicked = true
      }
    }
  })
  wrapper.trigger('click')
  expect(clicked).toBe(true)
  expect(wrapper).toMatchSnapshot()
})

it('could be disabled', () => {
  let clicked = false
  const wrapper = mount(Button, {
    propsData: { disabled: true },
    slots: { default: 'My Button' },
    listeners: {
      click () {
        clicked = true
      }
    }
  })

  wrapper.trigger('click')
  expect(clicked).toBe(false)

  expect(wrapper.find('button').attributes('disabled')).toBe('disabled')
  expect(wrapper).toMatchSnapshot()
})
