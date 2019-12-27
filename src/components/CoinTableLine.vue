<template>
  <div class="coin-table-line">
    <coin-table-line-carcaas>
      <template v-slot:rank>
        <p>{{asset.rank}}</p>
      </template>
      <template v-slot:name>
        <coin-details :asset="asset"/>
      </template>
      <template v-slot:price>
        <p>{{asset.priceUsdHumanReadable}}</p>
      </template>
      <template v-slot:market-cap>
<!--        <p>$130.59b	</p>-->
        <p>{{asset.marketCapUsdHumanReadable}}	</p>
      </template>
      <template v-slot:vwap24hr>
        <p>$17,141.90</p>
      </template>
    </coin-table-line-carcaas>
  </div>
</template>

<script>

import CoinTableLineCarcaas from '@/components/CoinTableLineCarcaas'
import CoinDetails from '@/components/CoinDetails'

import Asset from '@/orm/Asset'




export default {
  components: {
    CoinTableLineCarcaas, CoinDetails
  },
  props: {
    asset: {
      type: Asset,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.coin-table-line {
  .coin-details {
    width: 100%;
  }
}
</style>
