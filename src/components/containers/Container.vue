<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.container {
  padding-right: $gap;
  padding-left: $gap;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: $bpSm2) {
    max-width: $bpSm2;
  }
  @media (min-width: $bpMd) {
    max-width: $bpMd;
  }
  @media (min-width: $bpMd) {
    max-width: $bpMd;
  }
  @media (min-width: $bpLg) {
    max-width: $bpLg;
  }
  @media (min-width: $bpXl) {
    max-width: $bpXl;
  }
}
.container--no-padding-on-xs {
  padding-right: 0;
  padding-left: 0;
  @media (min-width: $bpSm) {
    padding-right: $gap;
    padding-left: $gap;
  }
}
.container--fluid {
  max-width: 100% !important;
}
</style>
