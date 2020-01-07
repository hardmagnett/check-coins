import 'normalize.css'
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/index.js'
// import websocketsCoinCap from '@/plugins/vueNativeSock/websocketsCoinCap.js'


Vue.config.productionTip = false

// todo: Вынеcти отсюда
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
    this.store[eventSettings.methodType](methodNameFull, msg)
  }
}

function createOptions(options = {}, eventsSettings = {}) {
  options = {
    ...options,
    store,
    format: 'json',
    reconnection: true,
  }
  let result =  {
    ...options,
    passToStoreHandler: createPassToStoreHandler(eventsSettings),
  }
  return result
}

// todo: Вынеcти досюда

Vue.use(VueNativeSock, 'wss://ws.coincap.io', {
  connectManually: true,
})

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

vm.$connect(
  'wss://ws.coincap.io/prices?assets=ALL',
  createOptions({}, {
    onmessage: {
      namespace: 'entities/assets/',
      methodType: 'dispatch',
      methodName: 'ON_PRICE_CHANGE',
    },
  }),
)

