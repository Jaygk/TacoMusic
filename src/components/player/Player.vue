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
      this.currentTime = e.target.currentTime
      this.duration = e.target.duration
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.$children[0].$children[1].nextSong()
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
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
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  },
  mounted() {
    this.$bus.$on('percentChange', percent => {
      // console.log(percent)
      this.$refs.audio.currentTime = this.duration * percent
      if (!this.playing) this.togglePlaying()
    })
  }
}
</script>

<style lang="stylus" scoped></style>
