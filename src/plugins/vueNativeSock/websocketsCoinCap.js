import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import store from '@/store'
import { vm } from '../../main.js'

/**
 * Нативные вебсокеты - не особо удобная вещь:
 * приходится писать очень много бойлерплейта.
 *
 * При использовании socket.IO такого писать не приходилось.
 * Но что поделать - используемое апи на нативных вебсокетах, а не на socket.IO
 * todo
 *  Переименовать что это не просто websocket api, а именно coincapApi
 */
const websocketsCoinCap = {
  _init() {
    console.log('_init')
    this._initPrices()
  },
  _initPrices() {
    // Ничего страшного что ожидается получение всех (assets=ALL) валют, даже если скроллом загружены ещё не все.
    // Это практически не даёт дополнительной нагрузки. Проверено в Chrome Task Manager.
    // Хотя,бля, есть чё страшное
    console.log('_initPrices')
    Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', {
      store,
      format: 'json',
      reconnection: true,
      connectManually: true,
      passToStoreHandler(eventName, event) {
        console.log('passToStoreHandler')
        // console.log('passToStoreHandler')
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
    vm.$connect()
  },
  connectToExchange(exchangeId) {
    // return 10
    vm.$connect(`wss://ws.coincap.io/trades/${exchangeId}`, {
      store,
      format: 'json',
      reconnection: true,
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
          myVuexMethodName = 'SOCKET_ON_VOLUME_CHANGE'
        }
        const myVuexMethodNameFull = myVuexNamespace + myVuexMethodName
        this.store[myVuexMethodType](myVuexMethodNameFull, msg)
      },
    })
  },
}

websocketsCoinCap._init()

export default websocketsCoinCap
