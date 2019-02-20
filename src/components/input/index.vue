<template lang="pug">
  .c-input-wrap(:class="className")
    slot(name="prepend")
    input.c-input(
      v-if="!multiLine"
      :type="type"
      :name="name"
      v-model="inputValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="onChange"
      @change="onChange"
      @blur="onBlur"
      ref="nativeInput"
    )
    textarea.c-input(
      v-if="multiLine"
      :name="name"
      v-model="inputValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :wrap="wrap"
      :style="textAreaStyle"
      @input="onChange"
      @change="onChange"
      ref="textArea"
    )
    slot(name="append")
    em.c-error-msg(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
import throttle from 'lodash/throttle'
import './index.css'
import validatable from '@scripts/mixins/validatable'
import resettable from '@scripts/mixins/resettable'

// SEE https://github.com/jackmoore/autosize
// import autoSize from 'autosize'
import calculateNodeHeight from './calcNodeHeight'

export default {
  name: 'c-input',
  model: {
    event: 'change'
  },
  mixins: [validatable, resettable],
  inject: {
    $form: { default: null }
  },
  props: {
    value: {
      type: [String, Number],
      default () {
        return ''
      }
    },
    placeholder: String,
    size: String,
    width: String,
    readonly: Boolean,
    disabled: Boolean,
    multiLine: Boolean,
    autosize: Array,
    autofocus: Boolean,
    wrap: String,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 60
    },
    maxlength: [Number, String]
  },
  computed: {
    className () {
      const classNames = []
      if (!this.validity.valid) classNames.push('c-input--error')
      const { size, width, $form } = this
      const actualSize = size || ($form && $form.size)
      const actualWidth = width || ($form && $form.width)
      if (actualSize) classNames.push(`is-${actualSize}`)
      if (actualWidth) classNames.push(`is-${actualWidth}`)
      return classNames
    }
  },
  data () {
    return {
      origRows: this.rows,
      textAreaStyle: {},
      inputValue: ''
    }
  },

  watch: {
    value: {
      handler (val) {
        this.inputValue = val
      },
      immediate: true
    }
  },

  methods: {
    onChange (e) {
      this.$emit('change', e.target.value, e)
      this.resizeTextArea()
    },

    onBlur (e) {
      this.$emit('blur', e.target.value, e)
    },

    resizeTextArea () {
      const { multiLine, autosize } = this
      if (multiLine && autosize) {
        const [minRows, maxRows] = this.autosize
        const node = this.$refs.textArea

        this.$nextTick(() => {
          const style = calculateNodeHeight(node, false, minRows, maxRows)
          this.textAreaStyle = style
        })
      }
    }
  },

  mounted () {
    const { multiLine, autosize, autofocus } = this

    if (multiLine && autosize) {
      this.resizeTextArea()
    }
    if (autofocus) {
      this.$refs.nativeInput.focus()
    }

    const { defaultThrottleTime } = this.$clair
    this.resizeTextArea = throttle(
      this.resizeTextArea.bind(this), defaultThrottleTime)
  }
}
</script>
