<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :title="title" :bg-image="bgImage" :songs="singerDetail" />
    </div>
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
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      const res = await getSingerDetail(this.singer.id)
      // console.log(res)
      this.singerDetail = getFinallyDetail(res.songs)
      console.log(this.singerDetail)
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'

.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background

.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
