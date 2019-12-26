<template>
  <div class="coin-table">
    <coin-table-head></coin-table-head>
    <div class="coin-table__lines global-mod--with-cool-scrollbar">
      <coin-table-line
        v-for="n in 100"
        :key="n"
      ></coin-table-line>
    </div>

  </div>
</template>

<script>

  import CoinTableHead from '@/components/CoinTableHead'
  import CoinTableLine from '@/components/CoinTableLine'

  export default {
    components: {CoinTableHead, CoinTableLine}
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
