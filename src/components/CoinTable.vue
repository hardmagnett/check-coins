<template>
  <div class="coin-table">
    <coin-table-head></coin-table-head>
    <div class="coin-table__lines global-mod--with-cool-scrollbar">
      <virtual-list
        :size="69"
        :remain="20"

        style="max-height: 100%;"
        class="global-mod--with-cool-scrollbar"
      >
        <coin-table-line
          v-for="asset in assets"
          :key="asset.id"
          :asset="asset"
        ></coin-table-line>
        <infinite-loading
          @infinite="infiniteHandler"
        >
          <span slot="no-results"></span>
        </infinite-loading>
      </virtual-list>
    </div>

  </div>
</template>

<script>

  import VirtualList from 'vue-virtual-scroll-list'

  import CoinTableHead from '@/components/CoinTableHead'
  import CoinTableLine from '@/components/CoinTableLine'

  import Asset from '@/orm/Asset'
  import Exchange from '@/orm/Exchange'



  export default {
    components: {CoinTableHead, CoinTableLine, VirtualList},
    computed: {
      assets(){
        return Asset.getters('getAssetsPagination')
      }
    },
    methods: {
      async infiniteHandler($state) {
        let response = await Asset.dispatch('fetchForPaginationTable' , {foo: 'bar'})
        if (response.data.data.length) {
          $state.loaded();	// значит можно загружать ещё
        } else {
          $state.complete();	// значит больше загружать нельзя
        }
      },
    },
    async mounted(){
      await Exchange.dispatch('fetch')
    }
  }
</script>

<style scoped lang="scss">
.coin-table {
  background-color: white;
  border: 1px solid $clrBorderOnDarkBg;

  display: flex;
  flex-flow: column nowrap;
  .coin-table__lines {
    flex: 0 1 auto;
    overflow-y: auto;
    .coin-table-line {
      border-bottom: 1px solid $clrBorderOnLightBg;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
