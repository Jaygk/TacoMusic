<template>
  <div class="official-list">
    <div class="nav">
      <h2>官方榜</h2>
    </div>

    <ul>
      <li
        @click="selectItem(item)"
        class="item"
        v-for="item in officialList"
        :key="item.id"
      >
        <div class="icon">
          <img width="100" height="100" v-lazy="item.picUrl" />
          <span class="update" v-text="item.update"></span>
        </div>
        <ul class="song-list">
          <li
            class="song"
            v-for="(song, index) in item.songList"
            :key="song.first"
          >
            <span class="num">{{ index + 1 }}.</span>
            <span>{{ song.first }}-{{ song.second }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    officialList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
.official-list
  margin-top: 10px
  .nav
    height: 30px
    display: flex
    align-items: center
    h2
      font-size: $font-size-medium-x
      margin-left: 20px
      color: $color-text-ll
  .item
    display: flex
    margin: 0 20px
    padding-top: 20px
    height: 100px
    border-radius: 10px !important
    &:last-child
      padding-bottom: 20px
    .icon
      position: relative
      flex: 0 0 100px
      width: 100px
      height: 100px
      .update
        position: absolute
        bottom: 8px
        left: 8px
        font-size: $font-size-small-s
        color: $color-text
      img
        border-radius: 6px 0 0 6px
    .song-list
      flex: 1
      display: flex
      flex-direction: column
      justify-content: center
      padding: 0 20px
      height: 100px
      overflow: hidden
      background: $color-highlight-background
      color: $color-text-d
      font-size: $font-size-small
      .song
        no-wrap()
        line-height: 26px
        .num
          font-weight: 800
          margin-right: 5px
</style>
