import Vue from 'vue'
import Vuex from 'vuex'
import database from '@/orm/database'
import VuexORM from '@vuex-orm/core'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [VuexORM.install(database)]
})
