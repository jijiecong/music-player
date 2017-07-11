/**
 * Created by Jiecong Ji on 2017/7/10.
 */
import * as types from '../types'

const state = {
  rank: {}
}

const getters = {
  getRank: state => {
    return state.rank
  }
}

const actions = {
  setRank({commit}, data) {
    commit(types.SET_RANK, data)
  }
}

const mutations = {
  [types.SET_RANK](state, data) {
    state.rank = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
