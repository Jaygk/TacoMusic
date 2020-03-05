<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="recommend" />
  </transition>
</template>
<script>
import { getFinallyList } from 'api/singer'
import { getRecommendDetail } from 'api/recommend'
import MusicList from 'components/musicList/MusicList'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      recommend: []
    }
  },
  created() {
    this._getDetail()
  },
  computed: {
    title() {
      return this.recommendDetail.name
    },
    bgImage() {
      return this.recommendDetail.coverImgUrl
    },
    ...mapGetters(['recommendDetail'])
  },
  methods: {
    async _getDetail() {
      this.recommend = []
      if (!this.recommendDetail.id) {
        this.$router.push('/recommend')
        return
      }
      const res = await getRecommendDetail(this.recommendDetail.id)

      this.recommend = getFinallyList(res.playlist.tracks)
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate(100%, 0)
</style>
