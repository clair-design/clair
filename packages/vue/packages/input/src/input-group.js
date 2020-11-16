import { inputGroupProps } from './util'

export default {
  name: 'CInputGroup',

  props: inputGroupProps,

  render() {
    const className = [
      'c-input-group',
      `c-input-group--${this.size}`,
      this.disabled && 'c-input-group--disabled'
    ]
    return (
      <div class={className} id={this.id}>
        {this.$scopedSlots?.prefix?.()}
        {this.$scopedSlots?.default?.()}
        {this.$scopedSlots?.suffix?.()}
      </div>
    )
  }
}
