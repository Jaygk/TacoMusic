<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- 播放页 -->
    <normal />

    <!-- 迷你播放器 -->
    <mini />

    <audio
      :src="currentSong.songUrl"
      ref="audio"
      @canplay="ready"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Normal from './childrenCpts/Normal'
import Mini from './childrenCpts/Mini'

export default {
  data() {
    return {
      songReady: false
    }
  },
  computed: {
    ...mapGetters(['playlist', 'currentSong', 'playing'])
  },
  components: {
    Normal,
    Mini
  },
  methods: {
    ready() {
      this.songReady = true
    },
    error() {
      // this.ready()
    },

    ...mapMutations({})
  },
  watch: {
    currentSong() {
      // 切换歌曲后,播放歌曲
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newVal) {
      // 监听播放状态,控制歌曲播放/暂停
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newVal ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
