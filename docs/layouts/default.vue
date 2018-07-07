<template lang="pug">
  #main
    c-header
    div.main
      transition(name='fade')
        router-view
      c-footer
</template>
