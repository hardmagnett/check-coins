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
        'mod--flash-success': isPriceJustIncreased,
        'mod--flash-error': isPriceJustDecreased
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
        'mod--flash-success-trade': isNewDealJustFinished,
      }"
      @animationend="finishFlashAnimationTrade"
    >
      <slot name="volumeUsd24Hr" />
    </div>
  </div>
</template>

<script>
// todo: навести порядок с анимациями.
export default {
  data() {
    return {
      isPriceJustIncreased: false,
      isPriceJustDecreased: false,
      isNewDealJustFinished: false,
    };
  },
  methods: {
    highlightPriceIncrease() {
      this.isPriceJustIncreased = true;
    },
    highlightPriceDecrease() {
      this.isPriceJustDecreased = true;
    },
    highlightNewTrade() {
      this.isNewDealJustFinished = true;
    },
    finishFlashAnimation() {
      this.isPriceJustIncreased = false;
      this.isPriceJustDecreased = false;
    },
    finishFlashAnimationTrade() {
      this.isNewDealJustFinished = false;
    },
  },
};
</script>

<style scoped lang="scss">
.coin-table-line-carcaas {
  display: flex;
  flex-flow: row nowrap;
  /*align-items: center;*/

  align-items: stretch;

  > * {
    flex: 0 0 auto;
    padding: $gap / 2;
    /*padding: 0;*/
    overflow: hidden;
    display: flex;
    /*outline: 1px solid darkred;*/
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

  .mod--flash-success-trade {
    animation: flash-success 0.2s
  }
  .mod--flash-success {
    animation: flash-success 1s
  }
  @keyframes flash-success {
    from {background-color: initial;}
    50% {background-color: #d4facf;}
    to {background-color: initial;}
  }
  .mod--flash-error {
    animation: flash-error 1s
  }
  @keyframes flash-error {
    from {background-color: initial;}
    50% {background-color: #facfcb;}
    to {background-color: initial;}
  }
}
</style>
