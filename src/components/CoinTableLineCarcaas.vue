<template>
  <div class="coin-table-line-carcaas">
    <div class="coin-table-line-carcaas__rank">
      <slot name="rank"/>
    </div>
    <div class="coin-table-line-carcaas__name">
      <slot name="name"/>
    </div>
    <div class="coin-table-line-carcaas__pusher"></div>
    <div class="coin-table-line-carcaas__price"
         :class="{'mod--flash-green': isPriceJustIncreased}"
         @animationend="isPriceJustIncreased = false"
    >
      <slot name="price"/>
    </div>
    <div class="coin-table-line-carcaas__market-cap">
      <slot name="market-cap"/>
    </div>
    <div class="coin-table-line-carcaas__volumeUsd24Hr">
      <slot name="volumeUsd24Hr"/>
    </div>
  </div>
</template>

<script>

export default {
  data: function(){
    return {
      isPriceJustIncreased: false
    }
  },
  methods: {
    highlightPriceIncrease() {
      this.isPriceJustIncreased = true
    }
  }
}
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
  .coin-table-line-carcaas__rank,
  .coin-table-line-carcaas__market-cap,
  .coin-table-line-carcaas__volumeUsd24Hr
  {
    display: none;
  }
  @media (min-width: $bpSm) {
    .coin-table-line-carcaas__rank {
      display: flex;
    }
  }
  @media (min-width: $bpSm2) {
    .coin-table-line-carcaas__market-cap,
    .coin-table-line-carcaas__volumeUsd24Hr {
      display: flex;
    }
  }


  .mod--flash-green {
    /*animation: flash-green 1s ease-in-out 0.5s alternate;*/
    animation: flashGreen 1s
  }
  @keyframes flashGreen {
    from {background-color: white;}
    50% {background-color: green;}
    to {background-color: white;}
  }
}
</style>
