/**
 * 检查是否该文件类型在指定列表中
 * @param file File
 */
export const isFileTypeAccepted = (acceptedTypeList: Array<String>) => {
  return (file: File) => {
    const extension = file.name.includes('.')
      ? `.${file.name.split('.').pop()}`
      : ''
    const baseType = file.type.replace(/\/.*$/, '')

    return acceptedTypeList.some(acceptedTypeObj => {
      const acceptedType = acceptedTypeObj.toString()
      // 此处尝试匹配以.开头的字符串，如 `.jpg` `.css` 等
      if (/^\..+$/.test(acceptedType)) {
        return extension === acceptedType
      }

      // 此处尝试匹配 `image/*` 等
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '')
      }

      // 此处尝试匹配 `image/png` `image/jpeg` 等
      if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
        return file.type === acceptedType
      }

      // 如果都没匹配则返回 `false`
      return false
    })
  }
}
