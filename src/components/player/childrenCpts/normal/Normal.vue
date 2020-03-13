<template>
  <transition
    name="normal"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div class="normal-player" v-show="fullScreen">
      <!-- 背景图片(歌手图片) -->
      <div class="background">
        <img
          width="100%"
          height="100%"
          :src="currentSong.picUrl ? currentSong.picUrl : picUrl"
          alt=""
        />
      </div>
      <!-- 顶部状态栏(back按钮及歌曲标题) -->
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.artist"></h2>
      </div>
      <!-- 中间cd盘 -->
      <middle />

      <!-- 底部控制栏 -->
      <bottom />
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'

import Bottom from './childrenCpts/Bottom'
import Middle from './childrenCpts/Middle'

export default {
  computed: {
    ...mapGetters(['fullScreen', 'currentSong', 'playing', 'picUrl'])
  },
  components: {
    Bottom,
    Middle
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate(${x}px,${y}px) scale(${scale})`
        },
        60: {
          transform: `translate(0,0) scale(1.1)`
        },
        100: {
          transform: `translate(0,0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$children[0].$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$children[0].$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$children[0].$refs.cdWrapper.style.transition = 'all 0.4s'
      const { x, y, scale } = this._getPosAndScale()
      this.$children[0].$refs.cdWrapper.style[
        'transform'
      ] = `translate(${x}px,${y}px) scale(${scale})`
      this.$children[0].$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$children[0].$refs.cdWrapper.style.transition = ''
      this.$children[0].$refs.cdWrapper.style['transform'] = ''
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
.normal-player
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 150
  background: $color-background
  .background
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    opacity: 0.6
    filter: blur(20px)
  .top
    position: relative
    margin-bottom: 25px
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 9px
        font-size: $font-size-large-x
        color: $color-theme
        transform: rotate(-90deg)
    .title
      width: 70%
      margin: 0 auto
      line-height: 40px
      text-align: center
      no-wrap()
      font-size: $font-size-large
      color: $color-text
    .subtitle
      line-height: 20px
      text-align: center
      font-size: $font-size-medium
      color: $color-text

  &.normal-enter-active, &.normal-leave-active
    transition: all 0.4s
    .top, .bottom
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.normal-enter, &.normal-leave-to
    opacity: 0
    .top
      transform: translate(0, -100px)
    .bottom
      transform: translate(0, 100px)

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
