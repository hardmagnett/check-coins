<template>
  <div class="coin-table-line">
    <coin-table-line-carcaas ref="carcaas">
      <template v-slot:rank>
        <p>{{ asset.rank }}</p>
      </template>
      <template v-slot:name>
        <coin-details :asset="asset" />
      </template>
      <template v-slot:price>
        <p>{{ asset.priceUsdHumanReadable }}</p>
      </template>
      <template v-slot:market-cap>
        <p>{{ asset.marketCapUsdHumanReadable }}	</p>
      </template>
      <template v-slot:volumeUsd24Hr>
        <p>{{ asset.volumeUsd24HrHumanReadable }}</p>
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
    CoinTableLineCarcaas, CoinDetails,
  },
  props: {
    asset: {
      type: Asset,
      required: true,
    },
  },
  watch: {
    'asset.priceUsdHumanVisible': function (newVal, oldVal) {
      // newVal > oldVal
      //   ? this.$refs.carcaas.highlightPriceIncrease()
      //   : this.$refs.carcaas.highlightPriceDecrease()

      if (newVal > oldVal) {
        this.$refs.carcaas.highlightPriceIncrease()
      } else {
        this.$refs.carcaas.highlightPriceDecrease()
      }
    },
    'asset.tradesCounter': function () {
      this.$refs.carcaas.highlightNewTrade()
    },
  },
  async beforeDestroy() {
    await Asset.dispatch('removeVisibleAssetIdForTable', { assetId: this.asset.id })
  },
  async mounted() {
    await Asset.dispatch('addVisibleAssetIdForTable', { assetId: this.asset.id })
  },
}
</script>

<style scoped lang="scss">
.coin-table-line {
  .coin-details {
    width: 100%;
  }
}
</style>
