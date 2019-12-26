<template>
  <div id="app">
    <container
      class="container--fluid container--top-just-for-design"
    >
    </container>
    <container
      class="container--no-padding-on-xs"
    >
      <coin-table></coin-table>
    </container>

  </div>
</template>
<script>
  import CoinTable from '@/components/CoinTable.vue'
  import Container from '@/components/Container.vue'
  export default {
    components: {CoinTable, Container}
  }


</script>
<style lang="scss">
.container--top-just-for-design {
  background-color: $clrBg;
  height: $gap*2;
  @media (min-width: $bpSm) {
    height: 100px;
    margin-bottom: calc(-100px + #{$gap*2});
  }
}
</style>
