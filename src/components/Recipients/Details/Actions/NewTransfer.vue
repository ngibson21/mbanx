<template>
  <div class="pb-3 d-flex">
    <p class="title">
      {{ $t('components.recipients.details.details') }}
    </p>
    <v-btn rounded depressed color="accent" class="ml-auto" @click="makeTransfer">
      <v-icon left>
        call_made
      </v-icon>
      {{ $t('components.recipients.details.sendMoney') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    recipient: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    makeTransfer () {
      this.$router.push({ name: 'newTransfer' })
      this.$store.dispatch('transfers/saveRecipient', { data: this.recipient, to: 'TransferDetails' })
      this.$store.dispatch('transfers/setCompleteStep', { step: 'recipientAccountInfo' })
      this.$emit('hide-action-drawer')
    }
  }
}
</script>
