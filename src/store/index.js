import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '@/orm/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    // мутации-заглушки по умолчанию, чтобы не ругалось в консоль что их нет.
    SOCKET_ONOPEN() {
      console.log('SOCKET_ONOPEN')
    },
    SOCKET_ONCLOSE() {
      console.log('SOCKET_ONCLOSE')
    },
    SOCKET_ONERROR() {
      console.log('SOCKET_ONERROR')
    },
    SOCKET_ONMESSAGE() {
      console.log('SOCKET_ONMESSAGE')
    },
    SOCKET_RECONNECT() {
      console.log('SOCKET_RECONNECT')
    },
    SOCKET_RECONNECT_ERROR() {
      console.log('SOCKET_RECONNECT_ERROR')
    },
  },
  actions: {
    // SOCKET_ON_PRICE_CHANGE(state, message) {
    //   console.log(message); console.log('^...message in action:')
    // },
  },
  modules: {},
  plugins: [VuexORM.install(database)],
})
