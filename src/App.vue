<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <ErrorPage v-if="hasErrors" />
      <Loading v-else-if="loading" />
      <PrivateLayout v-else-if="authenticated" />
      <PublicLayout v-else />
    </v-fade-transition>
    <Notification />
    <ConfirmationModal />
    <RefreshApp />
  </v-app>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'

export default {
  components: {
    ErrorPage: lazyLoad('views/Error'),
    Loading: lazyLoad('views/InitialLoading'),
    PrivateLayout: lazyLoad('layouts/Private/Container'),
    PublicLayout: lazyLoad('layouts/Public/Container'),
    Notification: lazyLoad('views/Notifications'),
    ConfirmationModal: lazyLoad('components/Shared/ConfirmationModal'),
    RefreshApp: lazyLoad('components/Shared/RefreshApp')
  },
  methods: {
    applyTheme () {
      this.$vuetify.theme.dark = this.isDark
      document.querySelector('#theme-color').setAttribute('content',
        this.$vuetify.theme.themes[`${this.isDark ? 'dark' : 'light'}`].background)
    }
  },
  watch: {
    isDark () {
      this.applyTheme()
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
    isDark () {
      return this.$store.state.localSettings.darkMode
    },
    hasErrors () {
      return this.$store.state.application.hasErrors
    },
    loading () {
      return this.$store.state.application.loadingScreen
    }
  },
  created () {
    /**
     * Stash the event so it can be triggered later for native A2HS.
     * This need to be here because the event
     * only fire on first page load.
     */
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      this.$store.dispatch('pwa/updateA2HSEvent', e)
    })
  },
  beforeUpdate () {
    this.applyTheme()
  }
}
</script>
