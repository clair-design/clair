import { IconArrowDown, IconArrowUp, IconPlus, IconMinus } from 'packages/icon'
import { useDirectives } from './directive'
import { flow } from 'lodash-es'

const POWER_TEN = 10

const KEY_DOWN = 'ArrowDown'
const KEY_UP = 'ArrowUp'

export default {
  name: 'CInputNumber',
  directives: useDirectives(),
  model: {
    prop: 'value',
    event: 'update:inputNumber'
  },
  inject: {
    $formItem: { default: null }
  },
  props: {
    // 值
    value: {
      type: Number,
      default: 0
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 步长
    step: {
      type: Number,
      default: 1
    },
    // 是否只能输入步长的倍数
    stepFixed: {
      type: Boolean,
      default: false
    },
    // 精度
    precision: {
      type: Number,
      default: null,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    },
    // 是否禁用计数器
    disabled: {
      type: Boolean,
      default: false
    },
    // 尺寸 large/normal/small
    size: {
      type: String,
      default: 'normal',
      validator(size) {
        return ['large', 'normal', 'small'].includes(size)
      }
    },
    // 按钮样式 left-right/up-down
    controlPosition: {
      type: String,
      default: 'left-right',
      validator(val) {
        return ['left-right', 'up-down'].includes(val)
      }
    }
  },
  data() {
    return {
      lastValueInNumber: this.value,
      changeHandlerQueue: [],
      lastValueEmittedByChange: '',
      initialValue: this.value ?? 0
    }
  },
  computed: {
    stepOrigin() {
      // SEE https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#attr-step
      // when `min` or `initialValue` is -Infinity/Infinity (`-Infinity` is the default value of `min`)
      // it cannot be used as origin since any value subtract Infinity is Infinity-ish
      // and Infinity cannot be used for modulo operation
      // Infinity % number -> NaN
      const origin =
        [this.min, this.initialValue].find(num => Math.abs(num) !== Infinity) ??
        0
      return origin
    },
    calibrateValuePreChange() {
      if (this.stepFixed) {
        return flow([this.applyStep, this.applyPrecision])
      }
      return this.applyPrecision
    },
    increaseDisabled() {
      return this.value >= this.max
    },
    decreaseDisabled() {
      return this.value <= this.min
    },
    inputValueFormatted() {
      if (this.lastValueInNumber === null) {
        return ''
      }
      return this.applyPrecision(this.lastValueInNumber)
    },
    ariaAttributes() {
      return {
        'aria-valuenow': this.value,
        'aria-valuemax': this.max === Infinity ? null : this.max,
        'aria-valuemin': this.min === -Infinity ? null : this.min,
        'aria-disabled': this.disabled ? 'true' : 'false'
      }
    },
    baseEvent() {
      return {
        target: {
          value: this.lastValueInNumber
        }
      }
    },
    $ownListeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
        keydown: this.keydownHandler,
        change: this.changeHandler,
        // use capture on container
        blur: () => void 0,
        focus: () => void 0
      }
    }
  },
  mounted() {
    // allow nullish default value
    if (this.value === null) {
      return
    }
    const valueInRange = this.applyRange(this.value)
    // stay in range
    if (this.value !== valueInRange) {
      this.notifyVModel(valueInRange)
      this.notifyChange(valueInRange)
      this.initialValue = valueInRange
    } else {
      this.setLastValueEmittedByChange(this.inputValueFormatted)
    }
  },

  watch: {
    value: {
      handler(value) {
        if (typeof value === 'number') {
          const valueInRange = this.applyRange(value)
          // if it is out of range
          // manually trigger v-model/change
          if (valueInRange !== value) {
            this.notifyVModel(valueInRange)
            this.notifyChange(valueInRange)
          } else {
            this.lastValueInNumber = value
          }
        }
        if (value === null) {
          this.lastValueInNumber = null
        }
      }
    }
  },
  methods: {
    operateOnValue(type, value) {
      // 如果有精度设置，就改成整数相加减再变回小数（处理浮点数相加的问题）,否则没有精度设置，就直接相加减
      const precision2Use = this.precision ?? 0
      const precisionFactor = POWER_TEN ** precision2Use
      const factor = type === 'minus' ? -1 : 1
      return (
        (value * precisionFactor + factor * this.step * precisionFactor) /
        precisionFactor
      )
    },
    // only emit number or null
    unifyValueType(val) {
      if (val === null) {
        return val
      }
      return Number(val)
    },
    notifyVModel(val) {
      const typeSafeValue = this.unifyValueType(val)
      this.$emit('update:inputNumber', typeSafeValue)
    },
    notifyChange(val) {
      const typeSafeValue = this.unifyValueType(val)
      this.$emit('change', { target: { value: typeSafeValue } })
      this.validateForChange()
      this.setLastValueEmittedByChange(typeSafeValue)
    },
    operate(type) {
      if (this.disabled) {
        return
      }
      // if using :value + @change
      // `this.lastValueInNumber` might not represent the latest value showing
      // when using Arrow button
      // because syncing props.value (where we update `this.lastValueInNumber`)
      // might not be instant but delayed
      const { value } = this.$refs.input
      // if `value === ''`, treat it as `'0'`
      const negativeCompatible = this.handleForNegative(value || '0')
      let val = parseFloat(negativeCompatible)

      val = this.operateOnValue(type, val)
      val = this.applyRange(val)
      this.notifyVModel(val)
      this.notifyChange(val)
    },
    applyStep(val) {
      const { step, stepFixed, stepOrigin } = this
      let newVal = val
      if (stepFixed) {
        const offset = newVal - stepOrigin
        // 只能输入步长的倍数
        if (offset % step !== 0) {
          newVal = stepOrigin + Math.round(offset / step) * step // 四舍五入
        }
      }
      return newVal
    },
    applyRange(val) {
      const { min, max } = this
      let newVal = val
      // 最大最小值校验
      if (newVal <= min) {
        newVal = min
      } else if (newVal >= max) {
        newVal = max
      }
      return newVal
    },
    applyPrecision(val) {
      const { precision } = this
      if (precision) {
        return val.toFixed(precision)
      }
      return val
    },
    handleForNegative(stringValue) {
      // allow input like `----0`, which is how native input[number] behave
      const negativeCompatible = /^-+$/.test(stringValue) ? '-0' : stringValue
      return negativeCompatible.replace(/^-+/, '-')
    },
    queueVModelNotification() {
      this.addToChangeHandlerQueue(this.notifyVModel)
    },
    addToChangeHandlerQueue(fn) {
      const uniqQue = new Set([...this.changeHandlerQueue, fn])
      this.changeHandlerQueue = [...uniqQue]
    },
    invokeChangeHandlerQueue(value) {
      this.changeHandlerQueue.forEach(fn => fn(value))
      this.changeHandlerQueue = []
    },
    forceSyncValue(value) {
      this.$refs.input.value = `${value}`
    },
    inputHandler(e) {
      this.$emit('input', e)
      const {
        target: { value }
      } = e
      if (value === '') {
        return this.notifyVModel(null)
      }
      const negativeCompatible = this.handleForNegative(value)
      const val = parseFloat(negativeCompatible)
      if (isNaN(negativeCompatible)) {
        // if from number/empty -> symbol, e.g. `123` -> `a` (by selection),
        // change to empty, which mimics the way how browser react
        const isPureNaN = Number.isNaN(val)
        if (isPureNaN) {
          // for :value & @change
          this.forceSyncValue('')
          this.notifyVModel(null)
        } else {
          // if from number -> number + symbol, e.g. `123` -> `123a`,
          // `123` -> `12a` (by selection)
          // keep the number
          // next line for :value & @change
          this.forceSyncValue(this.applyPrecision(val))
          this.notifyVModel(val)
        }
        return
      }

      // delay v-model update to 'change' event
      // for example:
      // if `this.precision === true`
      // cannot update value for every input event
      // or the cursor would always move to the end even if user is typing
      // in the middle like `1.2|345`
      // here also skip the range check
      // since it will be handled(corrected) in the watch logic
      this.queueVModelNotification()

      // wait for valid input of number
      // when receive `-`, will notify as `0`, but need to display `-`
      // cannot display `-` for all `0`, since input could just be a simple `0`
      if (negativeCompatible === '-0') {
        this.$nextTick().then(() => {
          this.forceSyncValue('-')
        })
      }
    },
    keydownHandler(e) {
      const { code } = e
      const keyCodes = [KEY_DOWN, KEY_UP]
      if (!keyCodes.includes(code)) {
        return false
      }
      // manually trigger 'change' once
      // so the previous update could be saved
      this.changeHandler(e)

      if (code === KEY_UP) {
        this.operate('plus')
      } else {
        this.operate('minus')
      }
      e.preventDefault()
    },
    changeHandler(e) {
      const {
        target: { value }
      } = e
      // has not changed
      if (!this.hasChangedSinceLastEmit(value)) return
      // another case is that after formatting,
      // the formatted value is the same as `this.lastValueEmittedByChange`
      let validValue =
        value === '' ? null : parseFloat(this.handleForNegative(value))
      validValue =
        validValue === null ? null : this.calibrateValuePreChange(validValue)
      // this is delaying update v-model
      if (this.hasChangedSinceLastEmit(validValue)) {
        this.invokeChangeHandlerQueue(validValue)
        this.notifyChange(validValue)
      } else {
        // `validValue` is the same as the last value emitted by `change`
        // but `validValue` is not the same as `value` displayed by <input />
        this.autoCorrectDisplayValue(validValue)
      }
    },
    hasChangedSinceLastEmit(value) {
      return `${value}` !== `${this.lastValueEmittedByChange}`
    },
    autoCorrectDisplayValue(value) {
      const isDiffFromDisplayValue = `${value}` !== this.$refs.input
      if (isDiffFromDisplayValue) {
        this.forceSyncValue(value)
      }
    },
    // when native `change` event is triggered (`<input type="text" />`)
    // try to mimic the behavior of `<input type="number" />`
    // compare HTMLInputElement.value to
    // the last value emitted by synthetic `change` event
    // only emit new synthetic `change` event if values are different
    setLastValueEmittedByChange(value) {
      this.lastValueEmittedByChange = value
    },
    validateForChange() {
      this.$formItem?.handleFormItemChange()
    },
    blurHandler(e) {
      this.$emit(e?.type ?? 'blur', {
        ...this.baseEvent,
        nativeEvent: e
      })
      this.$formItem?.handleFormItemBlur()
    },
    focusHandler(e) {
      this.$emit(e?.type ?? 'focus', {
        ...this.baseEvent,
        nativeEvent: e
      })
    }
  },
  render(h) {
    const inputNumberClassNames = [
      'c-input-number',
      `c-input-number--${this.size}`,
      `c-input-number--${this.controlPosition}`
    ]

    const decreaseClassNames = [
      'c-input-number__controls',
      'c-input-number__decrease'
    ]

    const increaseClassNames = [
      'c-input-number__controls',
      'c-input-number__increase'
    ]

    const { ...inputAttrs } = this.$attrs
    const plusFn = e => {
      e.preventDefault()
      this.operate('plus')
    }
    const minusFn = e => {
      e.preventDefault()
      this.operate('minus')
    }
    return (
      <div
        class={inputNumberClassNames}
        role="spinbutton"
        {...{ attrs: this.ariaAttributes }}
        on={{
          [`!blur`]: this.blurHandler,
          [`!focus`]: this.focusHandler
        }}
      >
        <span
          class={decreaseClassNames}
          on-click={minusFn}
          vOn:keydown_enter={minusFn}
          vOn:keydown_space={minusFn}
          user-select="none"
          tabindex="-1"
          v-longpress={minusFn}
          role="button"
          aria-label="minus"
          aria-disabled={this.decreaseDisabled ? 'true' : 'false'}
        >
          {this.controlPosition === 'left-right' ? (
            <IconMinus />
          ) : (
            <IconArrowDown />
          )}
        </span>
        <span
          class={increaseClassNames}
          on-click={plusFn}
          vOn:keydown_enter={plusFn}
          vOn:keydown_space={plusFn}
          user-select="none"
          tabindex="-1"
          v-longpress={plusFn}
          role="button"
          aria-label="plus"
          aria-disabled={this.increaseDisabled ? 'true' : 'false'}
        >
          {this.controlPosition === 'left-right' ? (
            <IconPlus />
          ) : (
            <IconArrowUp />
          )}
        </span>
        <div class="c-input-number__input">
          <input
            ref="input"
            class="c-input-number__inner"
            type="text"
            autocomplete="off"
            {...{ attrs: inputAttrs }}
            value={this.inputValueFormatted}
            disabled={this.disabled}
            on={this.$ownListeners}
          />
        </div>
      </div>
    )
  }
}
