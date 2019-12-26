<template>
  <div class="coin-table-head">
    <coin-table-line-carcaas>
      <template v-slot:rank>
        <p>Rank</p>
      </template>
      <template v-slot:name>
        <p>Name</p>
      </template>
      <template v-slot:price>
        <p>Price</p>
      </template>
      <template v-slot:market-cap>
        <p>Market Cap</p>
      </template>
      <template v-slot:vwap24hr>
        <p>VWAP (24Hr)</p>
      </template>
    </coin-table-line-carcaas>
  </div>
</template>

<script>

import CoinTableLineCarcaas from '@/components/CoinTableLineCarcaas'


export default {
  components: {
    CoinTableLineCarcaas
  }
}
</script>

<style scoped lang="scss">
.coin-table-head {
  background-color: $clrBgSmall;
  border-bottom: 1px solid $clrBorderOnLightBg;
  padding-right: $scrollbarWidth;
}
</style>
