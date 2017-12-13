import CodePen from '../assets/vue/codepen.vue'
import tinyCopy from '../assets/js/tinyCopy'

const reStyle = /<style>([\s\S]+)<\/style>/
const reScript = /<script>([\s\S]+)<\/script>/
const reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/

export default {
  install (Vue) {
    Vue.component('c-codepen', CodePen)

    const codepenVm = new Vue({
      render (h) {
        return h('c-codepen', {
          props: {
            config: JSON.stringify(this.config)
          }
        })
      },
      data: {
        // see https://blog.codepen.io/documentation/api/prefill/
        config: {
          'title': 'Clair Demo',
          'html': '<div>Hello, World!</div>',
          'js_pre_processor': 'babel',
          'css_external': 'https://unpkg.com/font-awesome@4.7.0/css/font-awesome.css;https://unpkg.com/clair/dist/clair.css',
          'js_external': 'https://unpkg.com/vue/dist/vue.js;https://unpkg.com/clair/dist/clair.js'
        }
      }
    })

    mountCodepenVm()

    Vue.prototype.$code = {
      copy (e) {
        const node = getPreDOM(e)
        if (node) {
          tinyCopy(node)
        }
      },
      open (e) {
        const node = getPreDOM(e)

        if (node) {
          const config = node.__c || (node.__c = extractVue(node.textContent))
          codepenVm.config = Object.assign({}, codepenVm.config, config)
          codepenVm.$nextTick(() => codepenVm.$el.submit())
        }
      }
    }

    function extractVue (code) {
      const styleMatch = reStyle.exec(code)
      const scriptMatch = reScript.exec(code)
      const templateMatch = reTemplate.exec(code)

      const style = styleMatch ? styleMatch[1].trim() : ''
      let script = scriptMatch ? scriptMatch[1].trim() : ''
      let template = templateMatch ? templateMatch[2].trim() : ''

      // case where `<template>` absent
      if (template === '') {
        template = code.replace(reStyle, '').replace(reScript, '')
      }

      if (script === '') {
        script = 'var data = {}'
      } else {
        script = script.replace(/export\s+default/, 'var data =')
      }

      script += `\nnew Vue(data).$mount('#app')`
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
          node = node.querySelector('.lang-html')
          break
        }
         node = node.parentNode
      }

      return node
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
