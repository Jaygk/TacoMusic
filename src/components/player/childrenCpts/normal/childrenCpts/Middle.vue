<template>
  <div class="middle">
    <div class="middle-l">
      <div class="cd-wrapper" ref="cdWrapper">
        <div class="cd" :class="cdCls">
          <img :src="currentSong.picUrl" class="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters(['currentSong', 'playing'])
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
.middle
    position: fixed
    width: 100%
    top: 80px
    bottom: 170px
    white-space: nowrap
    font-size: 0
    .middle-l
      display: inline-block
      vertical-align: top
      position: relative
      width: 100%
      height: 0
      padding-top: 80%
      .cd-wrapper
        position: absolute
        left: 10%
        top: 0
        width: 80%
        height: 100%
        .cd
          width: 100%
          height: 100%
          box-sizing: border-box
          border: 10px solid rgba(255, 255, 255, 0.1)
          border-radius: 50%
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state: paused
          .image
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            border-radius: 50%

      .playing-lyric-wrapper
        width: 80%
        margin: 30px auto 0 auto
        overflow: hidden
        text-align: center
        .playing-lyric
          height: 20px
          line-height: 20px
          font-size: $font-size-medium
          color: $color-text-l
    .middle-r
      display: inline-block
      vertical-align: top
      width: 100%
      height: 100%
      overflow: hidden
      .lyric-wrapper
        width: 80%
        margin: 0 auto
        overflow: hidden
        text-align: center
        .text
          line-height: 32px
          color: $color-text-l
          font-size: $font-size-medium
          &.current
            color: $color-text

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
