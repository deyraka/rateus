import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    user: {}
  },
  mutations: {
    setLoginStatus: function (state, key) {
      return (state.isLoggedIn = key)
    },
    setToken: function (state, key) {
      return (state.token = key)
    },
    setUser: function (state, usrObj) {
      return (state.user = usrObj)
    }
  },
  actions: {
    renewLoginStatus (state, val) {
      state.commit('setLoginStatus', val)
    },
    renewToken (state, val) {
      state.commit('setToken', val)
    },
    renewUser (state, val) {
      state.commit('setUser', val)
    }
  },
  getters: {
    commonLoginStatus: (state) => {
      return state.isLoggedIn
    },
    commonToken: (state) => {
      return state.token
    },
    commonUser: (state) => {
      return state.user
    }
  },
  modules: {
  }
})
