<template>
  <div class="rank" ref="rank">
    <scroll :data="worldList" class="toplist" ref="toplist">
      <div>
        <official-list @select="selectItem" :officialList="officialList" />

        <world-list @select="selectItem" :worldList="worldList" />
      </div>
      <div class="loading-container" v-show="!topList.length">
        <loading />
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import Loading from 'components/loading/Loading'
import { getFinallyTopList } from 'api/rank'
import { playlistMixin } from 'utils/mixins'
import { mapMutations } from 'vuex'

import OfficialList from './childrenCpts/OfficialList'
import WorldList from './childrenCpts/WorldList'

export default {
  mixins: [playlistMixin],
  created() {
    this._getTopList()
  },
  data() {
    return {
      topList: [],
      officialList: [],
      worldList: []
    }
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.$refs.toplist.refresh()
      })
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.rank.style.bottom = bottom
      this.refresh()
    },
    selectItem(item) {
      this.$router.push(`/rank/${item.id}`)
      this.setTopList(item)
    },
    async _getTopList() {
      this.topList = await getFinallyTopList()
      this.officialList = this.topList[0]
      this.worldList = this.topList[1]
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  watch: {},
  components: {
    Scroll,
    Loading,
    OfficialList,
    WorldList
  },
  activated() {
    this.refresh()
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .toplist
    height: 100%
    overflow: hidden
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
