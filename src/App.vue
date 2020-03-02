<template>
  <div id="app">
    <m-header />

    <tab />

    <keep-alive>
      <router-view />
    </keep-alive>

    <player />
  </div>
</template>

<script>
import MHeader from 'components/mHeader/MHeader'
import Tab from 'components/tab/Tab'
import Player from 'components/player/Player'

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"

#app
  color: $color-theme
</style>
