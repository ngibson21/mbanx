<template>
  <div>
    <div class="pa-3 font-weight-medium">
      {{ $t('components.transfers.searchList.wouldYouLike') }}
    </div>
    <v-btn color="primary" class="ma-3" @click="newTransfer">
      {{ $t('components.transfers.searchList.newTransfer') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  methods: {
    newTransfer () {
      const recipient = { fullName: this.keyword }
      this.$store.dispatch('transfers/saveRecipient', { data: recipient, to: 'CreditDetails' })
    }
  }
}
</script>
