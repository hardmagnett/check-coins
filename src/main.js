import 'normalize.css'
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/index.js'
// import websocketsCoinCap from '@/plugins/vueNativeSock/websocketsCoinCap.js'


Vue.config.productionTip = false


function createPassToStoreHandler(eventsSettings = {}) {
  return function (currEventName, event) {
    if (!currEventName.startsWith('SOCKET_')) return

    currEventName = currEventName.replace('SOCKET_', '')

    let eventSettings = {
      namespace: '',
      methodType: 'commit',
      methodName: currEventName.toUpperCase(),
    }

    const msg = event.data ? JSON.parse(event.data) : {}

    if (eventsSettings[currEventName]) {
      eventSettings = { ...eventSettings, ...eventsSettings[currEventName] }
    }
    eventSettings.methodName = 'SOCKET_' + eventSettings.methodName
    const methodNameFull = eventSettings.namespace + eventSettings.methodName
    console.log(methodNameFull); console.log('^...methodNameFull:')
    this.store[eventSettings.methodType](methodNameFull, msg)
  }
}

let passToStoreHandler = createPassToStoreHandler({
  onmessage: {
    namespace: 'entities/assets/',
    methodType: 'dispatch',
    methodName: 'ON_PRICE_CHANGE',
  },
})
Vue.use(VueNativeSock, 'wss://ws.coincap.io/prices?assets=ALL', {
  store,
  format: 'json',
  reconnection: true,
  // connectManually: true,
  passToStoreHandler,
  passToStoreHandlerZ(eventName, event) {
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
    // console.log(this)
    this.store[myVuexMethodType](myVuexMethodNameFull, msg)
  },
})

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// todo: вызывать это после получения списка ассетов
//  Но только после того как напишешь ф-ю реконнекта
// websocketsCoinCap.connectToPrices()

// export { vm }


