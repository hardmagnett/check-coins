import coinApi from '@/plugins/axios/coinApi'

import Asset from '@/orm/Asset'

import _, {
  memoize as _memoize,
  debounce as _debounce,
  property as _property,
  wrap as _wrap
} from 'lodash'

export default {
  state: {
    assetsPaginationIds: []
  },

  actions: {
    // todo
    // эта штука и так работает немного быстрее чем coincap.
    // но для небольшого прироста производительности нужно делать:
    // 1 - реконнект с обновлением данных какие валюты нужно получать
    // 2 - сделать максимальную частоту обновления раз в 3 секунды
    SOCKET_ON_PRICE_CHANGE (state, newPrices)  {

      let dataToUpdate = []
      for (let coinName in newPrices) {
        // console.log(coinName)
        if (coinName === 'ethereum') {
          // console.log('new ethereum price')
        }
        let coinNewPrice = newPrices[coinName];
        dataToUpdate.push({
          id: coinName,
          priceUsd: coinNewPrice
        })
      }
      // return
      // Asset.update({
      //   data: dataToUpdate
      // })
    },

    // SOCKET_ON_VOLUME_CHANGE: _wrap(
    //   _memoize(
    //     function(state, message) {
    //       return _debounce(save,
    //         1000,
    //         {maxWait: 1000}
    //       );
    //     },
    //     _property('id')
    //   ),
    //   function(func, obj) {
    //     return func(obj)(obj);
    //   }
    // ),
    // todo: здесь нужна мега-оптимизация
    SOCKET_ON_VOLUME_CHANGE ({ commit }, message)  {
      if (message.base !== 'bitcoin' && message.quote !== 'bicoin') return
      // return
      commit('updateVolumeChangeCounter', {coinId: message.base})
      commit('updateVolumeChangeCounter', {coinId: message.quote})
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
    updateVolumeChangeCounter (state, {coinId}) {
      Asset.update({
        where: (asset) => {
          return [coinId].includes(asset.id)
        },
        data (asset) {
          asset.tradesCounter += 1
        }
      })
    }
  }
}
