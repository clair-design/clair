<template>
  <c-switch
    checkedColor="#C7543A"
    uncheckedColor="#E9CD4C"
    v-model="checked"
  />
</template>

<script>
import Switch from '@/components/switch'

export default {
  components: {
    'c-switch': Switch
  },
  data () {
    return {
      checked: true
    }
  }
}
</script>
