<template>
  <div
    class="middle"
    @touchstart.prevent="middleTouchStart"
    @touchmove.prevent="middleTouchMove"
    @touchend="middleTouchEnd"
  >
    <div class="middle-l" ref="middleL">
      <div class="cd-wrapper" ref="cdWrapper">
        <div class="cd" :class="cdCls">
          <img
            class="image"
            :src="currentSong.picUrl ? currentSong.picUrl : picUrl"
          />
        </div>
      </div>
      <div class="playing-lyric-wrapper">
        <div class="playing-lyric">{{ playingLyric }}</div>
      </div>
    </div>
    <scroll
      class="middle-r"
      ref="lyricList"
      :data="currentLyric && currentLyric.lines"
    >
      <div class="lyric-wrapper">
        <div v-if="currentLyric">
          <p
            ref="lyricLine"
            class="text"
            :class="{ current: currentLineNum === index }"
            v-for="(line, index) in currentLyric.lines"
            :key="line.txt + Math.random() * 1000"
          >
            {{ line.txt }}
          </p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLyric } from 'api/song'
import Lyric from 'lyric-parser'
import Scroll from 'components/scroll/Scroll'

export default {
  data() {
    return {
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: '',
      scrollLyric: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollLyric = this.$refs.lyricList
    })
  },
  created() {
    this.touch = {}
  },
  computed: {
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters([
      'currentSong',
      'playing',
      'playlist',
      'fullScreen',
      'picUrl'
    ])
  },
  watch: {
    currentSong(newVal) {
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentLyric = null
        this.playingLyric = ''
      }

      if (!newVal.name) return
      
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        await this._getLyric(newVal.id)
      }, 1000)
    },
    fullScreen(newVal) {
      if (newVal) {
        if (this.$parent.$children[1].currentShow === 'lyric') {
          this.touchEnd()
        }
        if (this.currentLineNum <= 6) return

        this.scrollLyric.scrollTo(0, -(this.currentLineNum - 6) * 32, 1000)
      }
    }
  },
  methods: {
    async _getLyric(id) {
      try {
        if (this.currentSong.id !== id) return
        const res = await getLyric(id)
        if (!res.lrc) {
          this.currentLyric = null
          this.playingLyric = '纯音乐,请欣赏'
        } else {
          this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)

          if (this.playing) this.currentLyric.play()
        }
      } catch (error) {
        this.currentLyric = null
        this.playingLyric = ''
        // this.currentLineNum = 0
      }
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum

      if (lineNum > 6) {
        let lineEl = this.$refs.lyricLine[lineNum - 6]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      // 用来判断是否是一次移动
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left =
        this.$parent.$children[1].currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[
        'transform'
      ] = `translate(${offsetWidth}px,0)`
      this.$refs.lyricList.$el.style['transitionDuration'] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style['transitionDuration'] = 0
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      this.touchEnd()
      this.touch.initiated = false
    },
    touchEnd() {
      let offsetWidth
      let opacity
      if (this.$parent.$children[1].currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.$parent.$children[1].currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.$parent.$children[1].currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[
        'transform'
      ] = `translate(${offsetWidth}px,0)`
      this.$refs.lyricList.$el.style['transitionDuration'] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style['transitionDuration'] = `${time}ms`
    }
  },
  components: {
    Scroll
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
        margin: 50px auto 0 auto
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
