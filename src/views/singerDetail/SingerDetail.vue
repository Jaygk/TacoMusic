<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="singerDetail" />
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getFinallyDetail } from 'api/singer'
import MusicList from './childrenCpts/MusicList'

export default {
  data() {
    return {
      singerDetail: []
    }
  },
  activated() {
    // console.log('111')
    this._getDetail()
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.img1v1Url
    },
    ...mapGetters(['singer'])
  },
  methods: {
    async _getDetail() {
      this.singerDetail = []
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      const res = await getSingerDetail(this.singer.id)
      // console.log(res)
      this.singerDetail = await getFinallyDetail(res.songs)
      // console.log(this.singerDetail)
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
  transform: translate3d(100%, 0, 0)
</style>
