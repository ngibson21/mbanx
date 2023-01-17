<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      max-width="350"
      class="mx-auto my-3"
      type="image"
    >
      <div v-if="card.id" class="d-flex flex-column">
        <div class="renew-card-notification mb-5" v-if="['RENEWED', 'EXPIRED'].includes(card.status)">
          <v-card outlined class="mx-auto" :elevation="0">
            <template v-if="card.status === 'RENEWED'">
              <v-card-text>
                <b>{{ $t('components.cards.replacement') }}</b>
                &nbsp;{{ $t('components.cards.renewedNotify') }}
              </v-card-text>
            </template>
            <template v-else>
              <v-card-text>{{ $t('components.cards.expiredNotify') }}</v-card-text>
            </template>
          </v-card>
        </div>

        <div class="d-flex justify-center flex-column">
          <div class="d-flex justify-center">
            <PIN
              v-if="showPin"
              class="card-width"
              :pin="pin"
              :network="card.product.network"
            />
            <Card
              v-else
              class="card-width"
              :locked="isCardLocked"
              :expired="hasExpired"
              :pan="pan || getFullMaskedPan(card.primaryAccountNumber)"
              :expires-on="card.expiresOn"
              :cvv="cvv"
              :network="card.product.network"
              :status="card.status"
            />
          </div>
        </div>
      </div>

      <!-- to make loading work -->
      <div v-else />
    </v-skeleton-loader>

    <Actions :card="card" :loading="loading" />

    <v-skeleton-loader
      :loading="loading"
      class="px-3 pb-2"
      type="list-item-two-line"
    >
      <CurrentAccount
        v-if="card.id"
        class="quaternary"
        :account-name="currentAccount.product.name"
        :account-number="currentAccount.accountNumber"
        :balance="$n(availableBalance, { key: 'currency', currency: currentAccount.currency.code })"
        @click.native="goToAccount(currentAccount.id)"
      />
      <!-- to make loading work -->
      <div v-else />
    </v-skeleton-loader>
  </div>
</template>

<script>
import Card from '@/components/Shared/CreditCard/Templates/Full.vue'
import PIN from '@/components/Cards/Details/PIN.vue'
import CurrentAccount from '@/components/Accounts/Lists/Template/Current.vue'
import { getFullMaskedPan } from '@/utils/helpers.js'
import Actions from '@/components/Cards/Details/Actions.vue'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    card: {
      type: Object,
      required: true
    }
  },
  components: {
    Card,
    PIN,
    Actions,
    CurrentAccount
  },
  computed: {
    currentAccount () {
      return this.$store.getters['accounts/getById']('savings', this.card.account.id)
    },
    availableBalance () {
      return this.$store.getters['accounts/getAvailableBalance'](this.currentAccount)
    },
    isCardLocked () {
      return this.$store.getters['cards/isFreezedOrOrdered'](this.card.status)
    },
    hasExpired () {
      return this.$store.getters['cards/hasExpired'](this.card.status)
    }
  },
  data () {
    return {
      pan: '',
      cvv: '',
      pin: '',
      showDetails: false,
      showPin: false
    }
  },
  methods: {
    getFullMaskedPan,
    goToAccount (id) {
      return this.$router.push({
        name: 'currentAccount',
        params: { id }
      })
    }
  },
  created () {
    this.$bus.$on('show-card-details', (cvv) => {
      this.cvv = cvv
      this.pan = this.card.primaryAccountNumber.replace(/(.{4})/g, '$1 ')
      this.showDetails = true
    })
    this.$bus.$on('show-card-pin', (pin) => {
      this.pin = pin
      this.showPin = true
    })
    this.$bus.$on('hide-card-details', () => {
      this.showDetails = false
      this.cvv = ''
      this.pan = ''
    })
    this.$bus.$on('hide-card-pin', () => {
      this.showPin = false
      this.pin = ''
    })
  },
  beforeDestroy () {
    this.$bus.$off('show-card-details')
    this.$bus.$off('show-card-pin')
    this.$bus.$off('hide-card-details')
    this.$bus.$off('hide-card-pin')
  }
}
</script>

<style scoped>
  .card-width {
    max-width: 350px !important
  }
  .v-skeleton-loader >>> .v-skeleton-loader__list-item-two-line {
    background-color: var(--v-quaternary-base) !important;
  }
</style>
