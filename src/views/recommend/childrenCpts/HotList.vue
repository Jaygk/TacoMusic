<template>
  <div class="hot-list">
    <h1 class="list-title">热门歌单推荐</h1>
    <ul>
      <li
        @click="selectItem(item)"
        v-for="item in discList"
        class="item"
        :key="item.id"
      >
        <div class="icon">
          <img width="60" height="60" v-lazy="item.coverImgUrl" />
        </div>
        <div class="text">
          <h2 class="name" v-html="item.name"></h2>
          <p class="desc" v-html="item.description"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    discList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    selectItem(item) {
      this.setRecommendDetail(item)
      this.$emit('select', item.id)
    },
    ...mapMutations({
      setRecommendDetail: 'SET_RECOMMEND_DETAIL'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
.hot-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 24px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
          img
            border-radius: 6px
        .text
          display: flex
          flex-direction: column
          justify-content: space-between
          flex: 1
          line-height: 18px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .desc
            color: $color-text-d
            display: -webkit-box
            overflow: hidden
            white-space: normal !important
            text-overflow: ellipsis
            word-wrap: break-word
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            font-size: $font-size-small
</style>
