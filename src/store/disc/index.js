/**
 * Created by Jiecong Ji on 2017/7/10.
 */
import * as types from '../types'

const state = {
  disc: {}
}

const getters = {
  getDisc: state => {
    return state.disc
  }
}

const actions = {
  setDisc({commit}, data) {
    commit(types.SET_DISC, data)
  }
}

const mutations = {
  [types.SET_DISC](state, data) {
    state.disc = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
