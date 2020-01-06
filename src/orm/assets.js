import coinApi from '@/plugins/axios/coinApi'

import Asset from '@/orm/Asset'

import _, {
  memoize as _memoize,
  debounce as _debounce,
  property as _property,
  wrap as _wrap
} from 'lodash'
let vuexModuleHelpers = {

  canUpdateVolumeChangeCounterByInterval: function(state, coinId) {
    const msForCoin = 5000
    let now = Date.now()
    let result = false
    if (!state.assetVolumeChangeCounerUpdages[coinId]) {
      state.assetVolumeChangeCounerUpdages[coinId] = {
        lastUpdateTS: now
      }
      result = true
    } else if (
      state.assetVolumeChangeCounerUpdages[coinId]
      && state.assetVolumeChangeCounerUpdages[coinId].lastUpdateTS + msForCoin < now
    ){
      state.assetVolumeChangeCounerUpdages[coinId] = {
        lastUpdateTS: now
      }
      result = true
    }
    return result
  }
}


export default {
  state: {
    assetsPaginationIds: [],

    // {'bitcoin': {lastUpdateTS: timestamp}}
    assetVolumeChangeCounerUpdages: {},
    visibleAssetIdsForTable: []
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
      return
      Asset.update({
        data: dataToUpdate
      })
    },

    // todo: здесь нужна мега-оптимизация
    SOCKET_ON_VOLUME_CHANGE ({ commit }, message)  {
      // if (message.base !== 'bitcoin' && message.quote !== 'bicoin') return
      // return
      commit('updateVolumeChangeCounter', {coinId: message.base})
      commit('updateVolumeChangeCounter', {coinId: message.quote})
    },
    /**
     *
     * @param state
     * @param assetId   Number
     */
    addVisibleAssetIdForTable(state, {assetId}){
      Asset.commit((state) => {
        state.visibleAssetIdsForTable.push(assetId)
      })
    },
    /**
     *
     * @param state
     * @param assetId   Number
     */
    removeVisibleAssetIdForTable(state, {assetId}){
      Asset.commit((state) => {
        state.visibleAssetIdsForTable =
          state.visibleAssetIdsForTable.filter((id) => id !== assetId)
      })
    },
    async fetchForPaginationTable ({ state, commit, dispatch }) {
      let response = await coinApi.get('assets', {params: {
        limit: 100,
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

      // если монета не видна сейчас в таблице, то не нужно показывать операцию
      if (!state.visibleAssetIdsForTable.includes(coinId)) return
      // если только уже была операция, то не показывать ещё одну операцию
      if (!vuexModuleHelpers.canUpdateVolumeChangeCounterByInterval(state, coinId)) return

      // показать операцию
      Asset.update({
        where: coinId,
        data (asset) {
          asset.tradesCounter += 1
        }
      })
    }
  }
}
