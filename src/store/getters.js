export default {
  singer(state) {
    return state.singer
  },

  playing(state) {
    return state.playing
  },

  fullScreen(state) {
    return state.fullScreen
  },

  playlist(state) {
    return state.playlist
  },

  sequenceList(state) {
    return state.sequenceList
  },

  mode(state) {
    return state.mode
  },

  currentIndex(state) {
    return state.currentIndex
  },

  currentSong(state) {
    return state.playlist[state.currentIndex] || {}
  },

  songUrl(state) {
    return state.songUrl
  }
}
