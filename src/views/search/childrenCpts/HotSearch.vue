<template>
  <div class="hot-search">
    <h2 class="title">热门搜索</h2>
    <ul class="list">
      <li
        @click="selectItem(item.searchWord)"
        class="item"
        v-for="(item, index) in hotList"
        :key="item.searchWord"
      >
        <div class="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <div class="main">
            <h2 class="name">{{ item.searchWord }}</h2>
            <img v-if="item.iconUrl" :src="item.iconUrl">
          </div>
          <p class="desc">{{ item.content }}</p>
        </div>
        <div class="score">
          <span v-text="item.score"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    selectItem(keywords) {
      this.$emit('select', keywords)
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.hot-search
  // margin-top: 36px
  padding: 0 8px 18px 8px
  .title 
    font-size: $font-size-medium-x
    color: $color-text-ll
  .list
    margin-top: 8px
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px 
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 30px
      text-align: center
      .icon
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex: 1
      line-height: 20px
      font-size: $font-size-medium
      overflow: hidden
      .main
        display: flex
        .name
          margin-right: 5px
          no-wrap()
          color: $color-text
        img
          height: 16px
          width: auto
      .desc
        no-wrap()
        margin-top: 4px
        color: $color-text-d
    .score
      color: $color-text-d
      font-size: $font-size-medium
</style>
