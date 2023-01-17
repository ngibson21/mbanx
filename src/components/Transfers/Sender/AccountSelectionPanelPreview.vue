<template>
  <div class="d-flex pt-3 pb-1" v-if="recipient.debtor">
    <div>
      <h2 class="text-subtitle-1">
        {{ recipient.debtor.product.name }}
      </h2>
      <h3 class="text-subtitle-2 font-weight-bold">
        {{ recipient.debtor.accountNumber }}
      </h3>
    </div>
    <v-spacer />
    <div class="title" v-if="savingsAccounts.length > 1">
      <v-btn fab text :disabled="inEdit" @click="toggleEditAccountSelection">
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
    recipient () {
      return this.$store.state.transfers.newTransfer
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    toggleEditAccountSelection () {
      this.$store.dispatch('transfers/editPanel', { panelName: 'AccountSelection', step: 'debitAccountInfo' })
    }
  }
}
</script>
