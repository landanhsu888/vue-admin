import Vue from 'vue'
import Vuex from 'vuex'

import Cookies from 'js-cookie'

import memberState from './states/member'
import memberMutaction from './mutations/member'
import memberAction from './actions/member'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    ...memberState
  },
  mutations: {
    ...memberMutaction,
    SET_SIZE: (state: any, size: any): void => {
      state.size = size
      Cookies.set('size', size)
    },
    DEL_ALL_CACHED_VIEWS: (state: any): void => {
      state.cachedViews = []
    }
  },
  actions: {
    ...memberAction,
    setSize ({ commit }: any, size: any): void {
      commit('SET_SIZE', size)
    },
    delAllCachedViews ({ commit, state }: any): any {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    }
  }
})

export default store
