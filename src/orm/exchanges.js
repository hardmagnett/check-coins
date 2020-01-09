import coinApi from '@/plugins/axios/coinApi'

import createOptions from '@/plugins/vueNativeSock/websocketsCoinCap.js'

export default {
  state: {},

  actions: {
    async fetch({ dispatch }) {
      const response = await coinApi.get('exchanges')
      const { data } = response.data
      if (data.length) {
        const insertedData = await dispatch('insertOrUpdate', {
          data,
        })

        // от каждой биржи, для которой есть вебсокет, получать информацию о сделках
        for (const exchange of insertedData.exchanges) {
          if (!exchange.socket) continue

          this._vm.$connect(
            `wss://ws.coincap.io/trades/${exchange.exchangeId}`,
            createOptions({}, {
              onmessage: {
                namespace: 'entities/assets/',
                methodType: 'dispatch',
                methodName: 'ON_VOLUME_CHANGE',
              },
            }),
          )
        }
      }
    },
  },
  getters: {},
  mutations: {},
}
