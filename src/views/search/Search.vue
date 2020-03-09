<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="box">
      <search-box @search="toSearch" :searchDefault="searchDefault" />
    </div>
    <div class="wrapper" ref="wrapper">
      <scroll :data="HotSearch" class="scroll" ref="scroll">
        <div>
          <!-- 搜索历史 -->
          <history />
          <!-- 热门搜索 -->
          <hot-search @select="toSearch" :hotList="HotSearch" />
        </div>
      </scroll>
    </div>

    <!-- 加载等待组件 -->
    <div class="loading-container" v-show="!HotSearch.length">
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
      HotSearch: []
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
      this.$refs.wrapper.style.bottom = bottom
    },
    async _getSearchDefault() {
      const res = await getSearchDefault()
      this.searchDefault = res.data
      // console.log(this.searchDefault)
    },

    async _getHotSearch() {
      const res = await getHotSearch()
      this.HotSearch = res.data
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
  .wrapper
    position: fixed
    top: 168px
    bottom: 0
    left: 12px
    right: 12px
  .scroll
    height: 100%
    overflow: hidden
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
