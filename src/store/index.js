import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: ''
  },
  mutations: {
    setLoginStatus: function (state, key) {
      return (state.isLoggedIn = key)
    },
    setToken: function (state, key) {
      return (state.token = key)
    }
  },
  actions: {
    renewLoginStatus (state, val) {
      state.commit('setLoginStatus', val)
    },
    renewToken (state, val) {
      state.commit('setToken', val)
    }
  },
  getters: {
    commonLoginStatus: (state) => {
      return state.isLoggedIn
    },
    commonToken: (state) => {
      return state.token
    }
  },
  modules: {
  }
})
