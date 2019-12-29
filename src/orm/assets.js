import coinApi from '@/plugins/axios/coinApi'

import Asset from '@/orm/Asset'

export default {
  state: {
    assetsPaginationIds: []
  },

  actions: {
    SOCKET_ON_PRICE_CHANGE (state, message)  {
      console.log(message); console.log('^...message in action in entities:')
    },
    async fetchForPaginationTable ({ state, commit, dispatch }) {
      let response = await coinApi.get('assets', {params: {
        limit: 50,
        offset: state.assetsPaginationIds.length
      }})

      if (response.data.data.length) {
        let insertedData = await dispatch('insertOrUpdate', {
          data: response.data.data
        })
        let insertedIds = insertedData.assets.map((asset) => asset.id)
        commit('addAssetsPaginationIds', {newIds: insertedIds})
      }

      return response
    }
  },
  getters:{
    getAssetsPagination(state){
      return Asset.query()
        .whereIdIn(state.assetsPaginationIds)
        .get()
    }
  },
  mutations: {
    addAssetsPaginationIds (state, {newIds}) {
      state.assetsPaginationIds = [...state.assetsPaginationIds, ...newIds]
    },
  }
}
