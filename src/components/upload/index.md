---
title: Upload
route: /component/upload
layout: component
---

# 文件上传

ajax文件上传

## 单文件上传
默认只需填写action便可以上传文件

如若需要处理成功或者失败那么请绑定@success和@error事件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      }
    }
  }
</script>
```

## 多文件上传
添加multiple属性就可以上传多文件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  multiple
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      }
    }
  }
</script>
```

## 限制最大上传文件数量
当指定了multiple属性后可以指定每次可同时上传的最大文件数量limit

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  multiple
  :limit="3"
  @exceed="onExceed"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      onExceed (files, fileList) {
        console.log('onExceed')
        this.$notify({
          title: '上传失败！',
          message: `超过限制`,
          type: 'error'
        })
      },
    }
  }
</script>
```

## 修改上传按钮主题
可以自行修改按钮主题，修改按钮主题请参考button组件

```html
<div class="has-margin-sm">
  <c-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    @success="onSuccess"
    @error="onError"
  />
</div>
<div class="has-margin-sm">
  <c-upload
    primary
    round
    action="https://jsonplaceholder.typicode.com/posts/"
    @success="onSuccess"
    @error="onError"
  />
</div>
<div class="has-margin-sm">
  <c-upload
    success
    outline
    action="https://jsonplaceholder.typicode.com/posts/"
    @success="onSuccess"
    @error="onError"
  />
</div>
<div class="has-margin-sm">
  <c-upload
    warning
    outline round
    action="https://jsonplaceholder.typicode.com/posts/"
    @success="onSuccess"
    @error="onError"
  />
</div>
<div class="has-margin-sm">
  <c-upload
    danger
    flat
    action="https://jsonplaceholder.typicode.com/posts/"
    @success="onSuccess"
    @error="onError"
  />
</div>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      onExceed (files, fileList) {
        console.log('onExceed')
        this.$notify({
          title: '上传失败！',
          message: `超过限制`,
          type: 'error'
        })
      },
    }
  }
</script>
```

## 自定义上传按钮
可以使用slot="btn"来自定义上传按钮

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  multiple
  :limit="3"
  @exceed="onExceed"
>
  <c-button slot="btn" primary outline>自定义的上传按钮</c-button>
</c-upload>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      onExceed (files, fileList) {
        console.log('onExceed')
        this.$notify({
          title: '上传失败！',
          message: `超过限制`,
          type: 'error'
        })
      },
    }
  }
</script>
```

## 上传文件大小的限制
上传文件之前会执行validator函数进行一些校验，参数会拿到对应的文件对象，可以在这里进行上传文件大小的限制，若函数返回 false，则代表校验失败，组件会停止该次上传操作

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :validator="validator"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      validator (file) {
        const MB = file.size/1000/1000
        if (MB > 40) {
          this.$notify({
            title: '上传失败！',
            message: '文件超过40MB！',
            type: 'error'
          })
          return false;
        }
        return true;
      }
    }
  }
</script>
```

## 手动上传
当auto-upload=false时需要手动调用组件的submit方法来进行文件的上传

```html
<c-upload
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :auto-upload="false"
/>
<c-button primary @click="submitUpload">点击上传</c-button>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    }
  }
</script>
```

## 上传时附带的额外参数
可以在data属性指定上传时附带的额外参数，比如token

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :data="{token:'d6q8wy82'}"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      }
    }
  }
</script>
```

## 展示上传文件列表 slot="file-list"

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
>
  <span slot="file-list" slot-scope="props">
    <span> {{props.filenames[0]}}</span>
  </span>
</c-upload>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      }
    }
  }
</script>
```

## 限制上传文件的格式需要指定accept属性

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  accept="text/javascript, application/javascript"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        console.log('')
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      }
    }
  }
</script>
```

## 自定义上传方法
如果组件自身的上传不符合业务场景需求，那么也可以自定义http-request方法，返回一个Promise，用来覆盖默认的上传行为

```html
<c-upload
  @success="onSuccess"
  @error="onError"
  :http-request="httpRequest"
/>
<script>
  export default {
    methods: {
      onSuccess (res, rawFile) {
        this.$notify({
          title: '上传成功！',
          message: '上传成功后的回调函数',
          type: 'success'
        })
      },
      onError (err, rawFile) {
        this.$notify({
          title: '上传失败！',
          message: '上传失败后的回调函数',
          type: 'error'
        })
      },
      httpRequest (opt) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('完成')
          },1000)
        })
      }
    }
  }
</script>
```

### 属性

| 名称 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| action | String | - | 必选参数，上传的地址 |
| accept | String | - | 限制上传的文件类型 |
| limit | Number | - | 最大上传文件数量 |
| multiple | Boolean | false | 是否可以选中多个文件 |
| auto-upload | Boolean | true | 是否在选取文件后立即进行上传 |
| name | String | 'file' | 文件字段名称 |
| headers | Object | { } | 自定义请求头 |
| data | Object | { } | 上传时附带的额外参数 |
| validator | Function | - | 上传文件之前会执行validator函数进行一些校验，参数会拿到对应的文件对象，若函数返回 false，则代表校验失败，组件会停止该次上传操作 参数为(file: Object) |
| httpRequest | Function | - | 覆盖默认的上传行为，可以自定义上传的实现 |

### 事件

| 名称 | 类型 | 默认值| 说明 |
|-----|------|-------|-----|
| exceed | Function | - | 超过最大上传文件限制事件 参数为(files: Array, fileList: Array) |
| progress | Function | - | 上传过程事件 参数为(e: Object, file: Object)|
| success | Function | - | 上传成功事件 参数为(res: Object, file: Object)|
| error | Function | - | 上传失败后事件 参数为(err: Object, file: Object)|

### slots

| 名称 | 是否 Scoped | 说明 |
|-----|------|-------|-----|
| file-list | 是 | 自定义上传文件列表的展示，props.filenames为上传列表的文件名数组 |
| btn | 否 | 自定义上传按钮 |

