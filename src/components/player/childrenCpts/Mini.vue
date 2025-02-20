<template>
  <transition name="mini">
    <div @click="open" class="mini-player" v-show="!fullScreen">
      <div class="icon">
        <img
          :class="cdCls"
          width="40"
          height="40"
          :src="currentSong.picUrl ? currentSong.picUrl : picUrl"
          alt=""
        />
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.artist"></p>
      </div>
      <div class="control">
        <div class="playIcon" @click.stop="togglePlaying">
          <progress-circle
            :radius="32"
            :percent="$parent.$children[0].$children[1].percent"
          >
            <i :class="miniIcon" class="icon-mini"></i>
          </progress-circle>
        </div>
        <div @click.stop="showList" class="playlist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProgressCircle from 'components/progressCircle/ProgressCircle'

export default {
  computed: {
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters(['fullScreen', 'currentSong', 'playing', 'picUrl'])
  },
  methods: {
    open() {
      this.setFullScreen(true)
    },
    togglePlaying() {
      this.$parent.togglePlaying()
    },
    showList() {
      this.$parent.$refs.playlist.show()
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  components: {
    ProgressCircle
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
.mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      display: flex
      margin-right: 20px
      .icon-play-mini, .icon-pause-mini
        color: $color-theme-d
      .icon-playlist
        font-size: 30px
        color: $color-theme
        margin-left: 16px
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
