<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <h2>提示</h2>
          <p class="text">{{ text }}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">
              {{ cancelBtnText }}
            </div>
            <div @click="confirm" class="operate-btn">{{ confirmBtnText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    cancel() {
      this.hide()
      this.$emit('cancel')
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"

.confirm
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 998
  background-color: $color-background-d
  &.confirm-fade-enter-active
    animation: confirm-fadein 0.3s
    .confirm-content
      animation: confirm-zoom 0.3s
  .confirm-wrapper
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999
    .confirm-content
      padding-top: 28px
      width: 270px
      border-radius: 6px
      background: $color-highlight-background
      h2
        color: $color-text-ll
        text-align: center
        font-size: $font-size-large
      .text
        padding: 19px 30px
        line-height: 22px
        font-size: 13px
        color: $color-text-l
      .operate
        display: flex
        align-items: center
        text-align: center
        font-size: $font-size-medium
        .operate-btn
          flex: 1
          line-height: 22px
          padding: 10px 0
          border-top: 1px solid $color-background-d
          color: $color-text-d
          &.left
            border-right: 1px solid $color-background-d
            color: $color-theme

@keyframes confirm-fadein
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes confirm-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
