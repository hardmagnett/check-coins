<template>
  <div class="coin-table-line">
    <coin-table-line-carcaas
      ref="carcaas"
    >
      <template v-slot:rank>
        <p
        >{{asset.rank}}</p>
      </template>
      <template v-slot:name>
        <coin-details :asset="asset"/>
      </template>
      <template v-slot:price>
<!--        :class="{'mod&#45;&#45;flash-green': isPriceJustIncreased}"-->
<!--        @animationend="isPriceJustIncreased = false"-->
        <p

        >
          {{asset.priceUsdHumanReadable}}
        </p>
      </template>

      <template v-slot:market-cap>
        <p>{{asset.marketCapUsdHumanReadable}}	</p>
      </template>
      <template v-slot:volumeUsd24Hr>
        <p>{{asset.volumeUsd24HrHumanReadable}}</p>
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
  },
  // data: function(){
  //   return {
  //     isPriceJustIncreased: false
  //   }
  // },
  watch: {
    'asset.priceUsd': function(newVal, oldVal){
      this.$refs.carcaas.highlightPriceIncrease()
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
