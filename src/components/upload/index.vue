<template lang="pug">
.c-upload
  span.c-upload-span--inline(
    @click="startUpload"
  )
    slot(
      name="btn"
    )
      c-button(
        primary
        type="button"
        icon="upload"
        :loading="loading"
      ) 上传文件
  input.c-upload-input--hidden(
    ref="input"
    name="file"
    type="file"
    @change="handleChange"
    :multiple="multiple"
  )
</template>

<script>
import './index.css'
import ajax from './ajax'

export default {
  name: 'c-upload',
  props: {
    limit: Number,
    fileList: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    },
    autoUpload: {
      type: Boolean,
      default () {
        return true
      }
    },
    validator: Function,
    action: String,
    name: {
      type: String,
      default () {
        return 'file'
      }
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      loading: false,
      tmpIndex: 1,
      reqs: {},
      files: []
    }
  },

  methods: {
    startUpload () {
      if (this.loading) return
      this.$refs.input.value = null
      this.$refs.input.click()
    },

    handleChange (ev) {
      const {files} = ev.target

      if (!files) return
      this.uploadFiles(files)
    },

    uploadFiles (files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.$emit('exceed', files, this.fileList)
        return
      }

      let postFiles = Array.prototype.slice.call(files)
      if (postFiles.length === 0) return
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }
      this.files = postFiles

      if (this.autoUpload === false) return
      postFiles.forEach((rawFile) => {
        this.addFid(rawFile)
        this.upload(rawFile)
      })
    },

    submit () {
      this.files.forEach((rawFile) => {
        this.addFid(rawFile)
        this.upload(rawFile)
      })
    },

    upload (rawFile) {
      if (!this.validator) return this.post(rawFile)
      const validator = this.validator(rawFile)
      if (validator === false) return
      this.post(rawFile)
    },

    post (rawFile) {
      const { fid } = rawFile
      const options = {
        headers: this.headers,
        // withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: (e) => {
          if (!this.loading) this.loading = true
          this.$emit('progress', e, rawFile)
        },
        onSuccess: (res) => {
          this.$emit('success', res, rawFile)
          delete this.reqs[fid]
          this.loading = false
        },
        onError: (err) => {
          this.$emit('error', err, rawFile)
          delete this.reqs[fid]
          this.loading = false
        }
      }
      const req = ajax(options)
      this.reqs[fid] = req
    },

    addFid (rawFile) {
      if (!rawFile.fid) {
        rawFile.fid = Date.now() + this.tmpIndex++
      }
    }
  }
}
</script>
