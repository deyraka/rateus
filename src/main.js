import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// axios.defaults.withCredentials = true
// // write your root domain here.

// CHANGE THIS

// axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.baseURL = 'http://10.62.6.180:8000/api/'
// axios.defaults.baseURL = 'https://rating.bpskalteng.id/api/'

/* Ini base url untuk app vue.
* hanya di akses ketika mengirimkan link survei kepuasan
* don't forget change it with real domain before app release in production mode
*/

// CHANGE THIS

// Vue.prototype.$appBaseUrl = 'http://localhost:8080'
Vue.prototype.$appBaseUrl = 'http://10.62.6.180:8080/api/'
// Vue.prototype.$appBaseUrl = 'https://tiket.bpskalteng.id'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
