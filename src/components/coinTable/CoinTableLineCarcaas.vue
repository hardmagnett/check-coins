<template>
  <div class="coin-table-line-carcaas">
    <div
      v-if="$screen.showInTableColumnRank"
      class="coin-table-line-carcaas__rank"
    >
      <slot name="rank" />
    </div>
    <div class="coin-table-line-carcaas__name">
      <slot name="name" />
    </div>
    <div class="coin-table-line-carcaas__pusher" />
    <div
      class="coin-table-line-carcaas__price"
      :class="{
        'global-mod--flash-success': isPriceJustIncreased,
        'global-mod--flash-error': isPriceJustDecreased
      }"
      @animationend="finishFlashAnimation"
    >
      <slot name="price" />
    </div>
    <div
      v-if="$screen.showInTableColumnMarketCap"
      class="coin-table-line-carcaas__market-cap"
    >
      <slot name="market-cap" />
    </div>
    <div
      v-if="$screen.showInTableColumnVolume24Hr"
      class="coin-table-line-carcaas__volumeUsd24Hr"
      :class="{
        'global-mod--flash-success-default': isNewDealJustFinished,
      }"
      @animationend="finishFlashAnimationTrade"
    >
      <slot name="volumeUsd24Hr" />
    </div>
  </div>
</template>

<script>

/**
 * Vue не умеет анимировать простую подсветку. Поэтому здесь трюк с @animationend.
 */
export default {
  data() {
    return {
      isPriceJustIncreased: false,
      isPriceJustDecreased: false,
      isNewDealJustFinished: false,
    }
  },
  methods: {
    highlightPriceIncrease() {
      this.isPriceJustIncreased = true
    },
    highlightPriceDecrease() {
      this.isPriceJustDecreased = true
    },
    highlightNewTrade() {
      this.isNewDealJustFinished = true
    },
    finishFlashAnimation() {
      this.isPriceJustIncreased = false
      this.isPriceJustDecreased = false
    },
    finishFlashAnimationTrade() {
      this.isNewDealJustFinished = false
    },
  },
}
</script>

<style scoped lang="scss">
.coin-table-line-carcaas {
  display: flex;
  flex-flow: row nowrap;

  align-items: stretch;

  > * {
    flex: 0 0 auto;
    padding: $gap / 2;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .coin-table-line-carcaas__rank {
    flex: 0 0 60px;
    justify-content: center;
  }
  .coin-table-line-carcaas__name {
    flex: 0 1 auto;
  }
  .coin-table-line-carcaas__pusher {
    flex: 1 1 auto;
    padding: 0;
  }

  .coin-table-line-carcaas__price {
    flex: 0 0 120px;
    justify-content: flex-end;
  }
  .coin-table-line-carcaas__market-cap {
    flex: 0 0 100px;
    justify-content: flex-end;
  }
  .coin-table-line-carcaas__volumeUsd24Hr {
    flex: 0 0 130px;
    justify-content: flex-end;
  }
}
</style>
