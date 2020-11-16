---
title: 级联面板
group: Data 数据展示
---

# Cascader-Panel 级联面板

## 定义

分层次数据展示面板

## 使用场景

当数据具有明显的层级关系，且需要方便选查时，可使用此组件。此组件为组件`Cascader`的基础组件。

## 基础示例

面板有`click`和`hover`两种可选的展开方式，默认为`click`。

cascader-panel 面板高度设置有两种方案：

1. 固定高。直接设置组件高度即可，见此基础示例。
2. 高度自适应+最大高。设置组件最大高后，使用 flex 元素包裹即可，见下方`自定义展示内容和方法`示例

```html
<template>
  <div style="display:flex">
    <c-cascader-panel v-model="cascader" :options="options" trigger="hover" class="example-cascader-panel">
    </c-cascader-panel>
    <c-cascader-panel v-model="cascader" :options="options" class="example-cascader-panel">
    </c-cascader-panel>
  </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        cascader: [],
        options: [{
            value: 'beijing',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区'
            },{
              value: 'dongcheng',
              label: '东城区'
            },{
              value: 'xicheng',
              label: '西城区'
            },{
              value: 'haidian',
              label: '海淀区'
            },{
              value: 'fengtai',
              label: '丰台区'
            },{
              value: 'shunyi',
              label: '顺义区'
            },{
              value: 'huairou',
              label: '怀柔区'
            },{
              value: 'tongzhou',
              label: '通州区'
            },{
              value: 'changping',
              label: '昌平区'
            },{
              value: 'shijingshan',
              label: '石景山区'
            },{
              value: 'daxing',
              label: '大兴区'
            },{
              value: 'yanqing',
              label: '延庆区'
            },{
              value: 'fangshan',
              label: '房山区'
            },{
              value: 'miyun',
              label: '密云区'
            },{
              value: 'mentougou',
              label: '门头沟区'
            },{
              value: 'pinggu',
              label: '平谷区'
            }]
          },{
            value: 'tianjin',
            label: '天津市',
            children: [{
              value: 'heping',
              label: '和平区'
            },{
              value: 'hedong',
              label: '河东区'
            },{
              value: 'hexi',
              label: '河西区'
            },{
              value: 'hongqiao',
              label: '红桥区'
            }]
          },{
            value: 'hebei',
            label: '河北省',
            children: [{
              value: 'shijiazhuang',
              label: '石家庄市',
              children: [{
                value: 'changan',
                label: '长安区'
              },{
                value: 'qiaoxi',
                label: '桥西区'
              },{
                value: 'xinhua',
                label: '新华区'
              },{
                value: 'yuhua',
                label: '裕华区'
              }]
            },{
              value: 'handan',
              label: '邯郸市',
              children: [{
                value: 'congtai',
                label: '丛台区'
              },{
                value: 'fuxing',
                label: '复兴区'
              },{
                value: 'feixiang',
                label: '肥乡区'
              },{
                value: 'quzhou',
                label: '曲周县'
              }]
            },{
              value: 'xiongan',
              label: '雄安新区'
            }]
          }]
      }
    }
  }
</script>
```

## 禁用某选项

通过在数据源中设置`disabled`字段来标识此字段被禁用。

由于 cascader-panel 遵循树形数据结构，当节点被禁用时，此节点无法展开，无法被选择，其子节点也会进入禁用状态，无法被选择。

```html
<template>
  <div style="display:flex">
    <c-cascader-panel v-model='cascader' :options="options"  class="example-cascader-panel" @change="change">
    </c-cascader-panel>
  </div>

  <c-tag style="margin-top: 10px" color="blue">当前值：{{cascader}}</c-tag>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cascader: ["hebei", "050321", {new: "050325",old: "050324"}],
        options: [{
            value: 'beijing',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区'
            },{
              value: 'dongcheng',
              label: '东城区'
            },{
              value: 'xicheng',
              label: '西城区'
            },{
              value: 'haidian',
              label: '海淀区'
            },{
              value: 'fengtai',
              label: '丰台区'
            },{
              value: 'shunyi',
              label: '顺义区'
            },{
              value: 'huairou',
              label: '怀柔区'
            },{
              value: 'tongzhou',
              label: '通州区'
            },{
              value: 'changping',
              label: '昌平区'
            },{
              value: 'shijingshan',
              label: '石景山区'
            },{
              value: 'daxing',
              label: '大兴区'
            },{
              value: 'yanqing',
              label: '延庆区'
            },{
              value: 'fangshan',
              label: '房山区'
            },{
              value: 'miyun',
              label: '密云区'
            },{
              value: 'mentougou',
              label: '门头沟区'
            },{
              value: 'pinggu',
              label: '平谷区'
            }]
          },{
            value: 'tianjin',
            label: '天津市',
            children: [{
              value: 'heping',
              label: '和平区',
              disabled: true
            },{
              value: 'hedong',
              label: '河东区'
            },{
              value: 'hexi',
              label: '河西区'
            },{
              value: 'hongqiao',
              label: '红桥区'
            }]
          },{
            value: 'hebei',
            label: '河北省',
            children: [{
              value: 'shijiazhuang',
              label: '石家庄市',
              disabled: true,
              children: [{
                value: 'changan',
                label: '长安区'
              },{
                value: 'qiaoxi',
                label: '桥西区'
              },{
                value: 'xinhua',
                label: '新华区'
              },{
                value: 'yuhua',
                label: '裕华区'
              }]
            },{
              value: '050321',
              label: '邯郸市',
              children: [{
                value: '050322',
                label: '丛台区'
              },{
                value: '050323',
                label: '复兴区'
              },{
                value: {new: '050325', old: '050324'},
                label: '肥乡区'
              },{
                value: [1,2,3],
                label: '曲周县'
              }]
            },{
              value: 'xiongan',
              label: '雄安新区'
            }]
          }]
      }
    },
    methods: {
      change(){
        console.log(this.cascader)
      }
    }
  }
</script>
```

## 选择任意一级选项

通过设置`change-on-select`字段来使 cascader-panel 的任意一个节点均可被选择。

默认情况下，cascader-panel 只有叶子节点（没有子节点的节点，称为叶子节点）可以被选择，其余节点只可展开。不过当规定了`change-on-select: true`后，任意一个节点均可被选择。

```html
<template>
  <c-radio-group v-model="changeOnSelect">
    <c-radio :value='true'>true</c-radio>
    <c-radio :value='false'>false</c-radio>
  </c-radio-group>

  <div style="display:flex">
    <c-cascader-panel v-model='cascader' :options="options" :change-on-select="changeOnSelect" class="example-cascader-panel">
    </c-cascader-panel>
  </div>

  <c-tag style="margin-top: 10px" color="blue">您选择的值为：{{cascader}}</c-tag>

  <c-button @click="cascader = []">清空所选</c-button>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        cascader: [],
        changeOnSelect: true,
        options: [{
            value: 'beijing',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区'
            },{
              value: 'dongcheng',
              label: '东城区'
            },{
              value: 'xicheng',
              label: '西城区'
            },{
              value: 'haidian',
              label: '海淀区'
            },{
              value: 'fengtai',
              label: '丰台区'
            },{
              value: 'shunyi',
              label: '顺义区'
            },{
              value: 'huairou',
              label: '怀柔区'
            },{
              value: 'tongzhou',
              label: '通州区'
            },{
              value: 'changping',
              label: '昌平区'
            },{
              value: 'shijingshan',
              label: '石景山区'
            },{
              value: 'daxing',
              label: '大兴区'
            },{
              value: 'yanqing',
              label: '延庆区'
            },{
              value: 'fangshan',
              label: '房山区'
            },{
              value: 'miyun',
              label: '密云区'
            },{
              value: 'mentougou',
              label: '门头沟区'
            },{
              value: 'pinggu',
              label: '平谷区'
            }]
          },{
            value: 'tianjin',
            label: '天津市',
            children: [{
              value: 'heping',
              label: '和平区'
            },{
              value: 'hedong',
              label: '河东区'
            },{
              value: 'hexi',
              label: '河西区'
            },{
              value: 'hongqiao',
              label: '红桥区'
            }]
          },{
            value: 'hebei',
            label: '河北省',
            children: [{
              value: 'shijiazhuang',
              label: '石家庄市',
              children: [{
                value: 'changan',
                label: '长安区'
              },{
                value: 'qiaoxi',
                label: '桥西区'
              },{
                value: 'xinhua',
                label: '新华区'
              },{
                value: 'yuhua',
                label: '裕华区'
              }]
            },{
              value: 'handan',
              label: '邯郸市',
              children: [{
                value: 'congtai',
                label: '丛台区'
              },{
                value: 'fuxing',
                label: '复兴区'
              },{
                value: 'feixiang',
                label: '肥乡区'
              },{
                value: 'quzhou',
                label: '曲周县'
              }]
            },{
              value: 'xiongan',
              label: '雄安新区'
            }]
          }]
      }
    }
  }
</script>
```

## 动态加载

通过设置`lazy`字段来使 cascader-panel 具备动态加载特性。但这还不够，cascader-panel 没有默认的加载方法，因此你需要额外规定`lazy-method`来使动态加载真正生效。`lazy-method`方法的参数为当前点击的节点对象，此方法必须返回一个符合`Promise/A+`规范的 Promise 对象实例。譬如 ES6 中的 Promise 对象实例，具体参见下方示例。

异步加载模式下，我们无法知道此节点是否是叶子节点，除非节点已经请求过加载方法了。但是，通过规定属性`isLeaf`（或者通过`data-map`属性自定义为其它名称）为`true`,可以明确的告知组件——本节点为叶子节点，不需要再往下加载了。

异步模式下，`options`可以不设置或赋值为空数组，当然也可以事先规定好一些层级数据，当异步方法请求来新数据时，可以自行处理合并或删除。

注意：当异步加载状态下，即便事先预置了一些层级数据在内，但未展开节点的子元素在检索时无法被搜索到。

```html
<template>
  <div style="display:flex">
    <c-cascader-panel v-model="cascader" change-on-select :options="options" class="example-cascader-panel" lazy :lazy-method='lazy'>
    </c-cascader-panel>
  </div>
  </div>
</template>

<script>
  const random = (max,min) => Math.floor(Math.random()*(max-min+1)+min);
  export default {
    data() {
      return {
        cascader: ['beijing','pinggu'],
        lazy: (node) => {
          return new Promise(resolve => {
            setTimeout(_ => {
              if (node.level < 3) {
                const arr = new Array(random(1,5)).join(' ').split(' ').map( n => {
                  return {
                    value: 'clair' + random(0,100000),
                    label: 'clair' + random(0,100000),
                    isLeaf: node.level >= 2
                  }
                })
                node.children = node.children.concat(arr)
                resolve()
              } else {
                resolve()
              }
            }, 500)
          })
        },
        options: [{
            value: 'beijing',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区'
            },{
              value: 'dongcheng',
              label: '东城区'
            },{
              value: 'xicheng',
              label: '西城区'
            },{
              value: 'haidian',
              label: '海淀区'
            },{
              value: 'fengtai',
              label: '丰台区'
            },{
              value: 'shunyi',
              label: '顺义区'
            },{
              value: 'huairou',
              label: '怀柔区'
            },{
              value: 'tongzhou',
              label: '通州区'
            },{
              value: 'changping',
              label: '昌平区'
            },{
              value: 'shijingshan',
              label: '石景山区'
            },{
              value: 'daxing',
              label: '大兴区'
            },{
              value: 'yanqing',
              label: '延庆区'
            },{
              value: 'fangshan',
              label: '房山区'
            },{
              value: 'miyun',
              label: '密云区'
            },{
              value: 'mentougou',
              label: '门头沟区'
            },{
              value: 'pinggu',
              label: '平谷区'
            }]
          },{
            value: 'tianjin',
            label: '天津市',
            children: [{
              value: 'heping',
              label: '和平区'
            },{
              value: 'hedong',
              label: '河东区'
            },{
              value: 'hexi',
              label: '河西区'
            },{
              value: 'hongqiao',
              label: '红桥区'
            }]
          },{
            value: 'hebei',
            label: '河北省',
            children: [{
              value: 'shijiazhuang',
              label: '石家庄市',
              children: [{
                value: 'changan',
                label: '长安区'
              },{
                value: 'qiaoxi',
                label: '桥西区'
              },{
                value: 'xinhua',
                label: '新华区'
              },{
                value: 'yuhua',
                label: '裕华区'
              }]
            },{
              value: 'handan',
              label: '邯郸市',
              children: [{
                value: 'congtai',
                label: '丛台区'
              },{
                value: 'fuxing',
                label: '复兴区'
              },{
                value: 'feixiang',
                label: '肥乡区'
              },{
                value: 'quzhou',
                label: '曲周县'
              }]
            },{
              value: 'xiongan',
              label: '雄安新区'
            }]
          }]
      }
    }
  }
</script>
```

## 搜索面板内容

通过设置`query`字段来使 cascader-panel 具备可搜索特性。`query`字段表示检索词。

我们内置了检索方法，仅基于数据的 label 进行检索。当然，你也可以通过参数`filter`来规定自己的检索方法，此方法需返回一个 bool 值。

```html
<template>
  <input v-model="query" />
  <div style="display:flex">
    <c-cascader-panel :options="options" class="example-cascader-panel" :query='query' :filter='filter' change-on-select>
    </c-cascader-panel>
  </div>
  </div>
</template>

<script>
  const random = (max,min) => Math.floor(Math.random()*(max-min+1)+min);
  export default {
    data() {
      return {
        query: '北京市',
        filter: (node, query) => {
          return node.label.toLowerCase().includes(query.toLowerCase()) || node.value.toString().toLowerCase().includes(query.toLowerCase())
        },
        options: [{
            value: 'beijing',
            label: '北京市',
            children: [{
              value: 'chaoyang',
              label: '朝阳区',
              disabled: true
            },{
              value: 'dongcheng',
              label: '东城区'
            },{
              value: 'xicheng',
              label: '西城区'
            },{
              value: 'haidian',
              label: '海淀区'
            },{
              value: 'fengtai',
              label: '丰台区'
            },{
              value: 'shunyi',
              label: '顺义区'
            },{
              value: 'huairou',
              label: '怀柔区'
            },{
              value: 'tongzhou',
              label: '通州区'
            },{
              value: 'changping',
              label: '昌平区'
            },{
              value: 'shijingshan',
              label: '石景山区'
            },{
              value: 'daxing',
              label: '大兴区'
            },{
              value: 'yanqing',
              label: '延庆区'
            },{
              value: 'fangshan',
              label: '房山区'
            },{
              value: 'miyun',
              label: '密云区'
            },{
              value: 'mentougou',
              label: '门头沟区'
            },{
              value: 'pinggu',
              label: '平谷区'
            }]
          },{
            value: 'tianjin',
            label: '天津市',
            children: [{
              value: 'heping',
              label: '和平区'
            },{
              value: 'hedong',
              label: '河东区'
            },{
              value: 'hexi',
              label: '河西区'
            },{
              value: 'hongqiao',
              label: '红桥区'
            }]
          },{
            value: 'hebei',
            label: '河北省',
            children: [{
              value: 'shijiazhuang',
              label: '石家庄市',
              children: [{
                value: 'changan',
                label: '长安区'
              },{
                value: 'qiaoxi',
                label: '桥西区'
              },{
                value: 'xinhua',
                label: '新华区'
              },{
                value: 'yuhua',
                label: '裕华区'
              }]
            },{
              value: 'handan',
              label: '邯郸市',
              children: [{
                value: 'congtai',
                label: '丛台区'
              },{
                value: 'fuxing',
                label: '复兴区'
              },{
                value: 'feixiang',
                label: '肥乡区'
              },{
                value: 'quzhou',
                label: '曲周县'
              }]
            },{
              value: 'xiongan',
              label: '雄安新区'
            }]
          }]
      }
    }
  }
</script>
```

## 自定义展示内容和方法

通过规定一些`slot`或`scoped-slot`，可以自定义某些展示内容，如无数据时的状态，无搜索结果时的状态，以及选项的渲染方式。

建议：此处请使用 vue.js `2.6.0`版本以上的 `v-slot` 指令写法，缩写为 `#`。

```html
<template>
  <div style="display:flex">
    <c-cascader-panel
      :options="emptyOptions"
      class="example-cascader-panel"
      style="height: auto;max-height: 300px;"
    >
      <p style="color:#777;text-align:center" v-slot:empty">数据为空 - -</p>
    </c-cascader-panel>
  </div>

  <input v-model="query" style="margin-top:20px" />
  <div style="display:flex">
    <c-cascader-panel
      :options="options"
      class="example-cascader-panel"
      change-on-select
      @change="change"
      @close="close"
      @expand-change="expand"
      :query="query"
      style="height: auto;max-height: 300px;"
    >
      <template v-slot:filter-empty>
        <p style="color:red;text-align:center;margin:10px">检索结果为空 - -</p>
      </template>
      <template v-slot:node="node">
        {{node.isLeaf? node.label: `${node.label}(${node.children.length})`}}
      </template>
      <template v-slot:filter-node="node">
        {{node.labelPath.join('_')}}
      </template>
    </c-cascader-panel>
  </div>
</template>

<script>
  const random = _ => parseInt(Math.random() * 1000)
  export default {
    data() {
      return {
        query: '',
        emptyOptions: [],
        options: [
          {
            value: 'beijing',
            label: '北京市',
            children: [
              {
                value: 'chaoyang',
                label: '朝阳区'
              },
              {
                value: 'dongcheng',
                label: '东城区'
              },
              {
                value: 'xicheng',
                label: '西城区'
              },
              {
                value: 'haidian',
                label: '海淀区'
              },
              {
                value: 'fengtai',
                label: '丰台区'
              },
              {
                value: 'shunyi',
                label: '顺义区'
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
                label: '河西区'
              },
              {
                value: 'hongqiao',
                label: '红桥区'
              }
            ]
          },
          {
            value: 'hebei',
            label: '河北省',
            children: [
              {
                value: 'shijiazhuang',
                label: '石家庄市',
                children: [
                  {
                    value: 'changan',
                    label: '长安区'
                  },
                  {
                    value: 'qiaoxi',
                    label: '桥西区'
                  },
                  {
                    value: 'xinhua',
                    label: '新华区'
                  },
                  {
                    value: 'yuhua',
                    label: '裕华区'
                  }
                ]
              },
              {
                value: 'handan',
                label: '邯郸市',
                children: [
                  {
                    value: 'congtai',
                    label: '丛台区'
                  },
                  {
                    value: 'fuxing',
                    label: '复兴区'
                  },
                  {
                    value: 'feixiang',
                    label: '肥乡区'
                  },
                  {
                    value: 'quzhou',
                    label: '曲周县'
                  }
                ]
              },
              {
                value: 'xiongan',
                label: '雄安新区'
              }
            ]
          }
        ]
      }
    },
    methods: {
      change() {
        console.log(arguments)
      },
      close() {
        console.log(arguments)
      },
      expand() {
        console.log(arguments)
      }
    }
  }
</script>
```

## 重新规定数据项的含义

当你的数据难以按照组件要求进行传值时，可以通过`data-map`字段将组件需要的字段与数据中的字段建立对应关系，从而使组件仍然可以正常工作

```html
<template>
  <div style="display:flex">
    <c-cascader-panel
      :options="options"
      :data-map="map"
      class="example-cascader-panel"
      lazy
      :lazy-method="lazy"
    ></c-cascader-panel>
  </div>
</template>

<script>
  const random = (max, min) => Math.floor(Math.random() * (max - min + 1) + min)
  export default {
    data() {
      return {
        lazy: node => {
          return new Promise(resolve => {
            setTimeout(_ => {
              if (node.level < 3) {
                const arr = new Array(random(1, 5))
                  .join(' ')
                  .split(' ')
                  .map(n => {
                    return {
                      key: 'clair' + random(0, 100000),
                      name: 'clair' + random(0, 100000),
                      noSub: node.level >= 2
                    }
                  })
                node.subs = node.subs.concat(arr)
                resolve()
              } else {
                resolve()
              }
            }, 500)
          })
        },
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
      change() {
        console.log(arguments)
      },
      close() {
        console.log(arguments)
      },
      expand() {
        console.log(arguments)
      }
    }
  }
</script>
```

## Props

| Name             | Description                                                                                                                                          | Type                | Required | Default                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- | --------------------------------------------------------------------------------------------- |
| v-model / value  | 绑定值                                                                                                                                               | `array`             | `false`  | -                                                                                             |
| options          | 层级结构的数据源，数据结构见下表所示。如果开启了动态加载模式，此属性可为空，具体参考上方`动态加载`示例。                                             | `array`             | `false`  | -                                                                                             |
| query            | 当前检索词                                                                                                                                           | `string`            | `false`  | -                                                                                             |
| filter           | 检索方法                                                                                                                                             | `function`          | `false`  | `(node, query) => node.label.toLowerCase() .includes(query.toLowerCase())`                    |
| change-on-select | 当此项为 true 时，点选每级菜单选项值都会发生变化                                                                                                     | `boolean`           | `false`  | `false`                                                                                       |
| lazy             | 开启选项动态加载                                                                                                                                     | `boolean`           | `false`  | `false`                                                                                       |
| lazy-method      | 动态加载获取数据的方法，仅当 `lazy` 为 true 时生效。若未规定加载方法，组件不会进入动态加载模式中，反之亦然。此方法必须返回一个 Promise，具体参见示例 | `function`          | `false`  | -                                                                                             |
| trigger          | 次级面板的展开方式                                                                                                                                   | `'hover' | 'click'` | `false`  | `'click'`                                                                                     |
| data-map         | 重新定义数据的对应关系                                                                                                                               | `object`            | `false`  | `{ label: 'label',value: 'value',children: 'children',isLeaf: 'isLeaf',disabled: 'disabled'}` |

## Options

| Name     | Description  | Type                        | Required | Default |
| -------- | ------------ | --------------------------- | -------- | ------- |
| label    | 展示文本     | `string`                    | `true`   | -       |
| value    | 选中后值     | `string | boolean | object` | `true`   | -       |
| children | 子节点       | `array`                     | `false`  | `[]`    |
| isLeaf   | 是否叶子节点 | `boolean`                   | `false`  | `false` |
| disabled | 是否禁用     | `boolean`                   | `false`  | `false` |

## Events

| Event Name    | Description                                                         | Parameters                                         |
| ------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| close         | cascader-panel 可以被关闭时触发，比如用户按了退出按钮，或选择好值时 | -                                                  |
| change        | cascader-panel 值发生变化时触发                                     | `{ detail: { valuePath: array, labelPath: array}}` |
| expand-change | 当前展开的面板发生变化                                              | `{ detail: { valuePath: array, labelPath: array}}` |

## Slots

| Name         | Description                                       |
| ------------ | ------------------------------------------------- |
| empty        | 当 cascader-panel 无数据时的展示内容              |
| filter-empty | 搜索结果为空时的展示内容                          |
| node         | 自定义节点内容，参数为 Node(当前节点对象)         |
| filter-node  | 自定义搜索结果节点内容，参数为 Node(当前节点对象) |
