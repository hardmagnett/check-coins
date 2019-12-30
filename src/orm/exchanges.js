import coinApi from '@/plugins/axios/coinApi'

import Asset from '@/orm/Asset'

export default {
  state: {
  },

  actions: {
    async fetch ({ state, commit, dispatch }) {
      let response = await coinApi.get('exchanges')
      let data = response.data.data
      console.log(data); console.log('^...data:')
      if (data.length){
        let insertedData = await dispatch('insertOrUpdate', {
          data
        })
        console.log(insertedData); console.log('^...insertedData:')
        // todo: вынести в ф-ю
        for (let exchange of insertedData.exchanges) {
            console.log(exchange); console.log('^...exchange:')
        }



      }
    }
  },
  getters:{},
  mutations: {}
}
