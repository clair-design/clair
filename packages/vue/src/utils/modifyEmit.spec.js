import { mount } from '@vue/test-utils'
import Input from 'packages/input'
import { registerEmitDirective } from './modifyEmit'

registerEmitDirective()

describe('Modify emit', () => {
  it('should emit value only by default', () => {
    const onChange = jest.fn()
    const demo = {
      methods: {
        onChange
      },
      render() {
        return <Input v-emit onChange={this.onChange} />
      }
    }
    const wrapper = mount(demo)
    const input = wrapper.findComponent(Input)
    input.element.value = '1'
    input.trigger('change')
    expect(onChange).toBeCalledWith('1')
  })

  it('should not affect all events', () => {
    const onClick = jest.fn()
    const arg = 'test'
    const demoChild = {
      methods: {
        onClick() {
          this.$emit('click', arg)
        }
      },
      render() {
        return <div onClick={this.onClick}>test</div>
      }
    }
    const demo = {
      methods: {
        onClick
      },
      render() {
        return <demoChild onClick={this.onClick}></demoChild>
      }
    }
    const wrapper = mount(demo)
    const input = wrapper.findComponent(demoChild)
    input.trigger('click')
    expect(onClick).toBeCalledWith(arg)
  })

  it(`should be able to change directive's name`, () => {
    registerEmitDirective({
      name: 'test'
    })

    const onChange = jest.fn()
    const demo = {
      methods: {
        onChange
      },
      render() {
        return <Input v-test onChange={this.onChange} />
      }
    }
    const wrapper = mount(demo)
    const input = wrapper.findComponent(Input)
    input.element.value = '1'
    input.trigger('change')
    expect(onChange).toBeCalledWith('1')
  })

  it(`should be able to change directive's behavior`, () => {
    registerEmitDirective({
      handler(args) {
        return [args[0].target]
      }
    })

    const onChange = jest.fn()
    const demo = {
      methods: {
        onChange
      },
      render() {
        return <Input v-emit onChange={this.onChange} />
      }
    }
    const wrapper = mount(demo)
    const input = wrapper.findComponent(Input)
    input.element.value = '1'
    input.trigger('change')
    expect(onChange).toBeCalledWith({ value: '1' })
  })

  it(`should be able to change directive's behavior on each component`, () => {
    const onChange = jest.fn()
    const demo = {
      methods: {
        onChange,
        emit(args) {
          return [`${args[0].target.value}ok`]
        }
      },
      render() {
        return <Input v-emit={this.emit} onChange={this.onChange} />
      }
    }
    const wrapper = mount(demo)
    const input = wrapper.findComponent(Input)
    input.element.value = '1'
    input.trigger('change')
    expect(onChange).toBeCalledWith(`1ok`)
  })
})
