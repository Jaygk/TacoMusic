<template>
  <div class="song-list">
    <ul>
      <li
        @click="selectItem(song, index)"
        class="item"
        v-for="(song, index) in songs"
        :key="song.id + Math.random() * 1000"
      >
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(song) {
      return `${song.artist}·${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
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

.song-list
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    font-size: $font-size-medium
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 20px
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
      overflow: hidden
      .name
        width: 300px
        color: $color-text
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .desc
        margin-top: 4px
        width: 300px
        color: $color-text-d
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
