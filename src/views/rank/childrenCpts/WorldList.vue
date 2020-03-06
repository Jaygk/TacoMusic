<template>
  <div class="world-list">
    <div class="nav">
      <h2>全球榜</h2>
    </div>

    <ul class="list-main">
      <li
        @click="selectItem(item)"
        class="list-item"
        v-for="item in worldList"
        :key="item.id"
      >
        <div class="img">
          <img width="100" height="100" v-lazy="item.picUrl" />
        </div>

        <div class="desc">
          <span>{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    worldList: {
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
.world-list
  margin: 18px 0 20px 20px
  .nav
    height: 30px
    display: flex
    align-items: center
    h2
      font-size: $font-size-medium-x
      color: $color-text-ll

  .list-main
    margin-top: 12px
    display: flex
    justify-content: space-between
    flex-wrap: wrap

    .list-item
      margin-bottom: 24px
      height: 120px
      width: 100px
      flex: 1
      img
        border-radius: 5px

      .desc
        color: $color-text-d
        font-size: $font-size-medium
        text-align: center
        margin-top: 6px
        width:100px
        word-break: keep-all
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
</style>
