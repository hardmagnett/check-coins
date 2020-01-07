import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/index.js'
import websocketsCoinCap from '@/plugins/vueNativeSock/websocketsCoinCap.js'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// todo: вызывать это после получения списка ассетов
//  Но только после того как напишешь ф-ю реконнекта
websocketsCoinCap.connectToPrices()

export { vm }
