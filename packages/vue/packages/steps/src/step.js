import { IconCheckCircle, IconErrorCircle } from 'packages/icon'

export default {
  name: 'CStep',

  props: {
    stepKey: String,
    title: String,
    description: String,
    status: String
  },

  inject: {
    $steps: { default: null }
  },

  computed: {
    currentStatus() {
      const { status } = this

      if (status) {
        return status
      }

      if (this.$steps.currentKey) {
        const { currentKey, steps: siblings } = this.$steps
        const currentStep = siblings.findIndex(step => {
          return step.stepKey === currentKey
        })
        const index = siblings.indexOf(this)

        if (index === currentStep) {
          return 'process'
        }
        if (index < currentStep || Number(currentKey) === siblings.length + 1) {
          return 'finish'
        }
        return 'wait'
      }
      return 'wait'
    }
  },

  mounted() {
    this.$steps?.steps.push(this)
  },

  destroyed() {
    if (!this.$steps || !Array.isArray(this.$steps.steps)) {
      return
    }
    this.$steps.steps = this.$steps?.steps.filter(step => step !== this)
  },

  methods: {
    getIcon() {
      const { stepKey, currentStatus, $scopedSlots } = this
      if ($scopedSlots.icon?.()) {
        return $scopedSlots.icon?.()
      }
      if (currentStatus === 'finish') return <IconCheckCircle />
      if (currentStatus === 'error') return <IconErrorCircle />
      return <span class="c-step__icon-num">{stepKey}</span>
    }
  },

  render(h) {
    const { $scopedSlots, description } = this

    const classNames = [
      'c-step',
      `c-step--${this.currentStatus}`,
      description ? null : 'c-step--has-no-desc'
    ]

    const { isDot } = this.$steps

    const iconOrDot = isDot ? (
      <div class="c-step__dot"></div>
    ) : (
      <div class="c-step__icon">{this.getIcon()}</div>
    )

    const titleContent = $scopedSlots.title?.() || this.title
    const descContent = $scopedSlots.description?.() || this.description

    return (
      <div class={classNames}>
        {iconOrDot}
        <div class="c-step__content">
          <div class="c-step__title">{titleContent}</div>
          <div class="c-step__desc">{descContent}</div>
        </div>
      </div>
    )
  }
}
