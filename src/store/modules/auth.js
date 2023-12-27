// store/modules/auth.js

const state = {
  user: { name: '', id: '0' },
  token: ''
}
const mutations = {
  SET_TOKEN: function (state, key) {
    return (state.token = key)
  },
  SET_USER_INFO: (state, payload) => {
    state.user.name = payload.name
    state.user.id = payload.id
  },
  LOGOUT (state) {
    state.user = { name: '', id: '0' }
    state.token = ''
  }
}
const actions = {
  renewUserInfo: (state, payload) => {
    state.commit('SET_USER_INFO', payload)
  },
  renewToken: (context, val) => {
    context.commit('SET_TOKEN', val)
  },
  async logout ({ commit }) {
    commit('LOGOUT')
  }
}
const getters = {
  isAuthenticated: (state) => { return !!state.user.name }, // it will return boolean. True if user.name has value
  activeUserName: (state) => { return state.user.name },
  activeUserId: (state) => { return state.user.id },
  activeToken: (state) => { return state.token }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
