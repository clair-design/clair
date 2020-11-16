import { props as portalLikeProps } from 'packages/portal-like/src/props'
const placementTypes = [
  'top-left',
  'top',
  'top-right',

  'right-top',
  'right',
  'right-bottom',

  'bottom-right',
  'bottom',
  'bottom-left',

  'left-top',
  'left',
  'left-bottom'
]
export const props = {
  trigger: {
    type: [Array, String],
    default() {
      return ['hover', 'focus']
    },
    validator(val) {
      const validTypes = ['hover', 'click', 'focus', 'none']
      return [].concat(val).every(v => validTypes.includes(v))
    }
  },
  placement: {
    type: String,
    default: 'bottom',
    validator(val) {
      return placementTypes.includes(val)
    }
  },
  visible: {
    type: Boolean,
    default: null
  },
  content: [String, Object],
  showDelay: {
    type: Number,
    default: 0
  },
  hideDelay: {
    type: Number,
    default: 100
  },
  customClass: portalLikeProps.customClass,
  customStyle: portalLikeProps.customStyle,
  transition: {
    type: String,
    default: 'c-popover-fade'
  },
  /**
   * 默认情况下当trigger为click时，再次点击时即关闭。若不希望再次点击关闭时，使用此属性。
   * cascader,select等组件使用。确保多次点击input面板不主动折叠。
   */
  clickToggle: {
    type: Boolean,
    default: true
  },
  /* 控制是否展示指向小三角 */
  showTriangle: {
    type: Boolean,
    default: true
  },
  appendTarget: {
    validator(val) {
      if (typeof window === 'undefined') {
        return true
      }
      return val instanceof Element
    }
  }
}
