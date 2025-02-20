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

    <div v-show="searchList.length > 0" class="play" @click="playAllSongs">
      <i class="icon-play"></i>
      <span class="text">播放全部</span>
    </div>

    <scroll
      :pullup="true"
      @scrollToEnd="searchMore"
      :data="searchList"
      class="scroll"
      ref="scroll"
    >
      <div class="song-list">
        <song-list @select="selectItem" :songs="searchList" />
        <loading v-show="hasMore && searchList.length" title="" />
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

import { getSearchDefault, getSearchList, search } from 'api/search'
import { playlistMixin } from 'utils/mixins'
import { mapActions } from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      searchDefault: null,
      searchList: [],
      limit: 30,
      page: 0,
      hasMore: true
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
      this.searchDefault = null
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
      this.page = 0
      this.hasMore = true
      if (!keywords) {
        this.$router.push('/search')
        return
      }
      this.searchList = []
      const res = await search(keywords, this.limit, this.page * this.limit)
      this.searchList = getSearchList(res.result.songs)
    },
    toSearch(keywords) {
      this._getSearchList(keywords)
    },
    selectItem(item, index) {
      this.insertSong(item)
    },
    playAllSongs() {
      this.playAll(this.searchList)
    },
    async searchMore() {
      if (!this.hasMore) return

      this.page++
      const res = await search(
        this.keywords,
        this.limit,
        this.page * this.limit
      )
      if (!res.result.songs) {
        this.hasMore = false
        return
      }
      this.searchList = this.searchList.concat(getSearchList(res.result.songs))
    },
    ...mapActions(['insertSong', 'playAll'])
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
  right: 0
  bottom: 0
  z-index: 100
  background: $color-background
  .top
    padding-right: 10px
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
  .play
    height: 30px
    width: 100%
    padding: 10px 20px
    display: flex
    align-items: center
    .icon-play
      margin-right: 6px
      font-size: $font-size-medium-x
  .scroll
    position: fixed
    top: 96px
    bottom: 0
    background: $color-background
    overflow: hidden
    .song-list
      padding: 0 12px 10px
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
