import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// axios.defaults.withCredentials = true
// write your root domain here.
axios.defaults.baseURL = 'http://localhost:8000/api/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
