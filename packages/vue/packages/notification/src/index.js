/**
 * @typedef {import('vue').VNode} VNode
 * @typedef {'success' | 'warning' | 'error' | 'info'} NotifType
 * @typedef {'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'} NotifPlacement
 * @typedef {{ id?: number, type?: NotifType, placement?: NotifPlacement, duration?: number, dangerouslySetInnerHTML?: Boolean, title?: string, description?: string }} NotifOption
 */

import Vue from 'vue'
import { AutoIncreasingCounter, isNil, zIndexManager } from '@clair/helpers'

import Notification from './notification'

const defaults = /*@__PURE__*/ new Vue({
  data() {
    return this.getDefaults()
  },
  methods: {
    getDefaults() {
      return {
        duration: 4500,
        placement: 'top-right'
      }
    }
  }
})

const NotifContainer = {
  name: 'CNotificationContainer',

  data() {
    return {
      options: [],
      placement: '',
      zIndex: zIndexManager.next()
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
    },

    updateZIndex() {
      this.zIndex = zIndexManager.next()
    }
  },

  render(h) {
    const { options, placement, zIndex } = this
    const notifications = options.map(option => {
      return (
        <Notification
          {...{ props: option }}
          key={option.id}
          onClose={this.onClose}
          on-before-enter={this.updateZIndex}
        />
      )
    })

    // eslint-disable-next-line max-len
    const className = `c-notification-container c-notification-container--${placement}`

    return (
      <div class={className} style={{ zIndex }}>
        {notifications}
      </div>
    )
  },

  destroyed() {
    this.closeAll()
  }
}

const containers = {
  'top-right': null,
  'bottom-right': null,
  'bottom-left': null,
  'top-left': null
}

const notifIdGenerator = /*@__PURE__*/ new AutoIncreasingCounter()

/**
 *
 * @param {NotifOption} notifOption
 */
const notification = function (notifOption) {
  const placement = isNil(notifOption.placement)
    ? defaults.placement
    : notifOption.placement

  const duration = isNil(notifOption.duration)
    ? defaults.duration
    : notifOption.duration

  if (!containers[placement]) {
    containers[placement] = new Vue(NotifContainer).$mount()
    containers[placement].placement = placement
    document.body.appendChild(containers[placement].$el)
  }

  containers[placement].options.push({
    ...notifOption,
    duration,
    placement,
    id: notifIdGenerator.next()
  })

  return {
    close() {
      containers[placement].closeAll()
    }
  }
}

/**
 * Close all `Notification` instances.
 */
notification.closeAll = function () {
  for (const key in containers) {
    if (containers[key]) {
      containers[key].closeAll()
    }
  }
}

export default notification
