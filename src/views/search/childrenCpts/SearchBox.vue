<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input
      ref="query"
      v-model="query"
      class="box"
      :placeholder="searchDefault ? searchDefault.showKeyword : ''"
    />
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
import { debounce } from 'utils/util'
export default {
  props: {
    searchDefault: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  },
  created() {
    this.$watch(
      'query',
      debounce(newQuery => {
        this.$emit('query', newQuery)
      }, 200)
    )
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"

.search-box
  display: flex
  align-items: center
  box-sizing: border-box
  width: 100%
  padding: 0 6px
  height: 40px
  background: $color-highlight-background
  border-radius: 6px
  .icon-search
    font-size: 24px
    color: $color-background
  .box
    flex: 1
    outline: none
    margin: 0 5px
    line-height: 20px
    background: $color-highlight-background
    color: $color-text
    font-size: $font-size-medium
    &::placeholder
      color: $color-text-d
  .icon-dismiss
    font-size: 16px
    color: $color-background
</style>
