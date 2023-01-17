<template>
  <v-col
    :cols="cols"
    :md="md"
  >
    <slot />
  </v-col>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    cols: {
      type: Number,
      default: 12
    },
    md: {
      type: Number,
      default: 12
    }
  }
}
</script>
