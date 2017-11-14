<style>
  .vue-demo-block {
    position: relative;
  }
  .c-run-online {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
  }
</style>

<template>
  <a class="c-run-online" @click.prevent="runOnline">在线运行</a>
</template>

<script>
  export default {
    props: {
      uid: {
        type: String,
        required: true
      }
    },
    methods: {
      runOnline () {
        const uid = this.uid
        const origin = 'https://clair-design.github.io'
        const url = `${origin}/clair-playground/?show=${uid}&t=${+new Date()}`
        const code = this.$el.parentNode.querySelector('.lang-html > code').textContent

        const win = window.open(url)

        window.addEventListener('message', function cb (e) {
          if (e.data === uid) {
            win.postMessage('clair|' + code, origin)
            console.log('clair|' + code)
            window.removeEventListener('message', cb)
          }
        })
      }
    }
  }
</script>
