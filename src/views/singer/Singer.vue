<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singerList" ref="list"/>
  </div>
</template>

<script>
  import {getSingerList, getSingers} from 'api/singer'
  import ListView from './childrenCpts/ListView'

  export default {
    data() {
      return {
        singerList: []
      }
    },
    methods: {
      async _getSingerList() {
        const res = await getSingers()
        this.singerList = getSingerList(res.list.artists)
        // console.log(this.singerList)
      },

      selectSinger(data) {
        console.log(data.name)
      }
    },
    created() {
      this._getSingerList()
    },
    components: {
      ListView
    }
  }
</script>

<style lang='stylus' scoped>
  @import "~assets/stylus/variable.styl"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>