<template>
  <div class="search-result">
    <div class="top">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="search-box">
        <search-box @search="toSearch" :searchDefault="searchDefault" />
      </div>
    </div>

    <scroll :data="searchList" class="scroll" ref="scroll">
      <div class="song-list">
        <song-list @select="selectItem" :songs="searchList" />
      </div>
    </scroll>

    <!-- 加载等待组件 -->
    <div class="loading-container" v-show="!searchList.length">
      <loading />
    </div>
  </div>
</template>

<script>
import SearchBox from 'components/searchBox/SearchBox'
import SongList from 'components/songList/SongList'
import Loading from 'components/loading/Loading'
import Scroll from 'components/scroll/Scroll'

import { getSearchDefault, getSearchList } from 'api/search'
import { playlistMixin } from 'utils/mixins'
import { mapActions } from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      searchDefault: null,
      searchList: []
    }
  },
  computed: {
    keywords() {
      return this.$route.params.keywords
    }
  },
  components: {
    SearchBox,
    SongList,
    Loading,
    Scroll
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.scroll.$el.style.bottom = bottom
    },
    back() {
      this.$router.go(-1)
    },
    async _getSearchDefault() {
      const res = await getSearchDefault()
      this.searchDefault = res.data
      // console.log(this.searchDefault)
    },
    setQuery() {
      this.$nextTick(() => {
        this.$children[0].setQuery(this.keywords)
      })
    },

    async _getSearchList(keywords) {
      if (!keywords) {
        this.$router.push('/search')
        return
      }
      this.searchList = []
      this.searchList = await getSearchList(keywords)
    },
    toSearch(keywords) {
      this._getSearchList(keywords)
    },
    selectItem(item, index) {
      this.insertSong(item)
    },
    ...mapActions(['insertSong'])
  },
  activated() {
    this._getSearchDefault()
    this._getSearchList(this.keywords)
    this.setQuery()
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.search-result
  position: fixed
  left: 0
  top: 0
  right: 10px
  bottom: 0
  z-index: 100
  background: $color-background
  .top
    margin-top: 6px
    display: flex
    z-index: 101
    justify-content: space-between
    .search-box
      flex: 1
    .back
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
  .scroll
    position: fixed
    top: 50px
    bottom: 0
    background: $color-background
    overflow: hidden
    .song-list
      padding: 10px 12px
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
