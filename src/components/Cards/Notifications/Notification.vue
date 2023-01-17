<template>
  <v-banner two-line class="mb-3" color="transparent">
    <section class="d-flex flex-row">
      <section class="pa-3">
        <MiniCard :network="card.product.network" />
      </section>

      <section class="notification-message my-3">
        <div class="mb-3">
          {{ message }}
        </div>

        <v-btn text class="px-0" color="primary accent-4" @click="activateCard" :loading="isLoading" v-if="card.status !== 'CREATED'">
          {{ $t('components.cards.notification.btn.activate') }}
        </v-btn>
      </section>
    </section>
  </v-banner>
</template>

<script>
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'

export default {
  name: 'Notification',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    message () {
      return this.card.status === 'CREATED'
        ? this.$t('components.cards.notification.msg.cardGetOrdered', { cardProductName: this.card.product.name })
        : this.$t('components.cards.notification.msg.cardGetActivated', { cardProductName: this.card.product.name })
    }
  },
  components: {
    MiniCard
  },
  methods: {
    async activateCard () {
      try {
        this.isLoading = true
        await this.$store.dispatch('cards/updateStatus', { id: this.card.id, status: 'ACTIVATE' })
        this.isLoading = false
        this.$bus.$emit('notify-with-message', this.$t('components.cards.notification.alert.activatedSuccess'))
      } catch (e) {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
::v-deep .v-banner__wrapper {
  padding: 0px !important;
  border-bottom: 0 !important;
}

.notification-message {
  line-height: 1.5;
  max-width: 750px;
}
</style>>
