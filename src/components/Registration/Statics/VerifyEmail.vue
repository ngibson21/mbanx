<template>
  <div class="px-0 px-md-6">
    <div class="text-h4 primary--text font-weight-bold mb-4">
      Confirm it's you
    </div>
    <div>
      <p>
        Verify your email address so we know it's really you and so we can continue in the registration process.
      </p>
      <div class="text-center">
        <v-btn class="primary" x-large depressed @click="submit" :disabled="loading" :loading="loading">
          Verify your email address
        </v-btn>
      </div>
      <p class="pt-3">
        Do you have any questions? Contact us.
      </p>
      <p>
        Thank you, smile and have a nice day
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    firstName () {
      return this.$store.state.registration.data.firstName
    }
  },
  methods: {
    async submit () {
      this.loading = true
      try {
        await this.$store.dispatch('registration/goNext')
      } catch (e) {
        this.$bus.$emit('notify-with-message', e[0]?.message || e?.message, { flushQueue: true })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
