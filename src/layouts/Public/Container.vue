<template>
  <v-main>
    <v-container class="overflow-hidden fill-height pa-0 ma-0" fluid>
      <div class="d-flex align-stretch fill-height flex-grow-1">
        <div class="d-flex flex-column col-12 pt-13 align-center content-container">
          <a href="#/login">
            <img
              style="height: 80px;"
              :src="$appConfig.assets(`logo-full-${imageTheme}.png`)"
              :srcset="$appConfig.assets(`logo-full-${imageTheme}@2x.png`) + ' 2x'"
            >
          </a>
          <div :class="`d-flex flex-column justify-center flex-grow-1 flex-shrink-1 ${$vuetify.breakpoint.smAndUp ? 'col-8' : ''}`">
            <div class="justify-center">
              <v-fade-transition mode="out-in">
                <router-view />
              </v-fade-transition>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
export default {
  computed: {
    imageTheme () {
      return this.$store.getters['localSettings/imageTheme']
    },
    notification () {
      return {
        status: this.$store.state.application.notification.status,
        text: this.$store.state.application.notification.text
      }
    }
  }
}
</script>
<style scoped lang="scss">
.content-container {
  height: 100vh;
  overflow-y: scroll;
}
</style>
