<template lang="pug">
  .c-input-wrap(:class="className")
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
    em.c-error-msg(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
  import throttle from 'lodash/throttle'
  import './index.css'
  import validatable from '../validatable/'

  // SEE https://github.com/jackmoore/autosize
  // import autoSize from 'autosize'
  import calculateNodeHeight from './calcNodeHeight'

  export default {
    name: 'c-input',
    model: {
      event: 'change'
    },
    mixins: [validatable],
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
        if (this.size) classNames.push(`is-${this.size}`)
        if (this.width) classNames.push(`is-${this.width}`)
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
        this.$emit('change', e.target.value)
        this.resizeTextArea()
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
      const { multiLine, autosize } = this

      if (multiLine && autosize) {
        this.resizeTextArea()
      }

      this.resizeTextArea = throttle(this.resizeTextArea.bind(this), 200)
    }
  }
</script>
