import coinApi from '@/plugins/axios/coinApi'

export default {
  state: {
    fetched: false
  },

  actions: {
    async fetchForTable ({ commit, dispatch }) {
      // по умолчанию получает 100 результатов
      let response = await coinApi.get('assets')
      console.log(response); console.log('^...response:')

      await dispatch('insertOrUpdate', {
        data: response.data.data
      })
      commit('fetchForTable')
    }
  },

  mutations: {
    fetchForTable (state) {
      state.fetched = true
      console.log('mutation')
    }
  }
}
