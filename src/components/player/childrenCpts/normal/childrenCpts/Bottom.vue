<template>
  <div class="bottom">
    <div class="dot-wrapper">
      <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
      <span class="dot" :class="{ active: currentShow === 'lyric' }"></span>
    </div>
    <div class="progress-wrapper">
      <span class="time time-l">{{ currentTime | format }}</span>
      <div class="progress-bar-wrapper">
        <progress-bar :percent="percent" />
      </div>
      <span class="time time-r">{{ duration | format }}</span>
    </div>
    <div class="operators">
      <!-- 循环模式 -->
      <div class="icon i-left" @click="changeMode">
        <i :class="iconMode"></i>
      </div>
      <!-- 上一首 -->
      <div class="icon i-left">
        <i class="icon-prev" @click="prevSong"></i>
      </div>
      <!-- 播放/暂停 -->
      <div class="icon i-center">
        <i :class="playIcon" @click="togglePlaying"></i>
      </div>
      <!-- 下一首 -->
      <div class="icon i-right">
        <i class="icon-next" @click="nextSong"></i>
      </div>
      <!-- 点击收藏/取消 -->
      <div class="icon i-right">
        <i class="icon icon-not-favorite"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ProgressBar from 'components/progressBar/ProgressBar'
import { playMode } from 'utils/config'
import { shuffle } from 'utils/shuffle'

export default {
  data() {
    return {
      currentShow: 'cd'
    }
  },
  computed: {
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    currentTime() {
      return this.$parent.$parent.currentTime
    },
    duration() {
      return this.$parent.$parent.duration
    },
    percent() {
      return this.currentTime / this.duration
    },
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
        ? 'icon-loop'
        : 'icon-random'
    },
    ...mapGetters([
      'playlist',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList',
      'currentSong'
    ])
  },
  methods: {
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    nextSong() {
      if (this.playlist.length === 1) {
        this.$parent.$parent.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) index = 0
        // 获取歌曲url
        this.setUrl(this.playlist[index].id)
        this.setCurrentIndex(index)
        // console.log(this.playlist[index].id)

        if (!this.playing) this.togglePlaying()
      }
    },
    prevSong() {
      if (this.playlist.length === 1) {
        this.$parent.$parent.loop()
      } else {
        let index = this.currentIndex - 1
        if (index < 0) index = this.playlist.length - 1
        this.setCurrentIndex(index)
        this.setUrl(this.playlist[index].id)

        if (!this.playing) this.togglePlaying()
      }
    },
    changeMode() {
      // 改变播放模式
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)

      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => item.id === this.currentSong.id)
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    }),
    ...mapActions(['setUrl'])
  },
  components: {
    ProgressBar
  },
  filters: {
    format(interval) {
      // 处理时间,化为mm:ss的形式
      interval = interval | 0
      let minute = (interval / 60) | 0
      minute = minute.toString().padStart(2, '0')
      let second = interval % 60
      second = second.toString().padStart(2, '0')
      return `${minute}:${second}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
.bottom
    position: absolute
    bottom: 50px
    width: 100%
    .dot-wrapper
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        vertical-align: middle
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
    .progress-wrapper
      display: flex
      align-items: center
      width: 80%
      margin: 0px auto
      padding: 10px 0
      .time
        color: $color-text
        font-size: $font-size-small
        flex: 0 0 30px
        line-height: 30px
        width: 30px
        &.time-l
          text-align: left
        &.time-r
          text-align: right
      .progress-bar-wrapper
        flex: 1
    .operators
      display: flex
      align-items: center
      .icon
        flex: 1
        color: $color-theme
        &.disable
          color: $color-theme-d
        i
          font-size: 30px
      .i-left
        text-align: right
      .i-center
        padding: 0 20px
        text-align: center
        i
          font-size: 40px
      .i-right
        text-align: left
      .icon-favorite
        color: $color-sub-theme
</style>
