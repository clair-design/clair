<template lang="pug">
.c-upload.is-inline-block
  label.is-inline-block(
    @click.prevent="chooseFile"
  )
    slot(name="btn")
      c-button(
        v-bind='$attrs'
        type="button"
        icon="upload"
        :loading="loading"
      ) 上传文件
    slot(name="file-list" :filenames="filenames")
      span.has-padding-left-sm(
        v-for="(item, index) in filenames"
      ) {{item}}
  input.is-none(
    ref="input"
    name="file"
    type="file"
    :accept="accept"
    @change="handleChange"
    :multiple="multiple"
  )
</template>

<script>
import './index.css'
import ajax from './ajax'
let uploadFileCount = 0

export default {
  name: 'c-upload',
  props: {
    limit: Number,
    defaultFileList: {
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
    accept: String,
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
    },
    httpRequest: Function
  },

  data () {
    return {
      loading: false,
      tmpIndex: 1,
      reqs: {},
      files: [],
      filenames: [],
      remoteFilenames: []
    }
  },

  methods: {
    chooseFile () {
      if (this.loading) return
      this.$refs.input.value = null
      this.$refs.input.click()
    },

    handleChange (ev) {
      const { files } = ev.target

      if (!files) return
      this.uploadFiles(files)
    },

    uploadFiles (files) {
      if (this.limit && this.defaultFileList.length + files.length > this.limit) {
        this.$emit('exceed', files, this.defaultFileList)
        return
      }

      let postFiles = Array.from(files)
      if (postFiles.length === 0) return
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }
      this.files = postFiles
      this.filenames = postFiles.map((file) => {
        return file.name
      })

      if (this.autoUpload === false) return
      this.submit()
    },

    submit () {
      this.files.forEach((rawFile) => {
        this.addFid(rawFile)
        this.upload(rawFile)
      })
    },

    upload (rawFile) {
      if (!this.validator) return this.post(rawFile)
      const isValid = this.validator(rawFile)
      if (isValid) this.post(rawFile)
    },

    async post (rawFile) {
      this.loading = true
      uploadFileCount++
      const { fid } = rawFile
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: (e) => {
          this.$emit('progress', e, rawFile)
        },
        onSuccess: (res) => {
          this.$emit('success', res, rawFile)
          delete this.reqs[fid]
          uploadFileCount--
          if (uploadFileCount === 0) this.loading = false
        },
        onError: (err) => {
          this.$emit('error', err, rawFile)
          delete this.reqs[fid]
          uploadFileCount--
          if (uploadFileCount === 0) this.loading = false
        }
      }
      if (this.httpRequest instanceof Function) {
        const {headers, file, data, filename, action} = options
        this.reqs[fid] = this.httpRequest({
          headers, file, data, filename, action
        })
          .then(options.onSuccess)
          .catch(options.onError)
        return
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
