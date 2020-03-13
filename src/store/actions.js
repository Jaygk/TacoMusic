import * as types from './mutation-types'
import { playMode } from 'utils/config'
import { shuffle } from 'utils/shuffle'
import { getSongUrl } from 'api/song'
import { getSongDetail } from 'api/search'

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  async setPicUrl({ commit }, id) {
    const res = await getSongDetail(id)
    commit(types.SET_PIC_URL, res.songs[0].al.picUrl)
  },
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
  },

  insertSong({ commit, state, dispatch }, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      // 如果当前插入的序号大于列表中的序号
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    dispatch('setUrl', playlist[currentIndex].id)
    dispatch('setPicUrl', playlist[currentIndex].id)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }
}
