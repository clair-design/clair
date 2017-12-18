<template lang="pug">
.c-card(:class="{'is-horizontal': horizontal}")
  .c-card__title(v-if="$slots.title")
    slot(name="title")
  .c-card__media(v-if="$slots.media")
    slot(name="media")
  .c-card__body(v-if="$slots.default")
    slot
  .c-card__actions(v-if="$slots.actions")
    slot(name="actions")
</template>

<script>
import './index.css'

export default {
  name: 'c-card',
  props: {
    horizontal: Boolean
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
