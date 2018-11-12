import { mount, createLocalVue } from '@vue/test-utils'
import Cascader from './index.vue'

// TODO: resolve issue with $clair
const localVue = createLocalVue()
localVue.prototype.$clair = {
  defaultThrottleTime: 150
}

// TODO: further work needed
it('should render cascader correctly', () => {
  const wrapper = mount(Cascader, {
    localVue,
    propsData: {
      value: ['苔藓', '角苔'],
      options: [
        {
          label: '藻类',
          children: [{ label: '绿藻' }, { label: '轮藻' }]
        },
        {
          label: '苔藓',
          children: [{ label: '地钱' }, { label: '角苔' }, { label: '苔藓植物门' }]
        },
        {
          label: '蕨类',
          children: [{ label: '石松' }, { label: '蕨类植物门' }]
        },
        {
          label: '种子植物',
          children: [
            {
              label: '被子',
              children: [{ label: '睡莲目' }, { label: '木兰藤目' }]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ]
    }
  })

  wrapper.setData({ isOpen: true })
  expect(wrapper.vm.$refs.dropmenu.innerHTML).toMatchSnapshot()
  expect(wrapper).toMatchSnapshot()
})
