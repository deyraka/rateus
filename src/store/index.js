import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth.js'

// Load Vuex
Vue.use(Vuex)
// Create store
export default new Vuex.Store({
  modules: {
    userAuth: auth // name of module. you can give any name you want
  },
  plugins: [createPersistedState()]
})
