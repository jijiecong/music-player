/**
 * Created by Jiecong Ji on 2017/6/29.
 */
import * as types from '../types'
import { playMode } from './config'
import { randomList, findIndex } from 'common/js/utils'

const state = {
  mode: playMode.sequence,
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  currentIndex: -1
}

const getters = {
  getMode: state => {
    return state.mode
  },
  getPlaying: state => {
    return state.playing
  },
  getFullScreen: state => {
    return state.fullScreen
  },
  getPlayList: state => {
    return state.playList
  },
  getSequenceList: state => {
    return state.sequenceList
  },
  getCurrentIndex: state => {
    return state.currentIndex
  },
  getCurrentSong: state => {
    return state.playList[state.currentIndex] || {}
  }
}

const actions = {
  setMode({commit}, data) {
    commit(types.SET_MODE, data)
  },
  setPlaying({commit}, data) {
    commit(types.SET_PLAYING, data)
  },
  setFullScreen({commit}, data) {
    commit(types.SET_FULLSCREEN, data)
  },
  setPlayList({commit}, data) {
    commit(types.SET_PLAYLIST, data)
  },
  setSequenceList({commit}, data) {
    commit(types.SET_SEQUENCELIST, data)
  },
  setCurrentIndex({commit}, data) {
    commit(types.SET_CURRENTINDEX, data)
  },
  initPlayer({commit, state}, data) {
    if (state.mode === playMode.random) {
      let randomlist = randomList(data.playlist)
      let index = findIndex(randomlist, data.playlist[data.index])
      commit(types.SET_CURRENTINDEX, index)
      commit(types.SET_PLAYLIST, randomlist)
    } else {
      commit(types.SET_CURRENTINDEX, data.index)
      commit(types.SET_PLAYLIST, data.playlist)
    }
    commit(types.SET_FULLSCREEN, data.fullScreen)
    commit(types.SET_SEQUENCELIST, data.playlist)
    commit(types.SET_PLAYING, true)
  },
  randomPlayer({commit}, data) {
    commit(types.SET_MODE, playMode.random)
    let playlist = randomList(data.playlist)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_FULLSCREEN, data.fullScreen)
    commit(types.SET_SEQUENCELIST, data.playlist)
    commit(types.SET_CURRENTINDEX, 0)
    commit(types.SET_PLAYING, true)
  }
}

const mutations = {
  [types.SET_MODE](state, data) {
    state.mode = data
  },
  [types.SET_PLAYING](state, data) {
    state.playing = data
  },
  [types.SET_FULLSCREEN](state, data) {
    state.fullScreen = data
  },
  [types.SET_PLAYLIST](state, data) {
    state.playList = data
  },
  [types.SET_SEQUENCELIST](state, data) {
    state.sequenceList = data
  },
  [types.SET_CURRENTINDEX](state, data) {
    state.currentIndex = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
