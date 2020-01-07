import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import store from '@/store'
import { vm } from '../main.js'


const websockets = {
  _init() {
    this._initPrices()
  },
  _initPrices() {
    // Ничего страшного что ожидается получение всех (assets=ALL) валют, даже если скроллом загружены ещё не все.
    // Это практически не даёт дополнительной нагрузки. Проверено в Chrome Task Manager.
    // Хотя,бля, есть чё страшное
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
  },
  // todo: применить массив id валют, для которых коннектиться
  connectToPrices(assetIds = []) {
    console.log(vm); console.log('^...vm:')
    console.log('connectToPrices')
    vm.$connect()
  },
}

websockets._init()

export default websockets
