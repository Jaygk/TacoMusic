<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- 播放页 -->
    <normal />

    <!-- 迷你播放器 -->
    <mini />

    <audio
      :src="songUrl"
      ref="audio"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Normal from './childrenCpts/normal/Normal'
import Mini from './childrenCpts/Mini'
import { playMode } from 'assets/js/config'

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0
    }
  },
  computed: {
    ...mapGetters(['playlist', 'currentSong', 'playing', 'mode', 'songUrl'])
  },
  components: {
    Normal,
    Mini
  },
  methods: {
    // 切换播放状态
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    ready() {
      this.songReady = true
    },
    error() {
      // this.ready()
    },
    updateTime(e) {
      // 获取播放歌曲的总时长及当前播放时间
      this.currentTime = e.target.currentTime
      this.duration = e.target.duration
    },
    end() {
      // 根据播放模式,做出相应处理
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.$children[0].$children[1].nextSong()
      }
    },
    loop() {
      // 单曲循环模式
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()

      if (this.$children[0].$children[0].currentLyric) {
        this.$children[0].$children[0].currentLyric.seek(0)
      }
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  watch: {
    playing(newVal) {
      // 监听播放状态,控制歌曲播放/暂停
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newVal ? audio.play() : audio.pause()
      })
    },
    songUrl() {
      // 监听播放歌曲的变化
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  },
  mounted() {
    // 操作进度条,改变歌曲播放时间
    this.$bus.$on('percentChange', percent => {
      const currentTime = this.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) this.togglePlaying()

      if (this.$children[0].$children[0].currentLyric) {
        this.$children[0].$children[0].currentLyric.seek(currentTime * 1000)
      }
    })
  }
}
</script>

<style lang="stylus" scoped></style>
