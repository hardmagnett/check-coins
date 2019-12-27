export default {
  state: {
    fetched: false
  },

  actions: {
    async fetchForTable ({ commit, dispatch }) {

      await dispatch('insertOrUpdate', {
        data: [
          {
            id: 'mycurrency',
            rank: 100,
            symbol: 'DDD',
            name: 'my currency'
          }
        ]
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
