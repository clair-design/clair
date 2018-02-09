---
title: Cascader
route: /component/cascader
layout: component
---

# Cascader 级联选择

当选择的数据有明显的层级关系时可以使用级联选择，方便数据选择

## 基本使用


```html
<c-cascader
  :options="options"
  v-model="selected"
  :labelKey="label"
  :valueKey="label"
  @change="onChange"
></c-cascader>

<script>
export default {
  data () {
    return {
      options: [
        {
          label: '藻类',
          children: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        },
        {
          label: '苔藓',
          children: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
          ]
        },
        {
          label: '蕨类',
          children: [
            { label: '石松' },
            { label: '蕨类植物门' }
          ]
        },
        {
          label: '种子植物',
          children: [
            {
              label: '被子',
              children: [
                { label: '睡莲目' },
                { label: '木兰藤目' }
              ]
            },
            { label: '苏铁' },
            { label: '银杏' },
            { label: '松柏' }
          ]
        }
      ],
      selected: [],
      label: 'label'
    }
  },
  methods: {
    onChange ({label, value}) {
      console.log(label, value)
    }
  }
}
</script>
```

