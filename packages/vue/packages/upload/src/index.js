import ajax from './ajax'
import { clone } from 'lodash-es'
import { AutoIncreasingCounter } from '@clair/helpers'
const autoIncreasingCounter = /*@__PURE__*/ new AutoIncreasingCounter()

const FILE_STATE_INIT = 'init'
const FILE_STATE_READY = 'ready'
const FILE_STATE_UPLOADING = 'uploading'
const FILE_STATE_FAIL = 'fail'
const FILE_STATE_SUCCESS = 'success'

const EVENT_NAME_READY = 'ready'
const EVENT_NAME_CHANGE = 'change'
const EVENT_NAME_REMOVE = 'remove'
const EVENT_NAME_OVERSIZE = 'over-size'
const EVENT_NAME_OVERCOUNT = 'over-count'
const EVENT_NAME_START = 'start'
const EVENT_NAME_PROGRESS = 'progress'
const EVENT_NAME_SUCCESS = 'success'
const EVENT_NAME_ERROR = 'error'
const EVENT_NAME_COMPLETE = 'complete'

export default {
  name: 'CUpload',
  props: {
    action: String,
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    name: {
      type: String,
      default: 'file'
    },
    // 初始化页面时默认存在的文件列表
    defaultFiles: {
      type: Array,
      default() {
        return []
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 最大文件尺寸
    maxSize: {
      type: String,
      default: '1024 MB'
    },
    // 最大文件数量
    maxCount: {
      type: [Number, String],
      default: Infinity
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    accept: String,
    httpRequest: Function,
    beforeUpload: Function,
    directory: {
      type: Boolean,
      default: false
    },
    method: {
      type: String,
      default: 'post'
    },
    droppable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      uploading: false,
      allFiles: [], // 所有通过校验的文件列表
      completeFiles: [], // 触发complete事件时需要回传的参数
      dragover: false
    }
  },

  computed: {
    readyFiles() {
      return this.allFiles.filter(file => file.fileState === FILE_STATE_READY)
    },
    uploadingFiles() {
      return this.allFiles.filter(
        file => file.fileState === FILE_STATE_UPLOADING
      )
    },
    acceptedTypeList() {
      return this.accept.split(',').map(type => type.trim())
    }
  },

  methods: {
    /**
     * 工具方法
     */
    clone(files) {
      return files.map(file => clone(file))
    },
    sizeToByte(size) {
      const rate = 1024
      const regex = /^(\d+\.*\d*)\s*(\w+)$/gi
      const [, num, unit] = regex.exec(size)
      const unitLocaleUpperCase = unit.toLocaleUpperCase()
      switch (unitLocaleUpperCase) {
        case 'KB':
          return num * rate
        case 'MB':
          return num * rate * rate
        case 'GB':
          return num * rate * rate * rate
        default:
          return 0
      }
    },
    initFiles(files) {
      files.forEach(file => {
        file.fileId = autoIncreasingCounter.next()
        file.fileState = FILE_STATE_INIT
        file.percent = 0
      })
    },
    concatAllFiles(files) {
      this.allFiles = this.allFiles.concat(files)
    },
    removeReadyFileFromAllFiles() {
      this.allFiles = this.allFiles.filter(
        allFile => allFile.fileState !== FILE_STATE_READY
      )
    },
    filesToState(files, state) {
      files.forEach(file => (file.fileState = state))
    },
    // 获取超过最大尺寸的文件数组
    getOverMaxSizeFiles(files) {
      return files.filter(file => {
        const maxSize = this.sizeToByte(this.maxSize)
        return file.rawFile.size > maxSize
      })
    },
    // 是否超过最大数量
    checkOverMaxAmount(files) {
      return files.length > this.maxCount
    },
    remove(fileIds) {
      if (!Array.isArray(fileIds)) {
        throw new TypeError('fileIds is not an array type')
      }
      this.allFiles = this.allFiles.filter(allFile => {
        return !fileIds.includes(allFile.fileId)
      })
      const detail = { allFiles: this.clone(this.allFiles) }
      this.$emit(EVENT_NAME_REMOVE, { detail })
    },
    emitChange(type) {
      this.$emit(EVENT_NAME_CHANGE, {
        detail: { allFiles: this.clone(this.allFiles), type }
      })
    },

    /**
     * 拖拽逻辑
     */
    onDragenter(ev) {
      ev.preventDefault()
      if (this.disabled || this.uploading) return

      this.dragover = true
    },
    onDrop(ev) {
      ev.preventDefault()
      this.dragover = false

      if (this.disabled || this.uploading) return

      const { accept } = this
      const files = Array.from(ev.dataTransfer.files || [])

      if (!accept) {
        this.onChangeUpload({ target: { files } })
        return
      }
      const adoptedFiles = files.filter(file => {
        const extension = file.name.includes('.')
          ? `.${file.name.split('.').pop()}`
          : ''
        const baseType = file.type.replace(/\/.*$/, '')
        return this.acceptedTypeList.some(acceptedType => {
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
      })
      this.onChangeUpload({ target: { files: adoptedFiles } })
    },
    onDragleave(ev) {
      ev.preventDefault()
      if (this.disabled || this.uploading) return

      this.dragover = false
    },

    /**
     * 组件逻辑
     */
    submit() {
      this.uploadFiles()
    },
    onClickUploadButton() {
      if (this.uploading || this.disabled) return
      const { inputFile } = this.$refs
      inputFile.value = null
      inputFile.click()
    },
    onChangeUpload(event) {
      const rawFiles = Array.from(event.target.files || [])
      const changeFiles = rawFiles.map(rawFile => ({ rawFile }))
      if (changeFiles.length === 0) return

      /**
       * 校验文件数量与尺寸是否符合要求
       */
      const overMaxSizeFiles = this.getOverMaxSizeFiles(changeFiles)
      if (overMaxSizeFiles.length !== 0) {
        const detail = {
          overMaxSizeFiles: this.clone(overMaxSizeFiles),
          allFiles: this.clone(this.allFiles)
        }
        this.$emit(EVENT_NAME_OVERSIZE, { detail })
      }

      const allFiles = this.allFiles.concat(changeFiles)
      const validOverMaxAmount = this.checkOverMaxAmount(allFiles)
      if (validOverMaxAmount) {
        const detail = {
          changeFiles: this.clone(changeFiles),
          allFiles: this.clone(allFiles)
        }
        this.$emit(EVENT_NAME_OVERCOUNT, { detail })
      }
      if (overMaxSizeFiles.length !== 0 || validOverMaxAmount) return

      /**
       * 通过校验
       */
      this.initFiles(changeFiles)
      this.filesToState(changeFiles, FILE_STATE_READY)
      this.concatAllFiles(changeFiles)

      this.$emit(EVENT_NAME_READY, {
        detail: {
          readyFiles: this.clone(this.readyFiles),
          allFiles: this.clone(this.allFiles)
        }
      })
      if (this.autoUpload) this.uploadFiles()
    },
    async uploadFiles() {
      if (this.readyFiles.length === 0) return

      // beforeUpload
      if (this.beforeUpload instanceof Function) {
        let rawFiles
        try {
          const detail = {
            readyFiles: this.clone(this.readyFiles),
            allFiles: this.clone(this.allFiles)
          }
          rawFiles = await this.beforeUpload({ detail })
        } catch (err) {
          this.removeReadyFileFromAllFiles()
          return
        }
        if (Array.isArray(rawFiles)) {
          // 如果返回files则先remove掉原来写入allFiles数组的文件
          this.removeReadyFileFromAllFiles()

          rawFiles.forEach(rawFile => {
            if (!(rawFile instanceof File)) {
              throw TypeError('rawFile is not an File type')
            }
          })

          const files = rawFiles.map(rawFile => ({ rawFile }))

          // 将files文件当作新文件来处理
          this.initFiles(files)
          this.concatAllFiles(files)
          this.filesToState(files, FILE_STATE_READY)
        }
      }

      this.uploading = true
      const detail = {
        readyFiles: this.clone(this.readyFiles),
        allFiles: this.clone(this.allFiles)
      }
      this.$emit(EVENT_NAME_START, { detail })
      this.readyFiles.forEach(file => {
        this.upload(file)
      })
    },
    upload(file) {
      file.fileState = FILE_STATE_UPLOADING
      const complete = () => {
        this.uploading = false
        const detail = {
          completeFiles: this.clone(this.completeFiles),
          allFiles: this.clone(this.allFiles)
        }
        this.$emit(EVENT_NAME_COMPLETE, { detail })
        this.completeFiles = []
      }
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: file.rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        method: this.method,
        onProgress: event => {
          if (event.total > 0) {
            const TOTAL_PERCENT = 100
            file.percent = (event.loaded / event.total) * TOTAL_PERCENT
          }
          const detail = {
            file,
            allFiles: this.clone(this.allFiles)
          }
          const nativeEvent = event
          this.$emit(EVENT_NAME_PROGRESS, { detail, nativeEvent })
          this.emitChange(EVENT_NAME_PROGRESS)
        },
        onSuccess: response => {
          this.completeFiles.push(file)
          this.filesToState([file], FILE_STATE_SUCCESS)
          const detail = {
            file,
            allFiles: this.clone(this.allFiles),
            response
          }
          this.$emit(EVENT_NAME_SUCCESS, { detail })
          this.emitChange(EVENT_NAME_SUCCESS)
          if (this.uploadingFiles.length === 0) {
            complete()
          }
        },
        onError: err => {
          this.completeFiles.push(file)
          this.filesToState([file], FILE_STATE_FAIL)
          const detail = {
            file,
            allFiles: this.clone(this.allFiles)
          }
          const nativeEvent = err
          this.$emit(EVENT_NAME_ERROR, { detail, nativeEvent })
          this.emitChange(EVENT_NAME_ERROR)
          if (this.uploadingFiles.length === 0) {
            complete()
          }
        }
      }

      const useCustomAjax = this.httpRequest instanceof Function
      if (!useCustomAjax) return ajax(options)

      this.httpRequest({
        headers: options.headers,
        withCredentials: options.withCredentials,
        file: options.file,
        data: options.data,
        filename: options.filename,
        action: options.action
      })
        .then(options.onSuccess)
        .catch(options.onError)
    }
  },

  render() {
    const icon = this.uploading ? (
      <c-icon-spin class="c-upload__loading-icon" />
    ) : (
      ''
    )
    const button = (
      <c-button
        {...{ props: this.$attrs }}
        type={this.type}
        disabled={this.disabled}
      >
        {icon}上传
      </c-button>
    )
    const defaultDrop = (
      <div
        class={`c-upload__drop ${this.dragover ? 'c-upload__drop--enter' : ''}`}
      >
        <c-icon-upload class="c-upload__drop-icon" />
        <p class="c-upload__drop-text">点击或将文件拖拽到这里上传</p>
        <p class="c-upload__drop-accept-text">
          支持扩展名：{this.accept || '*'}
        </p>
      </div>
    )
    return (
      <div class="c-upload" onClick={this.onClickUploadButton}>
        {this.droppable ? (
          <div
            aria-label="上传"
            onDragenter={this.onDragenter}
            onDrop={this.onDrop}
            onDragover={this.onDragenter}
            onDragleave={this.onDragleave}
          >
            {this.$slots.trigger || defaultDrop}
          </div>
        ) : (
          <div aria-label="上传">{this.$slots.trigger || button}</div>
        )}
        <input
          ref="inputFile"
          name={this.name}
          type="file"
          onChange={this.onChangeUpload}
          class="c-upload--hidden"
          multiple={this.multiple}
          accept={this.accept}
          directory={this.directory}
          webkitdirectory={this.directory}
        />
      </div>
    )
  }
}
