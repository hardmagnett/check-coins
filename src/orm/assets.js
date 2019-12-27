import coinApi from '@/plugins/axios/coinApi'

export default {
  state: {
    fetched: false
  },

  actions: {
    async fetchForTable ({ commit, dispatch }) {
      // по умолчанию получает 100 результатов
      // const limit = 1000
      const limit = 2000
      // const limit = 200
      // const limit = 15
      let response = await coinApi.get('assets', {params: {limit: limit}})
      // console.log(response); console.log('^...response:')

      await dispatch('insertOrUpdate', {
        data: response.data.data
      })
      commit('fetchForTable')
    }
  },

  mutations: {
    fetchForTable (state) {
      state.fetched = true
      // console.log('mutation')
    }
  }
}
