<template>
  <div class="text-center">
    <v-dialog
      v-model="updateExists"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline surface2">
          Web Banking Update
        </v-card-title>

        <v-card-text class="pt-5">
          New version of Web Banking is avalailable. Click <b>UPDATE</b> to get the latest version.
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="refreshApp"
            block
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'RefreshApp',
  data () {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    }
  },
  created () {
    // Listen for our custom event from the SW registration
    document.addEventListener('swUpdated', this.updateAvailable, { once: true })

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      // Here the actual reload of the page occurs
      window.location.reload()
    })
  },

  methods: {
    // Store the SW registration so we can send it a message
    // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
    // To alert the user there is an update they need to refresh for
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    },
    refreshApp () {
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}
</script>
