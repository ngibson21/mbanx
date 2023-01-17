<template>
  <div class="d-flex pt-3 pb-1" v-if="paymentType">
    <div class="d-flex pa-0 flex-column">
      <div>
        <h2 class="text-subtitle-1">
          {{ paymentType.name }}
        </h2>
      </div>
      <div class="py-1 text-body-1 font-italic grey--text text--lighten-1">
        {{ paymentType.description }}
      </div>
    </div>
    <v-spacer />
    <div class="title">
      <v-btn fab text :disabled="inEdit" @click="toggleEditPaymentType">
        <v-icon>create</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      savingsAccounts: this.$store.getters['accounts/activeSavings']
    }
  },
  computed: {
    paymentType () {
      return this.$store.state.transfers.newTransfer.paymentType
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    toggleEditPaymentType () {
      this.$store.dispatch('transfers/editPanel', { panelName: 'TransferType', step: 'transferTypeInfo' })
    }
  }
}
</script>
