<template>
  <div class="px-0 px-md-6">
    <div>
      <p>
        You currently applied for opening a business account through our bank app. If you want to confirm this application, please click the link below.
      </p>
      <v-btn class="primary" block depressed @click="submit" :disabled="loading" :loading="loading">
        Click here to confirm your application
      </v-btn>
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
