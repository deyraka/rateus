import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { name: '', id: '0' },
    token: ''
  },
  mutations: {
    SET_TOKEN: function (state, key) {
      return (state.token = key)
    },
    SET_USER_INFO: (state, payload) => {
      state.user.name = payload.name
      state.user.id = payload.id
    },
    logout (state) {
      state.user = {}
      state.token = ''
    }
  },
  actions: {
    renewUserInfo: (state, payload) => {
      state.commit('SET_USER_INFO', payload)
    },
    renewToken: (context, val) => {
      context.commit('SET_TOKEN', val)
    },
    async Logout ({ commit }) {
      const user = null
      commit('logout', user)
    }
  },
  getters: {
    isAuthenticated: (state) => { return !!state.users.name },
    activeUserName: (state) => { return state.user.name },
    activeUserId: (state) => { return state.user.id },
    activeToken: (state) => { return state.token }
  },
  modules: {
  }
})
