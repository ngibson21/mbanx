<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs8 sm4 md4 lg4 text-center>
      <img
        class="mb-6"
        :src="$appConfig.assets(`logo-full-${imageTheme}.png`)"
        :srcset="$appConfig.assets(`logo-full-${imageTheme}@2x.png`) + ' 2x'"
      >
      <v-progress-linear
        :indeterminate="true"
      />
      <p class="text-h6 mt-2">
        {{ $t('components.loadingScreen.loading') }}
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async mounted () {
    try {
      await this.$store.dispatch('views/initialLoading')
      await this.$router.push({ name: 'dashboard' })
      await this.$store.dispatch('application/toggleLoadingScreen')

      this.$bus.$emit('notify-with-message', this.$t('views.login.notifications.successfulLogin'), { flushQueue: true })
    } catch (error) {
      if (error.message === 'noActiveSavings') {
        this.$bus.$emit('notify-with-message', this.$t('views.errorCodes.noActiveSavings'), { flushQueue: true })
      }

      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('application/toggleLoadingScreen')
    }
  },
  computed: {
    imageTheme () {
      return this.$store.getters['localSettings/imageTheme']
    },
    fontClass () {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg': return 'text-h5'
        default: return 'title'
      }
    }
  }
}
</script>
