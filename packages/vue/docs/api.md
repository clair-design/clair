# API

## `registerEmitDirective`

- 参数
  - `{ name?: string; handler?: (args: any[]) => any[] }`
- 使用方式

  `name` 是指令（directive）的名称，`handler` 是如何调整 `$emit` 传递的参数。

  `handler` 接收一个数组，表示原有 `$emit` 传递的参数。
  假如 `$emit('event', 'value')`，则 `args` 为 `['value']`。
  可以通过 `map`，`filter` 等不同方式，对参数进行调整。

  调用完毕之后，会在全局注册一个 `v-${name}` 的指令，可在组件上显式调用。

  每个组件，还可以自行调整处理参数的逻辑：

  ```markup
  <template>
    <my-component
      v-emit="emit"
      @click="click">
    </my-component>
  </template>

  <script>
  export default {
    methods: {
      emit(args) {
        return args.map(arg => arg.value)
      },
      click(args) {
        console.log(args)
      }
    }
  }
  </script>
  ```
