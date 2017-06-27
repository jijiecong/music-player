import Vue from 'vue'
import Vuex from 'vuex'
import singer from 'store/singer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singer
  }
})
