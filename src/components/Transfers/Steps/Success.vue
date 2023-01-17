<template>
  <TransferCard>
    <v-row justify-self="center">
      <v-col cols="12" align="center">
        <Avatar :initials="recipient.fullName" :email="recipient.email" :size="80" />
        <div class="text-h5 py-4">
          <i18n path="components.transfers.new.successPage.success">
            <b class="text-capitalize" slot="recipientName">{{ recipient.fullName }}</b>
          </i18n>
        </div>
        <div class="py-4">
          <h2 class="text-h5">
            {{ $n(Math.abs(recipient.amount), { key:'currency',currency:recipient.currency }) }}
            {{ $t('components.transfers.new.successPage.transferred') }}
          </h2>
          <p class="subheading">
            {{ $t('components.transfers.new.successPage.noAdditionalCharges') }}
          </p>
        </div>
        <v-divider class="py-3" />
        <v-btn
          color="primary"
          @click="goToDashboard"
        >
          {{ $t('components.transfers.new.successPage.returnToDashboard') }}
        </v-btn>
      </v-col>
    </v-row>
  </TransferCard>
</template>

<script>
import TransferCard from '@/components/Transfers/Misc/LayoutTemplate.vue'
import Avatar from '@/components/Shared/Avatar.vue'

export default {
  components: {
    Avatar,
    TransferCard
  },
  computed: {
    recipient () {
      return this.$store.getters['transfers/getTransfer']
    }
  },
  methods: {
    goToDashboard () {
      this.$router.push({ name: 'dashboard' })
      this.$store.dispatch('transfers/discardTransfer')
    }
  }
}
</script>
