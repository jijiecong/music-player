import Vue from 'vue'
import Vuex from 'vuex'
import singer from 'store/singer'
import player from 'store/player'
import disc from 'store/disc'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singer,
    player,
    disc
  }
})
