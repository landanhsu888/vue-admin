import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state, n) {
      // 变更状态
      state.count = state.count + n
    }
  },
  actions: {
    increment (context, n) {
      context.commit('increment', n)
    }
  }
})

export default store
