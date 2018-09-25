import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let index = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: true },
    ],
    count: 1
  },
  getters: {
    doneTodos: state => state.todos.filter(todo => todo.done),
    doneTodosCount: (state, getters) => getters.doneTodos.length,
    count: state => state.count
  },
  mutations: {
    increment (state, n) {
      // 变更状态
      debugger
      state.count = state.count + n
    }
  }
})

export default index
