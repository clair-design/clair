import { IconUser } from 'packages/icon'
export default {
  name: 'CAvatar',
  props: {
    shape: {
      type: String,
      default: 'circle',
      validator: shape => ['circle', 'square'].includes(shape)
    },
    size: {
      type: String,
      default: 'normal',
      validator: size => ['large', 'normal', 'small'].includes(size)
    },
    src: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatarClass() {
      return ['c-avatar', `c-avatar--${this.shape}`, `c-avatar--${this.size}`]
    },
    avatarStyle() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.color
      }
    }
  },
  methods: {
    renderAvatar() {
      const { src, text } = this
      if (src) {
        return <img src={src} />
      } else if (text) {
        return text
      }
      return <IconUser></IconUser>
    }
  },
  render(h) {
    return (
      <div class={this.avatarClass} style={this.avatarStyle}>
        {this.renderAvatar()}
      </div>
    )
  }
}
