import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: "",
    refresh: "",
    isAuthenticated: false
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('access')) {
        state.access = localStorage.getItem('access')
        state.refresh = localStorage.getItem('refresh')
        state.isAuthenticated = true
      } else {
        state.access = ''
        state.refresh = ''
      }
    },
    setAccess(state, access) {
      state.access = access
      state.isAuthenticated = true
    },
    setRefresh(state,refresh) {
      state.refresh = refresh
    }
  },
  actions: {},
  modules: {
  }
})