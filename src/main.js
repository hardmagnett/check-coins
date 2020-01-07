import 'normalize.css'
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/index.js'

// вынести в отдельный файл

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта

// Ничего страшного что ожидается получение всех (assets=ALL) валют, даже если скроллом загружены ещё не все.
// Это практически не даёт дополнительной нагрузки. Проверено в Chrome Task Manager.
Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', {
  store,
  format: 'json',
  reconnection: true,
  connectManually: true,
  passToStoreHandler(eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return }
    const msg = event.data ? JSON.parse(event.data) : {}

    let myVuexMethodType = 'commit' // по умолчанию вызывается мутация
    let myVuexNamespace = '' // по умолчанию корневой модуль
    let myVuexMethodName = eventName.toUpperCase()

    if (
      eventName === 'SOCKET_onmessage'
    ) {
      myVuexMethodType = 'dispatch' // вызывает экшн
      myVuexNamespace = 'entities/assets/'
      myVuexMethodName = 'SOCKET_ON_PRICE_CHANGE'
    }
    const myVuexMethodNameFull = myVuexNamespace + myVuexMethodName
    this.store[myVuexMethodType](myVuexMethodNameFull, msg)
  },
})

Vue.config.productionTip = false




const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта
vm.$connect()
