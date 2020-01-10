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
        <p>{{ asset.marketCapUsdHumanReadable }}</p>
      </template>
      <template v-slot:volumeUsd24Hr>
        <p>{{ asset.volumeUsd24HrHumanReadable }}</p>
      </template>
    </coin-table-line-carcaas>
  </div>
</template>

<script>

import CoinTableLineCarcaas from '@/components/coinTable/CoinTableLineCarcaas'
import CoinDetails from '@/components/coinTable/CoinDetails'

import Asset from '@/orm/Asset'

const msToNotBlinkAfterMount = 250

export default {
  components: { CoinTableLineCarcaas, CoinDetails },
  props: {
    asset: {
      type: Asset,
      required: true,
    },
  },
  data() {
    return {
      // нужен чтобы не подсвечивать изменение курса при монтировании, если данные взяты из кеша.
      // Без этого при монтировании некскольких валют, все они одновременно подсвечиваются.
      beforeMountTimestamp: null, // Number|null
    }
  },
  watch: {
    'asset.priceUsdHumanVisible': function (newVal, oldVal) {

      // Если компонент подмонтирован только-что, то не подсвечивать изменения
      if (Date.now() < this.beforeMountTimestamp + msToNotBlinkAfterMount) return

      newVal > oldVal
        ? this.$refs.carcaas.highlightPriceIncrease()
        : this.$refs.carcaas.highlightPriceDecrease()

    },
    'asset.tradesCounter': function () {
      this.$refs.carcaas.highlightNewTrade()
    },
  },
  async beforeMount() {
    this.beforeMountTimestamp = Date.now()
    await Asset.dispatch('updatePriceUsdFromPreCache', { assetId: this.asset.id })
  },
  async mounted() {
    await Asset.dispatch('addVisibleAssetIdForTable', { assetId: this.asset.id })
  },
  async beforeDestroy() {
    await Asset.dispatch('removeVisibleAssetIdForTable', { assetId: this.asset.id })
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
