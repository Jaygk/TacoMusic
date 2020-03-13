<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="box">
      <search-box @search="toSearch" :searchDefault="searchDefault" />
    </div>

    <scroll :data="hotSearch" class="scroll" ref="scroll">
      <div class="list">
        <!-- 搜索历史 -->
        <history />
        <!-- 热门搜索 -->
        <hot-search @select="toSearch" :hotList="hotSearch" />
      </div>
    </scroll>

    <!-- 加载等待组件 -->
    <div class="loading-container" v-show="!hotSearch.length">
      <loading />
    </div>
  </div>
</template>

<script>
import SearchBox from 'components/searchBox/SearchBox'
import History from './childrenCpts/History'
import HotSearch from './childrenCpts/HotSearch'
import Scroll from 'components/scroll/Scroll'
import Loading from 'components/loading/Loading'

import { getSearchDefault, getHotSearch } from 'api/search'
import { playlistMixin } from 'utils/mixins'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      searchDefault: null,
      hotSearch: []
    }
  },
  components: {
    SearchBox,
    History,
    HotSearch,
    Scroll,
    Loading
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.scroll.$el.style.bottom = bottom
    },
    async _getSearchDefault() {
      this.searchDefault = null
      const res = await getSearchDefault()
      this.searchDefault = res.data
      // console.log(this.searchDefault)
    },

    async _getHotSearch() {
      this.hotSearch = []
      const res = await getHotSearch()
      this.hotSearch = res.data
    },

    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    toSearch(keywords) {
      this.$router.push({
        name: 'result',
        params: {
          keywords
        }
      })
    }
  },
  activated() {
    this._getSearchDefault()
    this._getHotSearch()
    this.refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.search
  .box
    margin: 6px 12px 0 12px
  .scroll
    position: fixed
    top: 140px
    left: 0
    right: 0
    bottom: 0
    background: $color-background
    overflow: hidden
    .list
      padding: 20px 12px 0
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
