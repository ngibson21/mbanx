<template>
  <v-hover>
    <v-card
      flat color="quaternary"
      slot-scope="{ hover }" hover
      :elevation="hover ? 2 : 0"
      :class="[{'card-blocked': isCardLocked(card.status)}]"
    >
      <div class="d-flex pa-2 flex-wrap">
        <MiniCard
          :network="card.product.network"
          :locked="isCardLocked(card.status)"
          :expired="hasExpired(card.status)"
        />

        <div class="d-flex flex-column pl-2">
          <div class="title">
            {{ card.product.name }}
          </div>
          <div class="d-flex align-center text-subtitle-1">
            {{ getShortMaskedPan(card.primaryAccountNumber) }}
          </div>
        </div>

        <div class="d-flex text-right flex-grow-1 mr-3">
          <div class="d-flex align-end ml-auto text-h6">
            {{ $n(availableBalance, { key: 'currency', currency: card.account.currency.code }) }}
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import { getShortMaskedPan } from '@/utils/helpers.js'
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    getShortMaskedPan
  },
  components: {
    MiniCard
  },
  computed: {
    availableBalance () {
      return this.$store.getters['accounts/getAvailableBalance'](this.card.account)
    },
    isCardLocked () {
      return (status) => this.$store.getters['cards/isFreezedOrOrdered'](status)
    },
    hasExpired () {
      return (status) => this.$store.getters['cards/hasExpired'](status)
    }
  }
}
</script>

<style scoped>
.card-blocked {
  background: rgba(0,0,0,0.3) !important;
  opacity: 0.5
}

.disable-events {
  pointer-events: none
}
</style>
