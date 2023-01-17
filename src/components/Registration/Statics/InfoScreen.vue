<template>
  <div class="px-0 px-md-6">
    <div class="text-h4 primary--text font-weight-bold mb-2">
      Alright,
    </div>
    <div class="text-h4 primary--text font-weight-bold mb-2">
      let's get going now.
    </div>
    <div class="pt-5">
      To be able to open your new bank account, we need to collect some information about your company and team.
    </div>
    <div class="pb-5">
      Your data is automatically saved after every step, so you can take a rest at any time.
    </div>
    <div class="text-center">
      <v-btn class="primary" depressed @click="submit" x-large :disabled="loading" :loading="loading">
        Start with your company profile
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
