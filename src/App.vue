<template>
  <div id="app">
    <m-header/>

    <tab/>

    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/m-header/MHeader'
import Tab from 'components/tab/Tab'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable.styl"

  #app
    color: $color-theme
</style>
