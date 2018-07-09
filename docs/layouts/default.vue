<template lang="pug">
  #app
    c-header
    div.main
      transition(name='fade')
        router-view
      c-footer
</template>
