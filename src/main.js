import 'normalize.css'


import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import VueNativeSock from 'vue-native-websocket'
import VueScreen from 'vue-screen'
import App from './App.vue'
import router from './router'
import store from './store'

// вынести в отдельный файл

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта

// Раньше у меня был собственный 'изобретенный велосипед' для данной функциональности
// Но позже нашел эту библиотеку

import './exps'

Vue.use(InfiniteLoading, {})
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

Vue.use(VueScreen, {
  // Брекпоинты должны быть синхронны с теми что в variables.scss.
  // Если бы использовались нативные css-переменные,
  // то можно было-бы избежать этого дубляи получить значения css-переменных js-ом.
  // но пока-что css значительно уступает scss в возможностях.
  bpSm: 480,
  bpSm2: 768,
  bpMd: 960,
  bpLg: 1280,
  bpXl: 1600,
  breakpointsOrder: [
    'bpSm',
    'bpSm2',
    'bpMd',
    'bpLg',
    'bpXl',
  ],
  // Можно было-бы обойтись css-media-queries,
  // но т.к. рендеринг таблицы высоконагружен
  // нужно не рендерить всё что только можно.
  // Поэтому скрываю столбцы на основе JS.
  showInTableColumnRank: (screen) => screen.bpSm,
  showInTableColumnMarketCap: (screen) => screen.bpSm2,
  showInTableColumnVolume24Hr: (screen) => screen.bpSm2,
})


const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// вынести в отдельный файл, а может быть и в отдельные ф-и коннекта и дисконнекта
vm.$connect()
