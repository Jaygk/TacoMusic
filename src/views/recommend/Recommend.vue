<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="hotList">
      <div>
        <!-- 轮播图 -->
        <swiper
          :banners="bannerList"
          @imageLoad="loadImage"
          class="recommend-swiper"
        />

        <!-- 热门歌单 -->
        <hot-list @select="selectItem" :discList="hotList" class="hot-list" />
      </div>

      <!-- 加载等待组件 -->
      <div class="loading-container" v-show="!hotList.length">
        <loading />
      </div>
    </scroll>

    <router-view />
  </div>
</template>

<script>
import Swiper from './childrenCpts/Swiper'
import HotList from './childrenCpts/HotList'
import Scroll from 'components/scroll/Scroll'
import Loading from 'components/loading/Loading'

import { getBanner, getHotList } from 'api/recommend'
import { playlistMixin } from 'utils/mixins'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      bannerList: [],
      hotList: []
    }
  },
  components: {
    Swiper,
    HotList,
    Scroll,
    Loading
  },
  methods: {
    selectItem(id) {
      this.$router.push(`/recommend/${id}`)
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.recommend.style.bottom = bottom
    },
    // 获取轮播图数据
    async _getBannerList() {
      const res = await getBanner()
      this.bannerList = res.banners
    },

    // 获取热门歌单列表
    async _getHotList() {
      const res = await getHotList()
      this.hotList = res.playlists
    },

    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },

    // 监听轮播图图片加载
    loadImage() {
      if (!this.checkLoaded) {
        this.refresh()
        this.checkLoaded = true
      }
    }
  },
  created() {
    this._getBannerList()
    this._getHotList()
  },
  activated() {
    this.refresh()
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable.styl"
.recommend
  position: fixed
  width: 100%
  top: 88px
  .recommend-content
    height: 100%
    overflow: hidden
    .recommend-swiper
      margin-top: 6px
    .hot-list
      margin-top: 10px
  .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
