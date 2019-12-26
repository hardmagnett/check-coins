<template>
  <div class="coin-table-line">
    <coin-table-line-carcaas>
      <template v-slot:rank>
        <p>1</p>
      </template>
      <template v-slot:name>
        <div class="currency-details">
          <p>Bitcoin</p>
          <p>BTC</p>
        </div>
      </template>
      <template v-slot:price>
        <p>$7,207.13	</p>
      </template>
      <template v-slot:market-cap>
        <p>$130.59b	</p>
      </template>
      <template v-slot:vwap24hr>
        <p>$17,141.90</p>
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
.coin-table-line {

}
</style>
