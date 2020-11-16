import { registerIconComponent } from './utils/icon-wrapper'
import { IconInfoCircleFill } from './info'
import { IconCloseCircleFill } from './close'
import { IconExclamationCircleFill } from './exclamation'
import { IconCheckedCircleFill } from './checked'
import { removeStrokeMixins } from './utils/mixins'

export const IconStatusSuccess = /*@__PURE__*/ registerIconComponent({
  name: 'CIconStatusSuccess',
  mixins: removeStrokeMixins,
  render() {
    return (
      <IconCheckedCircleFill
        class="is-success c-icon--fill"
        on={this.$listeners}
      />
    )
  }
})

export const IconStatusInfo = /*@__PURE__*/ registerIconComponent({
  name: 'CIconStatusInfo',
  mixins: removeStrokeMixins,
  render() {
    return (
      <IconInfoCircleFill class="is-info c-icon--fill" on={this.$listeners} />
    )
  }
})

export const IconStatusWarning = /*@__PURE__*/ registerIconComponent({
  name: 'CIconStatusWarning',
  mixins: removeStrokeMixins,
  render() {
    return (
      <IconExclamationCircleFill
        class="is-warning c-icon--fill"
        on={this.$listeners}
      />
    )
  }
})

export const IconStatusDanger = /*@__PURE__*/ registerIconComponent({
  name: 'CIconStatusDanger',
  mixins: removeStrokeMixins,
  render() {
    return (
      <IconCloseCircleFill
        class="is-danger c-icon--fill"
        on={this.$listeners}
      />
    )
  }
})

// an unified interface for status-related icon
export const IconStatus = ({ data, props }) => {
  const { type } = props
  switch (type) {
    case 'success':
      return <IconStatusSuccess {...data} />
    case 'warning':
      return <IconStatusWarning {...data} />
    case 'error':
    case 'danger':
      return <IconStatusDanger {...data} />
    case 'info':
    default:
      return <IconStatusInfo {...data} />
  }
}
