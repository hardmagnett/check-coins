import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '@/orm/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    // мутации-заглушки по умолчанию, чтобы не ругалось в консоль что их нет.
    // Могут быть полезны для дебага.
    SOCKET_ONOPEN() {
      // console.log('SOCKET_ONOPEN')
    },
    SOCKET_ONCLOSE() {
      // console.log('SOCKET_ONCLOSE')
    },
    SOCKET_ONERROR() {
      // console.log('SOCKET_ONERROR')
    },
    SOCKET_ONMESSAGE() {
      // console.log('SOCKET_ONMESSAGE')
    },
    SOCKET_RECONNECT() {
      // console.log('SOCKET_RECONNECT')
    },
    SOCKET_RECONNECT_ERROR() {
      // console.log('SOCKET_RECONNECT_ERROR')
    },
  },
  actions: {},
  modules: {},
  plugins: [VuexORM.install(database)],
})
