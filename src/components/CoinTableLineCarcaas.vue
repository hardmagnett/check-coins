<template>
  <div class="coin-table-line-carcaas">
    <div class="coin-table-line-carcaas__rank">
      <slot name="rank"/>
    </div>
    <div class="coin-table-line-carcaas__name">
      <slot name="name"/>
    </div>
    <div class="coin-table-line-carcaas__price">
      <slot name="price"/>
    </div>
    <div class="coin-table-line-carcaas__market-cap">
      <slot name="market-cap"/>
    </div>
    <div class="coin-table-line-carcaas__vwap24hr">
      <slot name="vwap24hr"/>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped lang="scss">
.coin-table-line-carcaas {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  > * {
    flex: 0 0 auto;
    padding: $gap;
    overflow: hidden;
    display: flex;
  }

  .coin-table-line-carcaas__rank {
    flex: 0 0 80px;
    justify-content: center;
  }
  .coin-table-line-carcaas__name {
    flex: 1 0 auto
  }

  .coin-table-line-carcaas__price {
    flex: 0 0 150px;
    justify-content: flex-end;
  }
  .coin-table-line-carcaas__market-cap {
    flex: 0 0 150px;
    justify-content: flex-end;
  }
  .coin-table-line-carcaas__vwap24hr {
    flex: 0 0 150px;
    justify-content: flex-end;
  }
  .coin-table-line-carcaas__rank,
  .coin-table-line-carcaas__market-cap,
  .coin-table-line-carcaas__vwap24hr {
    display: none;
  }
  @media (min-width: $bpSm) {
    .coin-table-line-carcaas__rank {
      display: flex;
    }
  }
  @media (min-width: $bpSm2) {
    .coin-table-line-carcaas__market-cap,
    .coin-table-line-carcaas__vwap24hr {
      display: flex;
    }
  }
}
</style>
