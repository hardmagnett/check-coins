import Vue from 'vue'
import Vuex from 'vuex'
import database from '@/orm/database'
import VuexORM from '@vuex-orm/core'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    // мутации по умолчанию, чтобы не ругалось в консоль что их нет.
    SOCKET_ONOPEN () {},
    SOCKET_ONCLOSE () {},
    SOCKET_ONERROR () {},
    SOCKET_ONMESSAGE () {},
    SOCKET_RECONNECT() {},
    SOCKET_RECONNECT_ERROR() {},
  },
  actions: {
    SOCKET_ON_PRICE_CHANGE (state, message)  {
      console.log(message); console.log('^...message in action:')
    },
  },
  modules: {},
  plugins: [VuexORM.install(database)]
})
