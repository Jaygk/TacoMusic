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
        <div class="icon">
          <img width="100" height="100" v-lazy="item.picUrl" />
          <span class="update" v-text="item.update"></span>
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
  margin-top: 18px
  .nav
    height: 30px
    display: flex
    align-items: center
    h2
      font-size: $font-size-medium-x
      color: $color-text-ll
      margin-left: 20px

  .list-main
    margin-top: 20px
    padding: 0 20px
    display: flex
    justify-content: space-between
    flex-wrap: wrap

    .list-item
      margin-bottom: 24px
      height: 120px
      width: 100px
      .icon
        position: relative
        .update
          position: absolute
          bottom: 10px
          left: 8px
          font-size: $font-size-small-s
          color: $color-text
        img
          border-radius: 6px

      .desc
        color: $color-text-d
        font-size: $font-size-small
        text-align: center
        margin-top: 6px
        width:100px
        word-break: keep-all
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
</style>
