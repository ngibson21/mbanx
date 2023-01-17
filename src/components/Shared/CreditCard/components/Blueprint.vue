<template>
  <v-responsive aspect-ratio="1.66" class="card-border">
    <slot />
  </v-responsive>
</template>

<style scoped>
  .card-border {
    border-radius: 8px !important;
    -webkit-border-radius: 8px !important;
    -moz-border-radius: 8px !important;
  }
</style>
