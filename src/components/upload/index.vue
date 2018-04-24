<template lang="pug">
.c-upload
  c-input(v-model="inputVal" @change="onInput")
  c-button(icon="upload" type="button" :loading="loading" @click="startUpload") 上传
  input(ref="input" type="file" @change="onFileSelected" style="display:none")
</template>

<script>
import './index.css'

export default {
  name: 'c-upload',
  props: {
    value: String,
    uploadFunction: Function
  },
  data () {
    return {
      inputVal: '',
      loading: false
    }
  },
  created () {
    this.inputVal = this.value
  },
  methods: {
    onInput () {
      this.$emit('change', this.inputVal)
    },
    startUpload () {
      if (this.loading) return
      this.$refs.input.click()
    },
    onFileSelected (e) {
      const uploadFn = this.uploadFunction || this.$clair.uploadFunction
      if (typeof uploadFn !== 'function') {
        console.error('uploadFunction is required to use uploader.')
        return
      }
      if (e.target.files.length === 0) return
      this.loading = true
      uploadFn.call(this, e.target.files).then(result => {
        this.$emit('change', result)
        this.inputVal = result
        this.loading = false
      }).catch(ex => {
        this.$emit('error', ex)
        this.loading = false
      })
    }
  }
}
</script>
