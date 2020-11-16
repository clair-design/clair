import Vue from 'vue'
import { mount, createWrapper } from '@vue/test-utils'
import Select from './index'
import Option from './option'
import Group from './group'

describe('[Select] basics', () => {
  const wrapper = mount(Select, {
    propsData: {
      value: '测试'
    }
  })
  it('is created correctly', () => {
    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(wrapper.vm.value).toBe('测试')
    expect(wrapper.find('.c-select').element).toBeTruthy()
    expect(wrapper.find('.c-select--normal').element).toBeTruthy()
    expect(dropdown.querySelector('.c-select__option--empty').innerHTML).toBe(
      '无数据'
    )
    expect(dropdown.querySelectorAll('.c-select__option--empty').length).toBe(1)
  })
  it('default props', () => {
    expect(wrapper.props('disabled')).toBeFalsy()
    expect(wrapper.props('multiple')).toBeFalsy()
    expect(wrapper.props('placeholder')).toBe('请选择')
    expect(wrapper.props('filterable')).toBeFalsy()
    expect(wrapper.props('loading')).toBeFalsy()
    expect(wrapper.props('loadingText')).toBe('加载中')
  })
  it('keyboard event', () => {
    expect(wrapper.vm.isOpen).toBeFalsy()
    wrapper.find('.c-input').trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()
    wrapper.find('.c-input').trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.vm.isOpen).toBeFalsy()

    wrapper.find('.c-select').trigger('keydown.enter')
    wrapper.find('.c-select').trigger('keydown.esc')
    expect(wrapper.vm.isOpen).toBeFalsy()
    wrapper.find('.c-select').trigger('keydown', { code: 'Space' })
    expect(wrapper.vm.isOpen).toBeTruthy()
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[select] disabled', () => {
  const wrapper = mount(Select, {
    propsData: {
      value: '测试',
      disabled: true
    }
  })
  it('disabled select', () => {
    expect(wrapper.vm.isOpen).toBeFalsy()
    wrapper.find('.c-select').trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Select] with option', () => {
  const demo = {
    data() {
      return {
        showOption: true,
        value: '桃子'
      }
    },
    render(h) {
      return (
        <Select vModel={this.value} ref="select">
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option>鸭梨</Option>
          <Option disabled>苹果</Option>
          {this.showOption && <Option>樱桃</Option>}
        </Select>
      )
    }
  }
  const app = mount(demo)
  const { select } = app.vm.$refs
  const wrapper = createWrapper(select)

  it('option create', () => {
    const optionLength = 5

    expect(wrapper.find('.c-select').element).toBeTruthy()
    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(dropdown.querySelectorAll('.c-select__option').length).toBe(
      optionLength
    )
    expect(
      dropdown.querySelector('.c-select__option--disabled').innerHTML
    ).toBe('苹果')
    expect(
      dropdown.querySelector('.c-select__option--selected').innerHTML
    ).toBe('桃子')
  })
  it('option keyboard event', async () => {
    const dropdown = document.body.querySelector('.c-select__dropdown')

    wrapper.find('.c-select').trigger('keydown', { code: 'Space' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('桃子')
    wrapper.find('.c-select').trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(dropdown.querySelector('.c-select__option--active')).toBeTruthy()
    wrapper.find('.c-select').trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('樱桃')
    wrapper.find('.c-select').trigger('keydown', { code: 'ArrowDown' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('樱桃')
    wrapper.find('.c-select').trigger('keydown', { code: 'ArrowUp' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('鸭梨')
    wrapper.find('.c-select').trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(select.value).toBe('鸭梨')

    const option = dropdown.querySelector('.c-select__option')
    option.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    expect(select.value).toBe('葡萄')
    option.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('葡萄')

    const disabledOption = dropdown.querySelector('.c-select__option')
    disabledOption.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    expect(select.value).toBe('葡萄')
    disabledOption.dispatchEvent(
      new MouseEvent('mouseenter', { bubbles: true })
    )
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('葡萄')
  })
  it('should remove last option', async () => {
    app.setData({ showOption: false })
    await Vue.nextTick()
    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(dropdown.querySelectorAll('.c-select__option').length).toBe(4)
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Multiple Select] with option', () => {
  const demo = {
    data() {
      return {
        value: ['葡萄', 1]
      }
    },
    render(h) {
      return (
        <Select vModel={this.value} multiple={true} ref="select">
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option value={1}>鸭梨</Option>
          <Option value={0} disabled>
            苹果
          </Option>
          <Option value={[1]}>樱桃</Option>
        </Select>
      )
    }
  }
  const app = mount(demo)
  const { select } = app.vm.$refs
  it('multiple option create', async () => {
    const selectedOptionLength = 2

    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(
      dropdown.querySelectorAll('.c-select__option--selected').length
    ).toBe(selectedOptionLength)
    const option = dropdown.querySelector('.c-select__option')
    option.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    expect(select.value.length).toBe(1)
    option.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Vue.nextTick()
    expect(select.value.length).toBe(selectedOptionLength)
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Group Select] with option', () => {
  const demo = {
    data() {
      return {
        value: ['葡萄', [1]]
      }
    },
    render(h) {
      return (
        <Select vModel={this.value} multiple={true} ref="select">
          <Group title="分组1">
            <Option>葡萄</Option>
            <Option>桃子</Option>
          </Group>
          <Group title="分组1">
            <Option>鸭梨</Option>
            <Option>苹果</Option>
          </Group>
        </Select>
      )
    }
  }
  mount(demo).vm.$refs
  it('group create', () => {
    const groupLength = 2

    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(
      dropdown.querySelectorAll('.c-select__option-group__title').length
    ).toBe(groupLength)
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Clearable Select] with option', () => {
  const demo = {
    data() {
      return {
        value: '桃子'
      }
    },
    render(h) {
      return (
        <Select vModel={this.value} ref="select" clearable={true}>
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option>樱桃</Option>
        </Select>
      )
    }
  }
  const { select } = mount(demo).vm.$refs
  const wrapper = createWrapper(select)

  it('clearable props', () => {
    wrapper.find('.c-select').trigger('mouseenter')
    expect(wrapper.vm.shouldShowClearIcon).toBeTruthy()
    wrapper.find('.c-icon--svg').trigger('click')
    // expect(wrapper.vm.value.length).toBe(0)
    wrapper.find('.c-select').trigger('mouseleave')
    expect(wrapper.vm.shouldShowClearIcon).toBeFalsy()
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Filterable Select] with option', () => {
  const demo = {
    render(h) {
      return (
        <Select value="桃子" ref="select" filterable={true}>
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option>樱桃</Option>
        </Select>
      )
    }
  }
  const { select } = mount(demo).vm.$refs
  const wrapper = createWrapper(select)

  it('filterable props', async () => {
    wrapper.find('.c-input').trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.filtering).toBeTruthy()
    const input = wrapper.find('.c-input')
    input.element.value = 't'
    input.trigger('input')
    await Vue.nextTick()
    const dropdown = document.body.querySelector('.c-select__dropdown')
    expect(dropdown.querySelectorAll('.c-select__option--empty').length).toBe(1)
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Filter Select] with function', () => {
  const demo = {
    render(h) {
      return (
        <Select value="桃子" ref="select" filterable={true}>
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option>樱桃</Option>
        </Select>
      )
    }
  }
  const { select } = mount(demo).vm.$refs
  const wrapper = createWrapper(select)

  it('filter props', () => {
    wrapper.find('.c-select').trigger('click')
    const input = wrapper.find('.c-input')
    input.element.value = 't'
    input.trigger('input')
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Select] with option', () => {
  const demo = {
    render(h) {
      return (
        <div>
          <Select>
            <Option />
          </Select>
          <Select multiple>
            <Option />
          </Select>
        </div>
      )
    }
  }
  const backupConsole = console.error
  beforeEach(() => {
    console.error = () => {}
  })
  it('error handler', () => {
    expect(() => mount(demo)).toThrow()
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
    console.error = backupConsole
  })
})
describe('[Select] same value can not emit change event', () => {
  const changeFn = jest.fn()
  const demo = {
    data() {
      return {
        value: '桃子'
      }
    },
    render(h) {
      return (
        <Select vModel={this.value} ref="select" onchange={changeFn}>
          <Option>葡萄</Option>
          <Option>桃子</Option>
          <Option>鸭梨</Option>
        </Select>
      )
    }
  }
  const app = mount(demo)
  const { select } = app.vm.$refs
  const wrapper = createWrapper(select)

  it('select with option', () => {
    wrapper.find('.c-select').trigger('keydown', { code: 'Space' })
    expect(select.activeOption._label).toBe('桃子')
    wrapper.find('.c-select').trigger('keydown', { code: 'Enter' })
    expect(changeFn).toHaveBeenCalledTimes(0)
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
describe('[Select] reactive option slot', () => {
  const demo = {
    data() {
      return {
        value: '',
        options: new Array(5).fill(0).map((_, index) => {
          return {
            value: index
          }
        })
      }
    },
    methods: {
      update() {
        this.options = this.options.map(item => {
          return {
            value: item.value + 10
          }
        })
      }
    },
    render(h) {
      const options = this.options.map((item, index) => (
        <Option value={item.value} key={index}>
          选项{item.value}
        </Option>
      ))
      return (
        <Select vModel={this.value} ref="select">
          {options}
        </Select>
      )
    }
  }
  const app = mount(demo)
  const { select } = app.vm.$refs
  const wrapper = createWrapper(select)

  it('select with option', async () => {
    wrapper.find('.c-select').trigger('keydown', { code: 'Space' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('选项0')
    wrapper.find('.c-select').trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(select.value).toBe(0)
    // update后重新选中
    app.vm.update()
    wrapper.find('.c-select').trigger('keydown', { code: 'Space' })
    await Vue.nextTick()
    expect(select.activeOption._label).toBe('选项10')
    wrapper.find('.c-select').trigger('keydown', { code: 'Enter' })
    await Vue.nextTick()
    expect(select.displayValue).toBe('选项10')
  })
  afterAll(() => {
    const box = document.body.querySelector('.c-select__dropdown')
    box.remove()
  })
})
