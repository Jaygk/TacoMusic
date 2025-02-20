<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div
          ref="playBtn"
          v-show="songs.length > 0"
          class="play"
          @click="playAllSongs"
        >
          <i class="icon-play"></i>
          <span class="text">播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      @scroll="scroll"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      :data="songs"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :rank="rank" @select="selectItem" :songs="songs" />
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import Loading from 'components/loading/Loading'
import SongList from 'components/songList/SongList'
import { mapActions } from 'vuex'

import { playlistMixin } from 'utils/mixins'

const RESERVED_HEIGHT = 40

export default {
  mixins: [playlistMixin],
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {},
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    playAllSongs() {
      this.playAll(this.songs)
    },
    ...mapActions(['selectPlay', 'playAll'])
  },
  watch: {
    scrollY(newVal) {
      // 设置layer移动的最大距离
      let translateY = Math.max(this.minTranslateY, newVal)
      let zIndex = 0
      let scale = 1 // 背景图片放大倍数
      let blur = 0 // 背景模糊程度

      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }

      // layer跟随列表滚动到指定距离,达到遮挡背景图片的目的
      this.$refs.layer.style['transform'] = `translate(0, ${translateY}px)`
      // 背景图被逐渐遮住时设置高斯模糊
      this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`

      if (newVal < this.minTranslateY) {
        // 当layer到达指定位置后
        zIndex = 10 // 遮住歌曲列表

        // 设置背景图片高度和大小
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        // 隐藏播放按钮
        this.$refs.playBtn.style.display = 'none'
      } else {
        // 当layer未达到指定位置时,恢复背景图片大小和高度
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        // 显示播放按钮
        this.$refs.playBtn.style.display = ''
      }
      // 改变背景图片的z-index,实现列表的overflow: hidden的效果
      this.$refs.bgImage.style['z-index'] = zIndex

      // 改变背景图片的缩放程度
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
    }
  },
  components: {
    Scroll,
    Loading,
    SongList
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 120px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .song-list-wrapper
      padding: 20px 30px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
