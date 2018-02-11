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

## 设置禁用项

在`options`的选择中通过设置`disabled`为`true`，来禁用该选项

```html
<c-cascader
  :options="options"
  v-model="selected"
  :labelKey="label"
  :valueKey="label"
  :separator="separator"
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
          disabled: true,
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
      label: 'label',
      separator: '-'
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

## 设置大小

通过`size`可以进行大小设置，支持 sm, md, lg 三种尺寸


```html
<div>
  <div class="cascader-demo__sizeitem">
    <span>sm:</span>
    <c-cascader
      :options="options"
      v-model="selected"
      :labelKey="label"
      :valueKey="label"
      :separator="separator"
      size="sm"
      @change="onChange"
    ></c-cascader>
  </div>
  <div class="cascader-demo__sizeitem">
    <span>md:</span>
    <c-cascader
      :options="options"
      v-model="selected"
      :labelKey="label"
      :valueKey="label"
      :separator="separator"
      size="md"
      @change="onChange"
    ></c-cascader>
  </div>
  <div class="cascader-demo__sizeitem">
    <span>lg:</span>
    <c-cascader
      :options="options"
      v-model="selected"
      :labelKey="label"
      :valueKey="label"
      :separator="separator"
      size="lg"
      @change="onChange"
    ></c-cascader>
  </div>
</div>

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
      label: 'label',
      separator: '-'
    }
  },
  methods: {
    onChange ({label, value}) {
      console.log(label, value)
    }
  }
}
</script>
<style>
.cascader-demo__sizeitem {
  margin: 10px;
  display: inline-block;
}
</style>
```

## 设置仅显示最后一项

通过`showAllLevel`置为false，来展现最后一级的数据

```html
<c-cascader
  :options="options"
  v-model="selected"
  :labelKey="label"
  :valueKey="label"
  :showAllLevel="showAllLevel"
  @change="onChange"
></c-cascader>

<script>
export default {
  data () {
    return {
      showAllLevel: false,
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

## 选择即改变

点击选项就会触发change事件，并更新数据展现

```html
<c-cascader
  :options="options"
  v-model="selected"
  :labelKey="label"
  :valueKey="label"
  :childrenKey="childrenKey"
  :changeOnSelect="changeOnSelect"
  @change="onChange"
></c-cascader>

<script>
export default {
  data () {
    return {
      changeOnSelect: true,
      childrenKey: 'catogery',
      options: [
        {
          label: '藻类',
          catogery: [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
        },
        {
          label: '苔藓',
          catogery: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
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

## 动态加载选项

```html
<c-cascader
  :options="options"
  v-model="selected"
  :labelKey="label"
  :valueKey="label"
  :childrenKey="childrenKey"
  :loadChildren="loadChildren"
  @change="onChange"
></c-cascader>

<script>
export default {
  data () {
    return {
      childrenKey: 'catogery',
      options: [
        {
          label: '藻类',
          catogery: []
        },
        {
          label: '苔藓',
          catogery: [
            { label: '地钱' },
            { label: '角苔' },
            { label: '苔藓植物门' }
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
    },
    loadChildren (option) {
      const activeOption = this.options.find(item => item.label === option.label)
      setTimeout(_ => {
        this.$nextTick(_ => {
          const catogery= [
            { label: '绿藻' },
            { label: '轮藻' }
          ]
          activeOption.catogery = catogery
        })
      }, 300);
    }
  }
}
</script>
```

## API


### 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| value | Array | [] | 选中项的层级数组 |
| placeholder | String | '请选择日期' | 未进行选择时的提示 |
| disabled | Boolean | false | 是否被禁用 |
| separator | String | '/' | 展现时数据层级的分隔符 |
| size | String | 'md' | 设置大小，目前支持 sm, md, lg |
| options | Array | [] | 数据集 |
| labelKey | String | 'label' | 可以指定数据集中展示值的字段 |
| valuekey | String | 'value' | 可以指定数据集中取值的字段 |
| childrenKey | String | 'children' | 可以指定子集的字段 |
| changeOnSelect | Boolean | false | 是否每级数据的选择都触发change事件 |
| showAllLevel | Boolean | true | 是否展现数据的全部层级结构，false则展现最后一级数据 |

### 方法

| 参数 | 说明 | 类型 | 默认值|
|-----|------|-------|-----|
| change | 数据选择时回调 | function(Object: {label, value}) | label是展示值labelKey的数组，value是valueKey的数组 |
