<template>
  <div class="coin-table">
    <coin-table-head></coin-table-head>
    <div class="coin-table__lines">
      <coin-table-line
        v-for="n in 100"
        :key="n"
      ></coin-table-line>
    </div>

  </div>
</template>

<script>

  import CoinTableHead from '@/components/CoinTableHead'
  import CoinTableLine from '@/components/CoinTableLine'

  export default {
    components: {CoinTableHead, CoinTableLine}
  }
</script>

<style scoped lang="scss">
.coin-table {
  background-color: white;
}
</style>
