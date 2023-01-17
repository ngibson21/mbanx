<template>
  <div class="d-flex pt-3 pb-1">
    <avatar :initials="recipient.fullName" :email="recipient.email" :size="75" color="quaternary" />
    <div class="my-2 mx-3">
      <h2 class="label-name text-subtitle-1 text-capitalize">
        {{ recipient.fullName }}
      </h2>
      <div class="label-account text-subtitle-2 font-weight-medium" v-if="recipient.creditor">
        {{ recipient.creditor.accountNo }} {{ recipient.creditor.sortCode }}
      </div>
      <h3 class="subheading" v-if="recipient.type === 'email'">
        {{ recipient.email }}
      </h3>
    </div>
    <v-spacer />
    <v-btn fab text :disabled="inEdit" @click="toggleEditRecipient">
      <v-icon>create</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Avatar from '@/components/Shared/Avatar.vue'

export default {
  components: {
    Avatar
  },
  computed: {
    recipient () {
      return this.$store.getters['transfers/getTransfer']
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    toggleEditRecipient () {
      this.$store.dispatch('transfers/editPanel', { panelName: 'CreditDetails', step: 'recipientAccountInfo' })
    }
  }
}
</script>
