import { mount } from '@vue/test-utils'
import Checkbox from './index.vue'
import CheckboxGroup from './checkbox-group.vue'

it('should render basic checkbox correctly', () => {
  const wrapper = mount(Checkbox, {
    propsData: {
      value: true
    }
  })

  expect(wrapper.vm.checked).toBe(true)
  wrapper.trigger('click')
  expect(wrapper.vm.checked).toBe(false)

  expect(wrapper).toMatchSnapshot()
})

it('should render checkbox group correctly', () => {
  const wrapper = mount(CheckboxGroup, {
    propsData: {
      options: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
        { value: 3, label: '选项3', disabled: true },
        { value: 4, label: '选项3', disabled: true }
      ],
      value: [4]
    },
    listeners: {
      change (val) {
        wrapper.setProps({ value: val })
      }
    }
  })

  expect(wrapper).toMatchSnapshot()

  const checkboxes = wrapper.findAll(Checkbox)

  checkboxes.at(0).trigger('click')
  expect(wrapper.vm.value).toEqual([4, 1])

  checkboxes.at(1).trigger('click')
  expect(wrapper.vm.value).toEqual([4, 1, 2])

  checkboxes.at(2).trigger('click')
  expect(wrapper.vm.value).toEqual([4, 1, 2])
})

it('should render checkbox group with custom children', () => {
  const wrapper = mount(CheckboxGroup, {
    propsData: {
      value: []
    },
    stubs: {
      'c-checkbox': Checkbox
    },
    slots: {
      default: [
        '<c-checkbox label="a">选项1</c-checkbox>',
        '<c-checkbox label="选项2"></c-checkbox>',
        '<c-checkbox label="选项3"></c-checkbox>'
      ]
    },
    listeners: {
      change (val) {
        wrapper.setProps({ value: val })
      }
    }
  })

  expect(wrapper).toMatchSnapshot()

  const checkboxes = wrapper.findAll(Checkbox)
  checkboxes.at(0).trigger('click')
  checkboxes.at(2).trigger('click')
  expect(wrapper.vm.value).toEqual(['a', '选项3'])
})

it('should render indeterminate state', () => {
  const wrapper = mount({
    components: {
      'c-checkbox': Checkbox,
      'c-checkbox-group': CheckboxGroup
    },
    template: `
<div>
  <c-checkbox
    v-model="allChecked"
    :indeterminate="indeterminate"
    label="全部选中"
    @change="onCheckAllChange"
  />
  <br/>
  <c-checkbox-group
    v-model="selected"
    :options="options"
    @change="onCheckedResultChange"
  />

  <p>你选择了 {{ selected }}</p>
</div>
`,
    data () {
      return {
        options: ['Node', 'Nginx', 'Vue'],
        selected: ['Node'],
        allChecked: false,
        indeterminate: true
      }
    },
    methods: {
      onCheckAllChange (e) {
        this.selected = !e ? [] : this.options
        this.indeterminate = false
      },
      onCheckedResultChange (e) {
        const total = this.options.length
        const checked = this.selected.length
        this.allChecked = e.length === total
        this.indeterminate = checked > 0 && checked < total
      }
    }
  })

  expect(wrapper).toMatchSnapshot()

  wrapper.findAll(Checkbox).at(2).trigger('click')
  wrapper.findAll(Checkbox).at(3).trigger('click')
  expect(wrapper.vm.indeterminate).toBe(false)
})

it('should works with validation', () => {
  const wrapper = mount(CheckboxGroup, {
    propsData: {
      value: [],
      options: [
        { value: 1, label: '香蕉' },
        { value: 2, label: '苹果' },
        { value: 3, label: '梨' },
        { value: 4, label: '芒果' },
        { value: 5, label: '木瓜' },
        { value: 6, label: '榴莲' }
      ],
      minItems: 2,
      maxItems: 4
    },
    listeners: {
      change (val) {
        wrapper.setProps({ value: val })
      }
    }
  })

  const checkboxes = wrapper.findAll(Checkbox)
  // select five items
  checkboxes.at(0).trigger('click')
  checkboxes.at(1).trigger('click')
  checkboxes.at(2).trigger('click')
  checkboxes.at(3).trigger('click')
  checkboxes.at(4).trigger('click')

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.contains('.c-error-msg')).toEqual(true)
})
