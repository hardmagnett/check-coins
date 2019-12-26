<template>
  <div class="coin-details">
    <img class="coin-details__img" src="https://static.coincap.io/assets/icons/mkr@2x.png">
    <div class="coin-details__texts">
      <p class="coin-details__name">Bitcoin</p>
      <p class="text text--small coin-details__code">BTC</p>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped lang="scss">
.coin-details {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .coin-details__img {
    width: 50px;
    height: 50px;
    margin-right: $gap;
    /*float: left;*/
    /*outline: 1px solid darkred;*/
  }
  .coin-details__name {
    margin-bottom: 0.5em;
  }
  .coin-details__code {
    margin-top: 0.5em;
  }
}
</style>
