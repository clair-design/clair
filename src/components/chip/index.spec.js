import { shallowMount } from '@vue/test-utils'
import Chip from './index.vue'

it('should use props.label as content', () => {
  const wrapper = shallowMount(Chip, {
    propsData: {
      label: 'label text'
    }
  })

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.text().trim()).toEqual('label text')
})

it('should use slots.default as label value', () => {
  const wrapper = shallowMount(Chip, {
    slots: {
      default: ['test']
    }
  })
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.text().trim()).toEqual('test')
})

it('should contain a built-in class when using preset color', () => {
  const wrapper = shallowMount(Chip, {
    propsData: {
      color: 'red',
      label: 'lorem ipsum...'
    }
  })

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.classes()).toContain('c-chip--red')
})

it('should set backgroundColor when using custom color', () => {
  const wrapper = shallowMount(Chip, {
    propsData: {
      color: 'rgba(200,0,0,.5)',
      label: 'lorem ipsum...'
    }
  })

  expect(wrapper).toMatchSnapshot()

  // Be careful!
  // note that color values in `:style` binding would be
  // normalized by testing tool
  const bgcolor = wrapper.element.style.backgroundColor
  expect(bgcolor).toEqual('rgba(200, 0, 0, 0.5)')

  expect(wrapper.vm.styleObj).toEqual({
    backgroundColor: 'rgba(200,0,0,.5)'
  })
})

it('should render <chip /> in different sizes', () => {
  const validSizes = ['xs', 'sm', 'md', 'lg', 'xl']
  validSizes.forEach(size => {
    const wrapper = shallowMount(Chip, {
      propsData: {
        size,
        label: 'lorem ipsum...'
      }
    })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.classes()).toContain(`is-${size}`)
  })
})

it('should render <chip closable /> with a close icon', () => {
  const wrapper = shallowMount(Chip, {
    propsData: {
      closable: true,
      label: 'lorem ipsum...'
    }
  })
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('.c-icon svg')).toBeTruthy()
})
