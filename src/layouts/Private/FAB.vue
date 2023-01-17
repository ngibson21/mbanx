<template>
  <v-btn
    v-if="link && $appConfig.enabled(link.name) && !(xsOnly && link.name === 'newTransfer')"
    :key="link.name"
    fab
    :style="xsOnly? { bottom: '65px' } : {}"
    :fixed="xsOnly"
    :bottom="xsOnly"
    :right="xsOnly"
    :color="color"
    :to="link"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: 'add'
    },
    color: {
      type: String,
      default: 'accent'
    }
  },
  computed: {
    xsOnly () {
      return this.$vuetify.breakpoint.xsOnly
    }
  }
}
</script>
