import coinApi from '@/plugins/axios/coinApi'

import Asset from '@/orm/Asset'

export default {
  state: {
    fetched: false
  },

  actions: {
    async fetchForTable ({ commit, dispatch }) {
      // по умолчанию получает 100 результатов
      // const limit = 1000
      // const limit = 2000
      // const limit = 200
      // const limit = 15
      const limit = 50
      let currAssetsQty = Asset.all().length
      let response = await coinApi.get('assets', {params: {
        limit: limit,
        offset: currAssetsQty

      }})
      // console.log(response); console.log('^...response:')

      await dispatch('insertOrUpdate', {
        data: response.data.data
      })
      commit('fetchForTable')
      return response
    }
  },

  mutations: {
    fetchForTable (state) {
      state.fetched = true
      // console.log('mutation')
    }
  }
}
