<template>
  <div class="px-0 px-md-6">
    <div class="text-h4 primary--text font-weight-bold mb-4">
      Disclosure
    </div>
    <div class="pb-5 pt-5">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
    <div class="d-flex justify-end">
      <v-btn class="primary" x-large depressed @click="submit" :disabled="loading" :loading="loading">
        Confirm and continue
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
