<template>
  <div>
    <div class="text-h4 primary--text font-weight-bold mb-2">
      Final confirmation
    </div>
    <div class="pb-5 pt-5">
      <p>
        You are about to submit this application to open a business account.
      </p>
      <p>
        Click 'Confirm application' button below. You will receive a message to the director's email address you have filled in. Please follow the instruction in the email to confirm and submit this application for your business account.
      </p>
    </div>
    <div class="d-flex justify-end">
      <v-btn class="primary" depressed @click="submit" :disabled="loading" :loading="loading">
        Confirm application
      </v-btn>
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
