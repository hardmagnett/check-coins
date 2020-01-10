<template>
  <div id="app">
    <container-vertical>
      <container
        class="container--fluid container--top-just-for-design"
      />
      <container
        class="container--no-padding-on-xs container--for-table"
      >
        <coin-table />
      </container>
    </container-vertical>
  </div>
</template>
<script>
import CoinTable from '@/components/coinTable/CoinTable.vue'
import Container from '@/components/containers/Container.vue'
import ContainerVertical from '@/components/containers/ContainerVertical.vue'

export default {
  components: { CoinTable, Container, ContainerVertical },
}


</script>
<style lang="scss">
#app {
  background-color: $clrBgBig;
}
.container-vertical {
  display: flex;
  flex-flow: column nowrap;
  > * {
    width: 100%;
  }
  .container--top-just-for-design {
    flex: 0 0 auto;
  }
  .container--for-table {
    flex: 0 1 auto;
    overflow-y: hidden;

    display: flex;
    flex-flow: column nowrap;

    @media (min-width: $bpSm) {
      margin-bottom: 36px;
      .coin-table {
        border-radius: $border-radius;
      }
    }

    .coin-table {
      overflow-y: hidden;
    }
  }
}

.container--top-just-for-design {
  background-color: $clrMain;
  height: $gap*2;
  @media (min-width: $bpSm) {
    height: 100px;
    margin-bottom: calc(-100px + #{$gap*2});
  }
}
</style>
