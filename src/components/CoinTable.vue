<template>
  <div class="coin-table">
    <coin-table-head></coin-table-head>
    <div class="coin-table__lines global-mod--with-cool-scrollbar">
      <coin-table-line
        v-for="asset in assets"
        :key="asset.id"
        :asset="asset"
      ></coin-table-line>
    </div>

  </div>
</template>

<script>

  import CoinTableHead from '@/components/CoinTableHead'
  import CoinTableLine from '@/components/CoinTableLine'

  import Asset from '@/orm/Asset'



  export default {
    components: {CoinTableHead, CoinTableLine},
    computed: {
      assets(){
        return Asset.all()
      }
    },
    async mounted(){
      await Asset.dispatch('fetchForTable' , {foo: 'bar'})
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
