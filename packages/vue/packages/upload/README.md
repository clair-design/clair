---
group: Form 表单
---

# Upload 文件上传

## 定义

选取文件并进行上传。

## 使用场景

用于将本地文件上传到指定服务器地址。

## 文件状态

Upload 组件对于所有文件都赋予了 5 种状态并保存到该文件对象的 `fileState` 属性中，使用者大部分情况下不需要了解这些状态，但理解这些状态会对您的项目开发有所帮助。以下为该属性的 5 种状态详解。

- `init` 为 `文件的初始化` 状态，该状态仅限内部使用，不对外暴露
- `ready` 为 `该文件已经准备好可以上传` 状态，选取文件并通过校验时该文件会被设置为 `ready` ，每次上传时会把所有状态为 `ready` 的文件进行上传
- `uploading` 为 `该文件正在上传` 状态，文件正在上传时该文件会被设置为 `uploading`
- `success` 为 `该文件上传成功` 状态，所有上传成功的文件都会被设置为 `success`
- `fail` 为 `该文件上传失败` 状态，所有上传失败的文件都会被设置为 `fail`

## 基本用法

- 默认只需填写`action`便可进行单文件上传
- 如若需要处理成功或者失败那么请绑定`@success`和`@error`事件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 禁用

- 填写`disabled`属性可禁用上传功能

```html
<c-upload action="https://jsonplaceholder.typicode.com/posts/" disabled />
```

## 拖拽上传

- 只需填写`droppable`便可开启拖拽上传功能

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  droppable
  accept=".jpg, .png, .dmg"
  @success="onSuccess"
  @error="onError"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 拖拽上传自定义样式

- 可以使用 `slot="trigger"` 来自定义拖拽上传样式
- 可在 `trigger` 元素上，使用 `dragenter` `dragover` `dragleave` `drop` 四个事件来处理样式

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  droppable
  @success="onSuccess"
  @error="onError"
>
  <div
    slot="trigger"
    class="drop"
    :class="{ dragenter: dragenter }"
    @dragenter="onDragEnter"
    @drop="onDrop"
    @dragleave="onDragLeave"
  >
    这是自定义的拖拽上传区域，点击或拖拽文件进入都可触发
  </div>
</c-upload>
<script>
  export default {
    data() {
      return {
        dragenter: false
      }
    },
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      onDragEnter(ev) {
        this.dragenter = true
      },
      onDragLeave(ev) {
        this.dragenter = false
      },
      onDrop(ev) {
        this.dragenter = false
      }
    }
  }
</script>
<style scoped>
  .drop {
    width: 500px;
    height: 309px;
    border: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dragenter {
    border: 2px dashed rgba(143, 221, 83, 0.6);
    background: rgba(143, 221, 83, 0.06);
  }
</style>
```

## 限制文件大小

- 指定`max-size`属性可限制文件大小，目前支持的单位有`KB` `MB` `GB`，默认为`'1024 MB'`
- 如若需要处理超过最大尺寸事件，请绑定`@over-size`事件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple
  @success="onSuccess"
  @error="onError"
  max-size="3.7 MB"
  @over-size="onOverSize"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      onOverSize(event) {
        const { overMaxSizeFiles, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `${overMaxSizeFiles.length}个文件超过最大尺寸`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 多文件上传

添加 `multiple` 属性就可以上传多文件

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
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 限制最大上传文件数量

- 指定`max-count`属性可限制最大上传文件数量，默认为`Infinity`
- 如若需要处理超过最大数量事件，请绑定`@over-count`事件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  multiple
  :max-count="maxCount"
  @over-count="onOverCount"
/>
<script>
  export default {
    data() {
      return {
        maxCount: 2
      }
    },
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      onOverCount(event) {
        const { changeFiles, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `超过最大上传文件数量${allFiles.length}/${this.maxCount}`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 修改上传按钮样式

可以自行修改按钮样式，修改按钮样式请参考`Button`组件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<c-upload
  type="success"
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<c-upload
  type="warning"
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<c-upload
  type="danger"
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
<style scoped>
  .has-margin-sm {
    margin: 10px;
  }
</style>
```

## 自定义上传按钮

可以使用`slot="trigger"`来自定义上传按钮

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
>
  <c-button slot="trigger">自定义的上传按钮</c-button>
</c-upload>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 手动上传

- 如果不希望选取文件后立即进行上传，可以设置`auto-upload`属性为`false`
- 当`auto-upload`为`false`时需要手动调用组件的`submit()`方法来进行文件的上传

```html
<c-upload
  ref="upload"
  :auto-upload="false"
  multiple
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>
<c-button @click="submitUpload">点击上传</c-button>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      submitUpload() {
        this.$refs.upload.submit()
      }
    }
  }
</script>
```

## ready 事件详解

- 使用手动上传时您可以多次选取文件，组件会把所有检验通过的文件设置为 ready 状态，并触发`@ready`事件，当手动调用 uploadFiles()方法进行上传操作时，组件内部会把所有状态为 ready 的文件进行上传，当上传成功后会把该文件状态设置为 success，上传失败则设置为 fail。

- `@ready`事件接收一个`event`参数，`event.detail.readyFiles`参数包含所有状态为`ready`的文件的数组，`event.detail.allFiles`参数包含所有文件的数组。

```html
<c-upload
  ref="upload"
  :auto-upload="false"
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  @ready="onReady"
/>
<c-button @click="submitUpload">点击上传</c-button>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      onReady(event) {
        const { readyFiles, allFiles } = event.detail
        this.$notification({
          title: '提示',
          description: `${readyFiles.length}个文件已准备好，可以上传`,
          type: 'info'
        })
      },
      submitUpload() {
        this.$refs.upload.submit()
      }
    }
  }
</script>
```

## 自定义请求头

- `headers`属性可以自定义请求头，比如添加`token`

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :headers="headers"
/>
<script>
  export default {
    data() {
      return {
        headers: {
          token: 'gj7is2775sadi983te7iuwd863'
        }
      }
    },
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 上传时附带的额外参数

可以在`data`属性指定上传时附带的额外参数，比如`token`

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :data="{token: 'd6q8wy82'}"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 上传时是否携带 cookie

`with-credentials`属性可指定上传请求时是否携带`cookie`

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :with-credentials="true"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 限制上传文件的格式需要指定`accept`属性

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  accept=".js, .jpg, .txt"
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 自定义上传方法

如果组件自身的上传不符合业务场景需求，那么也可以自定义`http-request`方法，用来覆盖默认的上传行为，`http-request`方法需要返回一个`Promise`，以便于组件内部了解到该文件的上传状态，并触发`success`或`fail`事件。

```html
<c-upload @success="onSuccess" @error="onError" :http-request="httpRequest" />
<script>
  const axios = {
    post(url, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('完成')
        }, 1000)
      })
    }
  }
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      httpRequest({ headers, withCredentials, file, data, filename, action }) {
        return axios.post('/api/upload', { file })
      }
    }
  }
</script>
```

## 即将触发上传文件方法之前的钩子

`before-upload`为上传文件之前的钩子，参数为`event`对象，`event.detail`包含正准备上传的文件列表`readyFiles`和所有文件列表`allFiles`，使用该方法你应该返回一个`Promise`，若`reject`则停止上传，若`resolve`且返回`files`文件数组，则本次上传操作将上传此`files`数组，没有返回`files`则上传之前选取过的文件。

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
  :before-upload="beforeUpload"
  multiple
/>
<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      beforeUpload(event) {
        const { readyFiles, allFiles } = event.detail
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const random = Math.random() * 10
            if (random >= 5) {
              const [file] = readyFiles
              resolve([file.rawFile])
              return
            }
            reject()
            this.$notification({
              title: '上传失败！',
              description: `reject停止上传！`,
              type: 'error'
            })
          }, 3000)
        })
      }
    }
  }
</script>
```

## 上传文件夹

指定`directory`属性可以上传整个文件夹的内容，使用此属性请注意兼容性问题
[caniuse](https://caniuse.com/#feat=input-file-directory)

```html
<c-upload
  directory
  action="https://jsonplaceholder.typicode.com/posts/"
  @success="onSuccess"
  @error="onError"
/>

<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 移除文件

调用组件的`remove`方法并传入想要移除的文件数组便可，移除完成时会触发`@remove`事件并返回事件对象，事件对象包含改变后的`allFiles`

```html
<c-upload
  ref="upload"
  multiple
  :auto-upload="false"
  action="https://jsonplaceholder.typicode.com/posts/"
  @ready="onReady"
  @remove="onRemove"
/>
<c-button @click="clickRemoveFirst">移除第一个</c-button>
<c-button @click="clickRemoveAll">移除所有文件</c-button>
<ul>
  <li v-for="file in allFiles" :key="file.rawFile.name">
    {{ file.rawFile.name }}
  </li>
</ul>

<script>
  export default {
    data() {
      return {
        allFiles: []
      }
    },
    methods: {
      onReady(event) {
        const { readyfiles, allFiles } = event.detail
        this.allFiles = allFiles
      },
      clickRemoveFirst() {
        const { upload } = this.$refs
        const [file] = this.allFiles
        const fileIds = [file.fileId]
        upload.remove(fileIds)
      },
      clickRemoveAll() {
        const { upload } = this.$refs
        const fileIds = this.allFiles.map(file => file.fileId)
        upload.remove(fileIds)
      },
      onRemove(event) {
        const { allFiles } = event.detail
        this.allFiles = allFiles
      }
    }
  }
</script>
```

## 上传全部完成事件

绑定`complete`事件可监听本次上传全部完成事件

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple
  @success="onSuccess"
  @error="onError"
  @complete="onComplete"
/>

<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      onComplete(event) {
        const { completeFiles, allFiles } = event.detail
        let successCount = 0
        let failCount = 0
        completeFiles.forEach(file => {
          if (file.fileState === 'success') {
            successCount++
          }
          if (file.fileState === 'fail') {
            failCount++
          }
        })
        this.$notification({
          title: '提示',
          description: `文件上传全部完成，其中${successCount}个文件上传成功，${failCount}个文件上传失败！`,
          type: 'info'
        })
      }
    }
  }
</script>
```

## method 指定上传方法

填写`method`参数可指定上传方法，默认为`post`

```html
<c-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple
  @success="onSuccess"
  @error="onError"
  method="put"
/>

<script>
  export default {
    methods: {
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      }
    }
  }
</script>
```

## 文件上传进度事件与列表渲染

- 文件上传时，想要获取文件的上传进度，可以绑定事件`@progress`并使用`File`对象的`percent`属性来获取上传进度
- 使用`allFiles`字段可以进行列表渲染，根据`File`对象的`fileState`属性来判断当前文件状态

```html
<c-upload
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple
  :auto-upload="false"
  @ready="onReady"
  @start="onStart"
  @progress="onProgress"
  @success="onSuccess"
  @error="onError"
  @complete="onComplete"
/>
<c-button @click="submitUpload">点击上传</c-button>
<ul>
  <p v-for="(file, index) in files" :key="file.rawFile.name">
    <c-icon-checked v-if="file.fileState === 'init'" />
    <c-icon-info-circle v-if="file.fileState === 'ready'" />
    <c-icon-spin v-if="file.fileState === 'uploading'" />
    <c-icon-success-circle v-if="file.fileState === 'success'" />
    <c-icon-danger-circle v-if="file.fileState === 'fail'" />
    {{ file.rawFile.name }}
    <c-progress
      v-if="file.fileState === 'init'"
      stroke-color="#ccc"
      :value="100"
      size="small"
    />
    <c-progress
      v-else-if="file.fileState === 'success'"
      :value="file.percent"
      status="success"
      size="small"
    />
    <c-progress
      v-else-if="file.fileState === 'fail'"
      :value="file.percent"
      status="exception"
      size="small"
    />
    <c-progress v-else :value="file.percent" size="small" />
  </p>
</ul>
<script>
  export default {
    data() {
      return {
        files: []
      }
    },
    methods: {
      onReady(event) {
        const { readyFiles, allFiles } = event.detail
        this.files = allFiles
      },
      onStart(event) {
        const { readyFiles, allFiles } = event.detail
        this.files = allFiles
      },
      onProgress(event) {
        const { file, allFiles } = event.detail
        this.files = allFiles
      },
      onSuccess(event) {
        const { response, file, allFiles } = event.detail
        this.files = allFiles
        this.$notification({
          title: '上传成功！',
          description: `文件‘${file.rawFile.name}上传成功！’`,
          type: 'success'
        })
      },
      onError(event) {
        const { file, allFiles } = event.detail
        this.files = allFiles
        this.$notification({
          title: '上传失败！',
          description: `文件‘${file.rawFile.name}上传失败！’`,
          type: 'error'
        })
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      onComplete(event) {
        const { completeFiles, allFiles } = event.detail
        let successCount = 0
        let failCount = 0
        completeFiles.forEach(file => {
          if (file.fileState === 'success') {
            successCount++
          }
          if (file.fileState === 'fail') {
            failCount++
          }
        })
        this.$notification({
          title: '提示',
          description: `文件上传全部完成，其中${successCount}个文件上传成功，${failCount}个文件上传失败！`,
          type: 'info'
        })
      }
    }
  }
</script>
```

## Upload Props

| Name             | Description                                                                                                                        | Type       | Required | Default     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ----------- |
| action           | 上传地址                                                                                                                           | `string`   | `true`   | -           |
| droppable        | 是否开启拖拽上传                                                                                                                   | `boolean`  | `false`  | `false`     |
| max-size         | 限制上传文件大小，指定`max-size`属性可限制文件大小，目前支持的单位有`KB` `MB` `GB`，默认为`'1024 MB'`                              | `string`   | `false`  | `'1024 MB'` |
| multiple         | 是否可以选中多个文件                                                                                                               | `boolean`  | `false`  | `false`     |
| max-count        | 最大上传文件数量                                                                                                                   | `number`   | `false`  | `Infinity`  |
| auto-upload      | 是否在选取文件后立即进行上传                                                                                                       | `boolean`  | `false`  | `true`      |
| name             | 文件字段名称                                                                                                                       | `string`   | `false`  | `'file'`    |
| headers          | 自定义请求头，详见[wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)                                            | `object`   | `false`  | `{}`        |
| data             | 上传时附带的额外参数                                                                                                               | `object`   | `false`  | `{}`        |
| with-credentials | 上传请求时是否携带 cookie                                                                                                          | `boolean`  | `false`  | `false`     |
| accept           | 限制上传的文件类型                                                                                                                 | `string`   | `false`  | -           |
| disabled         | 是否禁用                                                                                                                           | `Boolean`  | `false`  | -           |
| http-request     | 覆盖默认的上传行为，可以自定义上传的实现，参数为(opt)，内部上传所用到的所有参数将包装成 opt 对象提供给开发者，使用方法参考示例文档 | `function` | `false`  | -           |
| before-upload    | 即将触发上传文件方法之前的钩子，参数为(readyFiles, allFiles)                                                                       | `function` | `false`  | -           |
| directory        | 上传文件夹                                                                                                                         | `boolean`  | `false`  | `false`     |
| method           | 指定上传方法                                                                                                                       | `string`   | `false`  | `post`      |

## Upload Events

| Event Name | Description                                                                                                                                      | Parameters                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| over-size  | 超过最大尺寸事件，选择的该批次文件中只要有任何一个超过最大尺寸，则触发该事件                                                                     | `{ detail: { overMaxSizeFiles, allFiles } }`  |
| over-count | 超过最大数量事件，选择的该批次文件与曾选过的文件数量总和超过了最大数量，则触发该事件                                                             | `{ detail: { changeFiles, allFiles } }`       |
| ready      | 当选择的该批次文件中所有文件都被设置为 ready 状态时触发该事件                                                                                    | `{ detail: { readyFiles, allFiles } }`        |
| start      | 所有 ready 状态的文件走网络请求开始上传时触发该事件，触发该事件时，该批次所有文件的状态都会被设置为 `uploading`， `file.fileState === uploading` | `{ detail: { readyFiles, allFiles } }`        |
| change     | 上传中、成功、失败都会触发这个事件，`event.detail.type`可能为 `progress` `success` `error`                                                       | `{ detail: { allFiles, type } }`              |
| progress   | 文件走网络请求时的上传过程事件                                                                                                                   | `{ detail: { file, allFiles }, nativeEvent }` |
| success    | 文件走网络请求时的上传成功事件                                                                                                                   | `{ detail: { file, allFiles, response } }`    |
| error      | 文件走网络请求时的上传失败后事件                                                                                                                 | `{ detail: { file, allFiles }, nativeEvent }` |
| complete   | 该批次文件上传全部完成事件                                                                                                                       | `{ detail: { completeFiles, allFiles } }`     |
| remove     | 指定文件 ID 的某批文件 remove 完成事件                                                                                                           | `{ detail: { allFiles } }`                    |

## Upload Methods

| Method Name | Description                  | parameter                |
| ----------- | ---------------------------- | ------------------------ |
| submit      | 手动上传时需要主动调用该方法 | -                        |
| remove      | 删除文件                     | `fileIds: Array<number>` |

## Slots

| Name    | Description    |
| ------- | -------------- |
| trigger | 自定义上传按钮 |
