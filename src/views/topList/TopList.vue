<template>
  <transition name="slide">
    <music-list
      :rank="rank"
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    />
  </transition>
</template>

<script>
import MusicList from 'components/musicList/MusicList'
import { getRecommendDetail } from 'api/recommend'
import { getFinallyList } from 'api/singer'
import { mapGetters } from 'vuex'

export default {
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].picUrl
      }
      return ''
    },
    ...mapGetters(['topList'])
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  created() {
    this._getMusicList()
  },
  methods: {
    async _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      
      const res = await getRecommendDetail(this.topList.id)
      this.songs = getFinallyList(res.playlist.tracks)
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"
.slide-enter-active, .slide-leave-active
  transition: all 0.3s ease

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
