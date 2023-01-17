<template>
  <div class="d-flex flex-column">
    <SwitchTemplate
      :card="card"
      :label="$t('components.cards.security.onlinePayments')"
      :input-value="card.onlinePaymentEnabled"
      action="cards/toggleOnlinePayments"
    />
    <SwitchTemplate
      :card="card"
      :label="$t('components.cards.security.contactlessPayments')"
      :input-value="card.contactlessPaymentEnabled"
      action="cards/toggleContactlessPayments"
    />
  </div>
</template>

<script>
import SwitchTemplate from '@/components/Cards/Actions/Templates/Switch.vue'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  components: {
    SwitchTemplate
  }
}
</script>
