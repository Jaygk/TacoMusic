<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singerList" ref="list" />
  </div>
</template>

<script>
import { getSingerList, getSingers } from 'api/singer'
import ListView from './childrenCpts/ListView'

import { playlistMixin } from 'utils/mixins'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singerList: []
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.singer.style.bottom = bottom
    },
    async _getSingerList() {
      const res = await getSingers()
      this.singerList = getSingerList(res.list.artists)
      // console.log(this.singerList)
    },

    selectSinger(id) {
      // console.log(data.name)
      this.$router.push(`/singerDetail/${id}`)
    }
  },
  created() {
    this._getSingerList()
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
