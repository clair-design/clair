<template lang="pug">
.c-upload
  span.inline-block(
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
  input.hidden(
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
import VueTypes from 'vue-types'

function noop () {}

export default {
  name: 'c-upload',
  props: {
    limit: Number,
    fileList: VueTypes.array.def([]),
    multiple: VueTypes.bool.def(false),
    autoUpload: VueTypes.bool.def(true),
    onExceed: VueTypes.func.def(noop),
    beforeUpload: Function,
    action: String,
    name: VueTypes.string.def('file'),
    headers: VueTypes.object.def({}),
    onProgress: VueTypes.func.def(noop),
    onSuccess: VueTypes.func.def(noop),
    onError: VueTypes.func.def(noop),
    data: VueTypes.object.def({})
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
        this.onExceed(files, this.fileList)
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
      if (!this.beforeUpload) return this.post(rawFile)
      const before = this.beforeUpload(rawFile)
      if (before === false) return
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
          this.onProgress(e, rawFile)
        },
        onSuccess: (res) => {
          this.onSuccess(res, rawFile)
          delete this.reqs[fid]
          this.loading = false
        },
        onError: (err) => {
          this.onError(err, rawFile)
          delete this.reqs[fid]
          this.loading = false
        }
      }
      console.log(options)
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
