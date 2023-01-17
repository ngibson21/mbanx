<template>
  <v-img
    class="product-network-image"
    v-if="network"
    contain
    :src="providerLogo"
    :max-height="size"
    :max-width="size"
  />
</template>

<script>
export default {
  props: {
    network: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 20
    }
  },
  computed: {
    providerLogo () {
      return require(`../assets/images/${this.network.toLowerCase()}.png`)
    }
  }
}
</script>
