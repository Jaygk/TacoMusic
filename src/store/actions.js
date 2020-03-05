import * as types from './mutation-types'
import { playMode } from 'utils/config'
import { shuffle } from 'utils/shuffle'
import { getSongUrl } from 'api/song'

export default {
  async setUrl({ commit }, id) {
    const res = await getSongUrl(id)
    commit(types.SET_SONG_URL, res.data[0].url)
  },
  selectPlay({ commit, state, dispatch }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = randomList.findIndex(item => item.id === list[index].id)
      dispatch('setUrl', randomList[index].id)
    } else {
      commit(types.SET_PLAYLIST, list)
      dispatch('setUrl', list[index].id)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },

  randomPlay({ commit, dispatch }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    dispatch('setUrl', randomList[0].id)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }
}
