---
title: 级联选择框
group: Form 表单
---

# Cascader 级联选择框

## 定义

选择框，数据以层级关系分层次展示

## 使用场景

当数据具有明显的层级关系，且需要方便选查时，可使用此组件。此组件依赖`cascader-panel`和`input`组件

cascader 的下拉面板高度设置有两种方案：

1. 使用 custom-class 或 custom-style 明确规定固定高、最大高或最小高，从而使内容超出后出现滚动条。见下方示例。
2. 什么都不设置，此时面板高度会自适应。

## 基础用法

```html
<template>
  <c-cascader
    :options="options"
    v-model="val"
    placeholder="请选择地区"
  ></c-cascader>
</template>

<script>
  export default {
    data() {
      return {
        val: ['beijing'],
        options: [
          {
            value: 'beijing',
            label: '北京市',
            children: [
              {
                value: 'chaoyang',
                label: '朝阳区',
                disabled: true,
                isLeaf: true
              },
              {
                value: 'dongcheng',
                label: '东城区',
                isLeaf: true
              },
              {
                value: 'xicheng',
                label: '西城区',
                isLeaf: true
              },
              {
                value: 'haidian',
                label: '海淀区',
                isLeaf: true
              },
              {
                value: 'fengtai',
                label: '丰台区',
                isLeaf: true
              },
              {
                value: 'shunyi',
                label: '顺义区',
                isLeaf: true
              }
            ]
          },
          {
            value: 'tianjin',
            label: '天津市',
            children: [
              {
                value: 'heping',
                label: '和平区'
              },
              {
                value: 'hedong',
                label: '河东区'
              },
              {
                value: 'hexi',
                label: '河西区',
                disabled: true
              },
              {
                value: 'hongqiao',
                label: '红桥区'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

## 筛选

可以通过输入框进行筛选。

```html
<template>
  <c-cascader
    :options="options"
    v-model="val"
    placeholder="请选择地区"
    :filterable="true"
    :clearable="true"
  ></c-cascader>
</template>

<script>
  export default {
    data() {
      return {
        val: ['beijing'],
        options: [
          {
            value: 'beijing',
            label: '北京市',
            children: [
              {
                value: 'chaoyang',
                label: '朝阳区',
                disabled: true,
                isLeaf: true
              },
              {
                value: 'dongcheng',
                label: '东城区',
                isLeaf: true
              },
              {
                value: 'xicheng',
                label: '西城区',
                isLeaf: true
              },
              {
                value: 'haidian',
                label: '海淀区',
                isLeaf: true
              },
              {
                value: 'fengtai',
                label: '丰台区',
                isLeaf: true
              },
              {
                value: 'shunyi',
                label: '顺义区',
                isLeaf: true
              }
            ]
          },
          {
            value: 'tianjin',
            label: '天津市',
            children: [
              {
                value: 'heping',
                label: '和平区'
              },
              {
                value: 'hedong',
                label: '河东区'
              },
              {
                value: 'hexi',
                label: '河西区',
                disabled: true
              },
              {
                value: 'hongqiao',
                label: '红桥区'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

## 异步加载数据

可以通过 `lazy` + `lazy-method` 实现异步加载数据。

```html
<template>
  <c-cascader
    :options="options"
    v-model="val"
    placeholder="请选择地区"
    :lazy="true"
    :lazy-method="lazyLoad"
  ></c-cascader>
</template>

<script>
  export default {
    data() {
      return {
        val: ['beijing'],
        beijingChildren: [
          {
            value: 'chaoyang',
            label: '朝阳区',
            disabled: true,
            isLeaf: true
          },
          {
            value: 'dongcheng',
            label: '东城区',
            isLeaf: true
          },
          {
            value: 'xicheng',
            label: '西城区',
            isLeaf: true
          },
          {
            value: 'haidian',
            label: '海淀区',
            isLeaf: true
          },
          {
            value: 'fengtai',
            label: '丰台区',
            isLeaf: true
          },
          {
            value: 'shunyi',
            label: '顺义区',
            isLeaf: true
          }
        ],
        tianjinChildren: [
          {
            value: 'heping',
            label: '和平区'
          },
          {
            value: 'hedong',
            label: '河东区'
          },
          {
            value: 'hexi',
            label: '河西区',
            disabled: true
          },
          {
            value: 'hongqiao',
            label: '红桥区'
          }
        ],
        options: [
          {
            value: 'beijing',
            label: '北京市',
            children: []
          },
          {
            value: 'tianjin',
            label: '天津市',
            children: []
          }
        ]
      }
    },
    methods: {
      lazyLoad(node) {
        return new Promise(resolve => {
          setTimeout(_ => {
            if (node.value === 'beijing') {
              node.children = node.children.concat(this.beijingChildren)
              resolve()
            } else if (node.value === 'tianjin') {
              node.children = node.children.concat(this.tianjinChildren)
              resolve()
            } else {
              resolve()
            }
          }, 500)
        })
      }
    }
  }
</script>
```

## 数据字段映射

服务端返回的数据，可能和我们默认的数据结构不一致。此时可以使用 `data-map` 进行字段映射。

```html
<template>
  <c-cascader :options="options" v-model="val" :data-map="map"></c-cascader>
</template>

<script>
  export default {
    data() {
      return {
        val: ['beijing'],
        map: {
          label: 'name',
          value: 'key',
          children: 'subs',
          isLeaf: 'noSub',
          disabled: 'unavailable'
        },
        options: [
          {
            key: 'beijing',
            name: '北京市',
            subs: [
              {
                key: 'chaoyang',
                name: '朝阳区',
                unavailable: true,
                noSub: true
              },
              {
                key: 'dongcheng',
                name: '东城区',
                noSub: true
              },
              {
                key: 'xicheng',
                name: '西城区',
                noSub: true
              },
              {
                key: 'haidian',
                name: '海淀区',
                noSub: true
              },
              {
                key: 'fengtai',
                name: '丰台区',
                noSub: true
              },
              {
                key: 'shunyi',
                name: '顺义区',
                noSub: true
              }
            ]
          },
          {
            key: 'tianjin',
            name: '天津市',
            subs: [
              {
                key: 'heping',
                name: '和平区'
              },
              {
                key: 'hedong',
                name: '河东区'
              },
              {
                key: 'hexi',
                name: '河西区',
                unavailable: true
              },
              {
                key: 'hongqiao',
                name: '红桥区'
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleEvent() {
        console.log(arguments)
      }
    }
  }
</script>
```

### 更多基础示例，请参考组件 `cascader-panel`

## Cascader Props

| Name             | Description                                                                                                                                              | Type                                 | Required | Default                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------------- |
| v-model / value  | 选中项绑定值                                                                                                                                             | `Array`                              | `false`  | -                                                                                         |
| options          | 层级结构的数据源，具体结构请参考`cascader-panel`组件。                                                                                                   | `Array`                              | `false`  | -                                                                                         |
| filterable       | 是否可检索                                                                                                                                               | `boolean`                            | `false`  | `false`                                                                                   |
| filter           | 检索方法                                                                                                                                                 | `Function`                           | `false`  | `(node, query) => node.label.toLowerCase() .includes(query.toLowerCase())`                |
| change-on-select | 当此项为 true 时，点选每级菜单选项值都会发生变化                                                                                                         | `boolean`                            | `false`  | `false`                                                                                   |
| lazy             | 开启选项动态加载                                                                                                                                         | `boolean`                            | `false`  | `false`                                                                                   |
| lazy-method      | 动态加载获取数据的方法，仅当 `lazy` 为 true 时生效。若未规定加载方法，组件不会进入动态加载模式中，反之亦然。此方法必须返回一个 Promise，具体参见上方示例 | `Function`                           | `false`  | -                                                                                         |
| expand-trigger   | 次级面板的展开方式                                                                                                                                       | `'hover'` \| `'click'`               | `false`  | `'click'`                                                                                 |
| data-map         | 重新定义数据的对应关系                                                                                                                                   | `object`                             | `false`  | `{ label: 'label',value: 'value',children: 'children',leaf: 'leaf',disabled: 'disabled'}` |
| custom-class     | cascader 面板的自定义类名                                                                                                                                | `string`                             | `false`  | -                                                                                         |
| custom-style     | cascader 面板的自定义 style                                                                                                                              | `object`                             | `false`  | -                                                                                         |
| transition       | cascader 弹出气泡框的展开动画方式，当设置为 none，其出入场动画会被取消                                                                                   | `string`                             | `false`  | `'c-popover-fade'`                                                                        |
| show-delay       | 弹出框显示延迟，单位为毫秒                                                                                                                               | `number`                             | `false`  | `0`                                                                                       |
| hide-delay       | 弹出框隐藏延迟，单位为毫秒                                                                                                                               | `number`                             | `false`  | `100`                                                                                     |
| size             | 输入框尺寸                                                                                                                                               | `'large'` \| `'normal'` \| `'small'` | `false`  | `'normal'`                                                                                |
| placeholder      | 输入框占位文本                                                                                                                                           | `string`                             | `false`  | -                                                                                         |
| disabled         | 是否禁用 cascader                                                                                                                                        | `boolean`                            | `false`  | `false`                                                                                   |
| clearable        | 是否可一键清空选择值                                                                                                                                     | `boolean`                            | `false`  | `false`                                                                                   |
| separator        | 展示内容分隔符                                                                                                                                           | `string`                             | `false`  | `/`                                                                                       |
| append-target    | 插入 cascader-panel 的容器元素                                                                                                                           | `Element`                            | `false`  | `document.body`                                                                           |

## Cascader Events

| Event Name        | Description                                                   | Parameters                                                |
| ----------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| change            | cascader 值发生变化时触发                                     | `{target: {value: {valuePath: Array, labelPath: Array}}}` |
| expand-change     | 当前展开的面板发生变化                                        | `{target: {value: {valuePath: Array, labelPath: Array}}}` |
| focus             | 输入框获取焦点                                                | `{nativeEvent: Event}`                                    |
| blur              | 输入框丢失焦点                                                | `{nativeEvent: Event}`                                    |
| visibility-change | 当前 Popover 气泡框可见性发生变化时触发                       | `{target: {value: boolean}}`                              |
| after-enter       | 隐藏动画播放完毕后触发，transition 为`none`时，不会触发此事件 | -                                                         |
| after-leave       | 显示动画播放完毕后触发，transition 为`none`时，不会触发此事件 | -                                                         |

## Cascader Slots

| Name         | Description                                       |
| ------------ | ------------------------------------------------- |
| empty        | 当 cascader 无数据时的展示内容                    |
| filter-empty | 搜索结果为空时的展示内容                          |
| node         | 自定义节点内容，参数为 Node(当前节点对象)         |
| filter-node  | 自定义搜索结果节点内容，参数为 Node(当前节点对象) |
