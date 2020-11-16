import { mount } from '@vue/test-utils'
import Vue from 'vue'
import { Steps, Step } from './index'

describe('[Steps] basics', () => {
  const stepsDemo = {
    render(h) {
      return (
        <Steps activeKey="1">
          <Step title="Step1" description="description1" stepKey="1" />
          <Step title="Step2" description="description2" stepKey="2" />
          <Step title="Step3" description="description3" stepKey="3" />
        </Steps>
      )
    }
  }
  const wrapper = mount(stepsDemo)
  it('should render a steps width several step', () => {
    expect(wrapper.find('.c-step').exists()).toBe(true)
    expect(wrapper.find('.c-steps').exists()).toBe(true)
  })
  it('should render an icon for each step', () => {
    expect(wrapper.find('.c-step__icon').exists()).toBe(true)
  })
  it('should render a title for each step', () => {
    expect(wrapper.find('.c-step__title').exists()).toBe(true)
  })
  it('should render a description for each step', () => {
    expect(wrapper.find('.c-step__desc').exists()).toBe(true)
  })

  it('should show in a vertical direction', () => {
    const wrapper = mount(Steps, {
      propsData: {
        isVertical: true,
        activeKey: '1'
      }
    })
    expect(wrapper.find('.c-steps--vertical').exists()).toBe(true)
  })

  it('should show as a dot type', () => {
    const wrapper = mount(Steps, {
      propsData: {
        isDot: true,
        activeKey: '1'
      }
    })
    expect(wrapper.find('.c-steps--dotted').exists()).toBe(true)
    expect(wrapper.find('.c-step__icon').exists()).toBe(false)
  })

  it('should have different status for each step, and a "wait" status as default', async () => {
    const stepsDemo = {
      render(h) {
        return (
          <Steps activeKey="1">
            <Step title="Step1" stepKey="1" status="finish" />
            <Step title="Step2" stepKey="2" status="process" />
            <Step title="Step3" stepKey="3" />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    await Vue.nextTick()
    expect(wrapper.find('.c-step--finish').exists()).toBe(true)
    expect(wrapper.find('.c-step--process').exists()).toBe(true)
    expect(wrapper.find('.c-step--wait').exists()).toBe(true)
  })

  it('should set first step as active step as default', async () => {
    const stepsDemo = {
      render(h) {
        return (
          <Steps>
            <Step title="Step1" stepKey="1" />
            <Step title="Step2" stepKey="2" />
            <Step title="Step3" stepKey="3" />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    await Vue.nextTick()
    expect(wrapper.find('.c-step--finish').exists()).toBe(false)
    expect(wrapper.find('.c-step--process').exists()).toBe(true)
    expect(wrapper.find('.c-step--wait').exists()).toBe(true)
  })

  it('should have error status for some step', () => {
    const stepsDemo = {
      render(h) {
        return (
          <Steps activeKey="1">
            <Step title="Step1" stepKey="1" status="finish" />
            <Step title="Step2" stepKey="2" status="error" />
            <Step title="Step3" stepKey="3" />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    expect(wrapper.find('.c-step--finish').exists()).toBe(true)
    expect(wrapper.find('.c-step--error').exists()).toBe(true)
  })

  it('should set right status for each step if it has no status prop when steps be set activeKey ', async () => {
    const stepsDemo = {
      render(h) {
        return (
          <Steps activeKey="2">
            <Step title="Step1" stepKey="1" />
            <Step title="Step2" stepKey="2" />
            <Step title="Step3" stepKey="3" />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    await Vue.nextTick()
    expect(wrapper.find('.c-step--finish').exists()).toBe(true)
    expect(wrapper.find('.c-step--process').exists()).toBe(true)
    expect(wrapper.find('.c-step--wait').exists()).toBe(true)
  })

  it("should respect `status` from step's props over computed one", () => {
    const stepsDemo = {
      render(h) {
        return (
          <Steps activeKey="2">
            <Step title="Step1" stepKey="1" status="process" />
            <Step title="Step2" stepKey="2" />
            <Step title="Step3" stepKey="3" />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    const firstStep = wrapper.findAllComponents(Step).at(0)
    expect(firstStep.find('.c-step').classes('c-step--process')).toBe(true)
  })

  it('should update status accordingly', async () => {
    const stepsDemo = {
      data() {
        return {
          status: 'process'
        }
      },
      render(h) {
        return (
          <Steps>
            <Step title="Step1" stepKey="1" status={this.status} />
          </Steps>
        )
      }
    }
    const wrapper = mount(stepsDemo)
    await Vue.nextTick()
    const step = wrapper.findComponent(Step)
    expect(step.find('.c-step').classes('c-step--process')).toBe(true)
    wrapper.setData({ status: 'finish' })
    await Vue.nextTick()
    expect(step.find('.c-step').classes('c-step--finish')).toBe(true)
  })
})
