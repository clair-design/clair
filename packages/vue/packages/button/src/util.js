const validButtonSizes = ['large', 'normal', 'small']
const validButtonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
  'ghost'
]

export const buttonSizeProp = {
  type: String,
  validator(size) {
    return validButtonSizes.includes(size)
  }
}

export const buttonTypeProp = {
  type: String,
  default: 'default',
  validator(size) {
    return validButtonTypes.includes(size)
  }
}
