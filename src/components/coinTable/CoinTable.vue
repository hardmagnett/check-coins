<template>
  <div class="coin-table">
    <coin-table-head />
    <div class="coin-table__lines global-mod--with-cool-scrollbar">
      <!--Строк в таблице слишком много, поэтому используется virtual list-->
      <virtual-list
        :size="69"
        :remain="15"
        class="virtual-list global-mod--with-cool-scrollbar"
      >
        <coin-table-line
          v-for="asset in assets"
          :key="asset.id"
          :asset="asset"
        />
        <infinite-loading
          :distance="1000"
          @infinite="infiniteHandler"
        >
          <span slot="no-results" />
        </infinite-loading>
      </virtual-list>
    </div>
  </div>
</template>

<script>

import VirtualList from 'vue-virtual-scroll-list'

import CoinTableHead from '@/components/coinTable/CoinTableHead'
import CoinTableLine from '@/components/coinTable/CoinTableLine'

import Asset from '@/orm/Asset'
import Exchange from '@/orm/Exchange'


export default {
  components: { CoinTableHead, CoinTableLine, VirtualList },
  computed: {
    assets() {
      return Asset.getters('getAssetsPagination')
    },
  },
  async mounted() {
    await Exchange.dispatch('fetch')
  },
  methods: {
    async infiniteHandler($state) {
      const response = await Asset.dispatch('fetchForPaginationTable')
      if (response.data.data.length) {
        $state.loaded()
      } else {
        $state.complete()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.coin-table {
  background-color: white;
  border: 1px solid $clrBorderOnDarkBg;

  display: flex;
  flex-flow: column nowrap;
  .virtual-list {
    max-height: 100%; // чтобы избежать проблем со скроллом
  }
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
