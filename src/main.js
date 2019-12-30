import 'normalize.css'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// вынести в отдельный файл
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, {});

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', {
  store: store,
  format: 'json',
  reconnection: true,
  connectManually: true,
  passToStoreHandler: function (eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return }
    let msg = event.data ? JSON.parse(event.data) : {}

    let myVuexMethodType = 'commit'             // по умолчанию вызывается мутация
    let myVuexNamespace = ''                    // по умолчанию корневой модуль
    let myVuexMethodName = eventName.toUpperCase()

    if (
      // если сообщение пришло из вебсокета о стоимости валюты
      // возможно эта проверка будет не нужна пушо урл и так указан в опциях.
      event.target.url.indexOf('ws.coincap.io/prices') !== -1
      &&
      eventName === 'SOCKET_onmessage'
    ) {
      myVuexMethodType = 'dispatch' // вызывает экшн
      myVuexNamespace = 'entities/assets/'
      myVuexMethodName = 'SOCKET_ON_PRICE_CHANGE'
    }
    let myVuexMethodNameFull = myVuexNamespace + myVuexMethodName
    this.store[myVuexMethodType](myVuexMethodNameFull, msg)
  }
})

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта
vm.$connect()

// указывается название биржи
vm.$connect('wss://ws.coincap.io/trades/binance', {
  store: store,
  format: 'json',
  reconnection: true,
  connectManually: true,
  passToStoreHandler: function (eventName, event) {
    if (!eventName.startsWith('SOCKET_')) { return }
    // console.log(event.data); console.log('^...event.data:')
    let msg = event.data ? JSON.parse(event.data) : {}

    let myVuexMethodType = 'commit'             // по умолчанию вызывается мутация
    let myVuexNamespace = ''                    // по умолчанию корневой модуль
    let myVuexMethodName = eventName.toUpperCase()

    if (
      eventName === 'SOCKET_onmessage'
    ) {
      myVuexMethodType = 'dispatch' // вызывает экшн
      myVuexNamespace = 'entities/assets/'
      myVuexMethodName = 'SOCKET_ON_VOLUME_CHANGE'
    }
    let myVuexMethodNameFull = myVuexNamespace + myVuexMethodName
    this.store[myVuexMethodType](myVuexMethodNameFull, msg)
  }
})
