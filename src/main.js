import 'normalize.css'
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from '@/App.vue'
import store from '@/store'
import '@/plugins/index.js'
import createOptions from '@/plugins/vueNativeSock/websocketsCoinCap.js'


Vue.config.productionTip = false

Vue.use(VueNativeSock, 'wss://ws.coincap.io', {
  connectManually: true,
})

const vm = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')

// Коннект к вебсокету для обновления курса валют
vm.$connect(
  // коннект к получению сразу всех (ALL) валют дополнительной нагрузки практически не дает.
  'wss://ws.coincap.io/prices?assets=ALL',
  createOptions({}, {
    onmessage: {
      namespace: 'entities/assets/',
      methodType: 'dispatch',
      methodName: 'ON_PRICE_CHANGE',
    },
  }),
)

