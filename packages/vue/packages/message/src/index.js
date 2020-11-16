/**
 * @typedef {import('vue').VNode} VNode
 * @typedef {'success' | 'warning' | 'error' | 'info'} MsgType
 * @typedef {{ id?: number, type?: MsgType, duration?: number, dangerouslySetInnerHTML?: Boolean, message: String | VNode }} MsgOption
 */

import Vue from 'vue'
import { AutoIncreasingCounter, isNil, zIndexManager } from '@clair/helpers'

import { toCSSLengthValue } from 'src/utils/unit'
import Message, { messageTypes } from './message'

// Default configurations for `Message`s.
// Here we use a `Vue` instance to hold the data
// to get some reactivity on fields like `top` `zIndex`.
const defaults = /*@__PURE__*/ new Vue({
  data() {
    return this.getDefaults()
  },
  methods: {
    getDefaults() {
      return {
        duration: 3000,
        top: 20,
        zIndex: zIndexManager.next(),
        // is zIndex overridden by $message.config
        zIndexOverridden: false
      }
    }
  }
})

/**
 * This makes a container that holds all `Message` elements.
 */
const MsgContainer = {
  name: 'CMessageContainer',

  data() {
    return {
      options: []
    }
  },

  computed: {
    style() {
      return {
        zIndex: defaults.zIndex,
        top: toCSSLengthValue(defaults.top)
      }
    }
  },

  methods: {
    onClose({ id }) {
      const { options } = this

      for (let i = 0; i < options.length; i++) {
        if (options[i].id === id) {
          options.splice(i, 1)
          break
        }
      }
    },

    closeAll() {
      this.options = []
    }
  },

  render(h) {
    const { options } = this
    const messages = options.map(option => {
      return (
        <Message
          {...{ props: option }}
          key={option.id}
          onClose={this.onClose}
        />
      )
    })

    return (
      <div class="c-message-container" style={this.style}>
        {messages}
      </div>
    )
  },

  destroyed() {
    this.closeAll()
  }
}

let vm = null
const msgIdGenerator = /*@__PURE__*/ new AutoIncreasingCounter()

/**
 *
 * @param {MsgOption} msgOption
 */
const message = function (msgOption) {
  if (!vm) {
    vm = new Vue(MsgContainer).$mount()
    document.body.appendChild(vm.$el)
  }

  // if duration is `null` or `undefined`, use default duration time
  const duration = isNil(msgOption.duration)
    ? defaults.duration
    : msgOption.duration

  if (!defaults.zIndexOverridden) {
    defaults.zIndex = zIndexManager.next()
  }

  vm.options.push({
    ...msgOption,
    duration,
    id: msgIdGenerator.next()
  })

  // TODO
  // return value
  return {
    close() {
      vm.closeAll()
    }
  }
}

/**
 * This helps to override `Message`'s default configuration.
 *
 * @param {{ duration?: number, top?: number | string, zIndex?: number }} config
 */
message.config = function config(config) {
  if (config) {
    Object.assign(defaults, config, {
      zIndexOverridden: typeof config.zIndex === 'number'
    })
  }
}

// Quick methods.
messageTypes.forEach(type => {
  message[type] = function (option) {
    return message({ ...option, type })
  }
})

/**
 * Close all `Message` instances.
 */
message.closeAll = function () {
  if (vm) {
    vm.closeAll()
  }
}

export default message
