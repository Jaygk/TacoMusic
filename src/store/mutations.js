import * as types from './mutation-types'

export default {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SONG_URL](state, url) {
    state.songUrl = url
  },
  [types.SET_RECOMMEND_DETAIL](state, item) {
    state.recommendDetail = item
  },
  [types.SET_TOP_LIST](state, item) {
    state.topList = item
  }
}
