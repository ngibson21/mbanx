<template>
  <v-card height="100%" flat :color="color">
    <div class="d-flex pa-4 py-3">
      <div class="d-flex text-subtitle-1 align-self-center">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="d-flex ml-auto" v-if="seeMoreLink">
        <v-btn text small icon @click="redirect(seeMoreLink)">
          <v-icon class="ma-0 pa-0">
            arrow_forward
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    seeMoreLink: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    redirect (path) {
      return this.$router.push({
        name: path
      })
    }
  }
}
</script>
