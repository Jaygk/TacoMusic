<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <div class="text">
              <span>{{ modeText }}</span>
              <span v-show="modeText !== '单曲循环'"> ({{ songCount }}首)</span>
            </div>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll ref="listContent" :data="sequenceList" class="list-content">
          <transition name="list">
            <ul ref="list">
              <li
                :key="item.id + Math.random() * 1000"
                class="item"
                v-for="(item, index) in sequenceList"
                @click="selectItem(item, index)"
                :class="item.id === currentSong.id ? 'currentItem' : ''"
              >
                <i class="current" :class="getCurrentIcon(item)"></i>
                <span class="text">{{ item.name }} - {{ item.artist }}</span>
                <span class="delete" @click.stop="deleteOne(item)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </ul>
          </transition>
        </scroll>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm
        ref="confirm"
        @confirm="confirmClear"
        text="确定清空所有歌曲？"
        confirmBtnText="确定"
      ></confirm>
    </div>
  </transition>
</template>

<script>
import Scroll from 'components/scroll/Scroll'
import Confirm from 'components/confirm/Confirm'
import { playerMixin } from 'utils/mixins'
import { playMode } from 'utils/config'

export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 120
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.random
        ? '随机播放'
        : '单曲循环'
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    confirmClear() {
      this.deleteSongList()
      this.hide()
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
      return ''
    },
    selectItem(item, index) {
      if (item.id === this.currentSong.id) return

      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => song.id === item.id)
      }
      this.setCurrentIndex(index)
      this.setUrl(this.playlist[index].id)
      this.setPicUrl(this.playlist[index].id)
      this.setPlayingState(true)
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => {
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(
        this.$refs.list.children[index],
        300
      )
    },
    deleteOne(item) {
      this.deleteSong(item)
      if (!this.playlist.length) {
        this.hide()
      }
    },
    addSong() {
      this.$refs.addSong.show()
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong)
      }, 20)
    }
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"

.playlist
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 200
  background-color: $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: opacity 0.3s
    .list-wrapper
      transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
    .list-wrapper
      transform: translate3d(0, 100%, 0)
  &.list-fade-enter
  .list-wrapper
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    background-color: $color-highlight-background
    .list-header
      position: relative
      padding: 20px 30px 10px 20px
      .title
        display: flex
        align-items: center
        .icon
          margin-right: 10px
          font-size: 30px
          color: $color-theme
        .text
          flex: 1
          font-weight: 800
          font-size: $font-size-medium
          color: $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size: $font-size-medium
            color: $color-text-d
    .list-content
      height: 400px
      overflow: hidden
      .item
        display: flex
        align-items: center
        height: 40px
        padding: 0 30px 0 20px
        overflow: hidden
        &.list-enter-active, &.list-leave-active
          transition: all 0.1s
        &.list-enter, &.list-leave-to
          height: 0
        .current
          flex: 0 0 20px
          width: 20px
          font-size: $font-size-small
          color: $color-theme
        .text
          flex: 1
          no-wrap()
          font-size: 13px
          color: $color-text-d
        .delete
          extend-click()
          font-size: $font-size-small
          color: $color-text-d
      .currentItem
        .text
          color: $color-theme

    .list-close
      text-align: center
      line-height: 50px
      background: $color-background
      font-size: $font-size-medium-x
      color: $color-text-l
</style>
