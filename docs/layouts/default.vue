<template lang="pug">
  #app
    c-header
    div
      transition(name='fade')
        router-view
    c-footer
</template>
