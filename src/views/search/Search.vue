<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="box">
      <search-box :searchDefault="searchDefault" />
    </div>
    <div class="wrapper">
      <scroll :data="HotSearch" class="scroll" ref="scroll">
        <div>
          <!-- 搜索历史 -->
          <history />
          <!-- 热门搜索 -->
          <hot-search :hotList="HotSearch" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import SearchBox from './childrenCpts/SearchBox'
import History from './childrenCpts/History'
import HotSearch from './childrenCpts/HotSearch'
import Scroll from 'components/scroll/Scroll'

import { getSearchDefault, getHotSearch } from 'api/search'

export default {
  data() {
    return {
      searchDefault: null,
      HotSearch: null
    }
  },
  components: {
    SearchBox,
    History,
    HotSearch,
    Scroll
  },
  methods: {
    async _getSearchDefault() {
      const res = await getSearchDefault()
      this.searchDefault = res.data
      // console.log(this.searchDefault)
    },

    async _getHotSearch() {
      const res = await getHotSearch()
      this.HotSearch = res.data
    }
  },
  activated() {
    this._getSearchDefault()
    this._getHotSearch()
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.search
  .box 
    margin: 6px 12px
  .wrapper
    position: fixed
    top: 168px
    bottom: 0
    left: 12px
    right: 12px
  .scroll
    height: 100%
    overflow: hidden
</style>
