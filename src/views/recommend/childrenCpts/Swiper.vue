<template>
  <swiper :options="swiperOption" class="swiper-box" v-if="banners.length">
    <swiper-slide class="swiper-item" v-for="item in banners" :key="item.pic">
      <img @load="imgLoad" :src="item.pic" alt />
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true, // 启动动态检查器(OB/观众/观看者)
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('imageLoad')
    }
  },
  mounted() {
    this.$nextTick(() => {})
  }
}
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .swiper-box
    .swiper-item
      img
        height: 100%
        width: 100%
        border-radius: 8px
</style>
