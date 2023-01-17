<template>
  <v-snackbar
    v-model="show"
    left
    bottom
    multi-line
    :timeout="timeout"
    :class="styleClass"
  >
    <div class="subheading mb-0">
      {{ message }}
    </div>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      timeout: 4000,
      show: false,
      message: null,
      queue: []
    }
  },
  methods: {
    displayMessage (message, options = {}) {
      if (options.flushQueue) {
        this.addPriorityMessage(message)
      } else {
        this.addMessage(message)
      }
    },
    addMessage (message) {
      // Will add to back of queue, and wait
      this.queue.push(message)
      if (!this.show) {
        this.message = this.queue.shift()
        this.show = true
      }
    },
    addPriorityMessage (message) {
      // Push everything out of queue
      this.show = false
      this.queue = []
      this.message = message
      this.$nextTick(function () {
        this.show = true
      })
    }
  },
  computed: {
    hasNotificationsPending () {
      return this.queue.length > 0
    },
    styleClass () {
      return this.$vuetify.breakpoint.xsOnly && this.$store.state.user.authenticated ? 'notification' : ''
    }
  },
  watch: {
    show () {
      if (!this.show && this.hasNotificationsPending) {
        this.message = this.queue.shift()
        this.$nextTick(function () {
          this.show = true
        })
      }
    }
  },
  created () {
    this.$bus.$on('notify-with-message', this.displayMessage)
  },
  beforeDestroy () {
    this.$bus.$off('notify-with-message', this.displayMessage)
  }
}
</script>

<style scoped>
  .notification {
    height: 207px;
  }
</style>
