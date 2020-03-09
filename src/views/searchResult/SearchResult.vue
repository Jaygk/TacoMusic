<template>
  <div class="search-result">
    <search-box :searchDefault="searchDefault" />
  </div>
</template>

<script>
import SearchBox from 'components/searchBox/SearchBox'
import { getSearchDefault, search } from 'api/search'

export default {
  data() {
    return {
      searchDefault: null
    }
  },
  components: {
    SearchBox
  },
  methods: {
    async _getSearchDefault() {
      const res = await getSearchDefault()
      this.searchDefault = res.data
      // console.log(this.searchDefault)
    },
    setQuery() {
      this.$nextTick(() => {
        this.$children[0].setQuery(this.$route.params.keywords)
      })
    }
  },
  activated() {
    this._getSearchDefault()
    this.setQuery()
  }
}
</script>

<style lang="stylus" scoped></style>
