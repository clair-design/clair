import { Select, Option } from 'packages/select'

export default {
  name: 'CPaginationSizeSelect',
  props: {
    value: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      validator(val) {
        return val.length && val.every(size => typeof size === 'number')
      },
      required: true
    }
  },
  data() {
    return {
      suffix: `条/页` // i18n, maybe
    }
  },
  computed: {
    optionsFrag() {
      return this.options.map(size => (
        <Option value={size} key={size} label={`${size}${this.suffix}`} />
      ))
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e)
    }
  },
  render() {
    return (
      <Select value={this.value} onChange={this.onChange}>
        {this.optionsFrag}
      </Select>
    )
  }
}
