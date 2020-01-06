import coinApi from '@/plugins/axios/coinApi';

import Asset from '@/orm/Asset';
import store from '@/store';

export default {
  state: {
  },

  actions: {
    async fetch({ state, commit, dispatch }) {
      const response = await coinApi.get('exchanges');
      const { data } = response.data;
      // console.log(data); console.log('^...data:')
      if (data.length) {
        const insertedData = await dispatch('insertOrUpdate', {
          data,
        });
        // console.log(insertedData); console.log('^...insertedData:')
        // todo: вынести в ф-ю
        for (const exchange of insertedData.exchanges) {
          if (!exchange.socket) continue;
          // console.log(exchange); console.log('^...exchange:')
          this._vm.$connect(`wss://ws.coincap.io/trades/${exchange.exchangeId}`, {
            store,
            format: 'json',
            reconnection: true,
            passToStoreHandler(eventName, event) {
              if (!eventName.startsWith('SOCKET_')) { return; }
              const msg = event.data ? JSON.parse(event.data) : {};

              let myVuexMethodType = 'commit'; // по умолчанию вызывается мутация
              let myVuexNamespace = ''; // по умолчанию корневой модуль
              let myVuexMethodName = eventName.toUpperCase();

              if (
                eventName === 'SOCKET_onmessage'
              ) {
                myVuexMethodType = 'dispatch'; // вызывает экшн
                myVuexNamespace = 'entities/assets/';
                myVuexMethodName = 'SOCKET_ON_VOLUME_CHANGE';
              }
              const myVuexMethodNameFull = myVuexNamespace + myVuexMethodName;
              this.store[myVuexMethodType](myVuexMethodNameFull, msg);
            },
          });
        }
      }
    },
  },
  getters: {},
  mutations: {},
};
