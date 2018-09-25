import Vue from 'vue'
import Vuex from 'vuex'

import memberState from './states/member'
import memberMuaction from './muations/member'
import memberAction from './actions/member'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    ...memberState
  },
  mutations: {
    ...memberMuaction
  },
  actions: {
    ...memberAction
  }
})

export default store
