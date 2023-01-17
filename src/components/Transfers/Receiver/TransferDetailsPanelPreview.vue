<template>
  <div class="d-flex pt-3 pb-1">
    <div>
      <h2 class="label-amount text-subtitle-1 font-weight-bold">
        {{ $n(details.amount, { key: 'currency', currency: details.currency }) }}
      </h2>
      <h3 class="label-subject text-subtitle-2">
        {{ details.subject }}
      </h3>
    </div>
    <v-spacer />
    <div>
      <v-btn fab text :disabled="inEdit" @click="toggleEditDetails">
        <v-icon>create</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    details () {
      return this.$store.state.transfers.newTransfer
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    toggleEditDetails () {
      this.$store.dispatch('transfers/editPanel', { panelName: 'TransferDetails', step: 'transferAccountInfo' })
    }
  }
}
</script>
