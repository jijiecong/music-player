import * as types from '../types'

const state = {
  singer: {}
}

const getters = {
  getSinger: state => {
    return state.singer
  }
}

const actions = {
  setSinger({commit}, data) {
    commit(types.SET_SINGER, data)
  }
}

const mutations = {
  [types.SET_SINGER](state, data) {
    state.singer = data || null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
