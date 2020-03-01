<template>
  <div id="app">
    <m-header/>

    <tab/>

    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/mHeader/MHeader'
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
