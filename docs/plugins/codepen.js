import { getParameters } from 'codesandbox/lib/api/define'
import CodePen from './components/codepen.vue'
import tinyCopy from './scripts/tiny-copy'

const reStyle = /<style>([\s\S]+)<\/style>/
const reScript = /<script>([\s\S]+)<\/script>/
const reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/

export default {
  install (Vue) {
    Vue.component('c-codepen', CodePen)

    const codepenVm = new Vue({
      render (h) {
        const { type, config } = this
        return h('c-codepen', {
          props: {
            type,
            config: type === 'codesandbox'
              ? getCodesandboxParameter(config)
              : JSON.stringify(config)
          }
        })
      },
      data: {
        type: 'codepen',
        // see https://blog.codepen.io/documentation/api/prefill/
        config: {
          title: 'Clair Demo',
          html: '<div>Hello, World!</div>',
          js_pre_processor: 'babel',
          css_external: 'https://unpkg.com/font-awesome@4.7.0/css/font-awesome.css;https://unpkg.com/clair/dist/clair.css',
          js_external: 'https://unpkg.com/vue/dist/vue.js;https://unpkg.com/clair/dist/clair.js'
        }
      }
    })

    Vue.prototype.$code = {
      copy (e) {
        const node = getPreDOM(e)
        if (node) {
          tinyCopy(node)
        }
      },
      open (e, type) {
        const node = getPreDOM(e)

        if (node) {
          const config = extractVue(node.textContent, type)
          codepenVm.type = type === 'codesandbox' ? 'codesandbox' : 'codepen'
          codepenVm.config = Object.assign({}, codepenVm.config, config)
          codepenVm.$nextTick(() => codepenVm.$el.submit())
        }
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', e => {
        mountCodepenVm()
      })
    }

    function mountCodepenVm () {
      if (typeof document !== 'undefined' && document.body) {
        const div = document.createElement('div')
        document.body.appendChild(div)
        codepenVm.$mount(div)
      }
    }
  }
}

function extractVue (code, type) {
  const styleMatch = reStyle.exec(code)
  const scriptMatch = reScript.exec(code)
  const templateMatch = reTemplate.exec(code)

  const style = styleMatch ? styleMatch[1].trim() : ''
  let script = scriptMatch ? scriptMatch[1].trim() : ''
  let template = templateMatch ? templateMatch[2].trim() : ''

  // case where `<template>` absent
  if (template === '') {
    template = code.replace(reStyle, '').replace(reScript, '').trim()
  }

  if (type !== 'codesandbox') {
    if (script === '') {
      script = 'var data = {}'
    } else {
      script = script.replace(/export\s+default/, 'var data =').trim()
    }
    script += `\nnew Vue(data).$mount('#app')`
  }

  template = `<div id="app">
  ${template.split('\n').join('\n  ')}
</div>`

  return {
    js: script,
    css: style,
    html: template
  }
}

function getPreDOM (e) {
  let node = e.target

  while (node) {
    if (node.classList.contains('vue-demo-block')) {
      node = node.querySelector('.vue-demo-source-code')
      break
    }
    node = node.parentNode
  }

  return node
}

function getCodesandboxParameter (config) {
  return getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            vue: 'latest',
            clair: 'latest'
          }
        }
      },
      'index.html': {
        content: `
<link rel="stylesheet" href="https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css" />
<div id="root"></div>
`
      },
      'src/main.js': {
        content: `import Vue from 'vue';
import Clair from 'clair';
import 'clair/dist/clair.css';
import App from './App.vue';

Vue.use(Clair);

new Vue({ render: h => h(App) }).$mount('#root');`
      },
      'src/App.vue': {
        content: `<template>
${config.html}
</template>

<script>
${config.js || 'export default {};'}
</script>

<style>
${config.css || '/* add your CSS here */'}
</style>

`
      }
    }
  })
}
