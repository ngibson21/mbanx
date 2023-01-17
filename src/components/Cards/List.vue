<template>
  <section class="mx-md-3">
    <div class="d-flex ml-3 mb-4">
      <div class="text-h6 d-flex align-self-center">
        {{ $t('components.cards.title') }}
      </div>
    </div>

    <v-row no-gutters>
      <v-col class="pa-2" cols="12" md="6" lg="4" v-for="card in cards" :key="card.id" @click="switchCard(card.id)">
        <v-hover v-slot:default="{ hover }">
          <v-card flat :class="cardClasses(card)" :elevation="selectedCardId === card.id ? 3: (hover ? 1 : 0)">
            <v-card-text class="d-flex flex-row pa-2">
              <MiniCard
                :network="card.product.network"
                :locked="isCardLocked(card.status)"
                :expired="hasExpired(card.status)"
              />

              <div class="d-flex flex-grow-1 flex-column ml-2 justify-center">
                <div class="d-flex text-capitalize text-h6">
                  {{ card.product.name }}
                </div>

                <div class="d-flex flex-wrap">
                  <div class="d-flex align-center">
                    {{ getShortMaskedPan(card.primaryAccountNumber) }}
                  </div>

                  <div class="d-flex align-start ml-auto text-h6">
                    {{ $n(availableBalance(card.account), { key: 'currency', currency: card.account.currency.code }) }}
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { getShortMaskedPan } from '@/utils/helpers.js'
import MiniCard from '@/components/Shared/CreditCard/Templates/Mini.vue'

export default {
  data () {
    return {
      selectedCardId: null
    }
  },
  computed: {
    cards () {
      return this.$store.getters['cards/list']
    },
    cardClasses () {
      return card => [
        'card-round',
        {
          'selected-card surface': this.selectedCardId === card.id,
          quaternary: this.selectedCardId !== card.id,
          blocked: this.isCardLocked(card.status)
        }
      ]
    }
  },
  components: {
    MiniCard
  },
  methods: {
    getShortMaskedPan,
    switchCard (cardId) {
      this.selectedCardId = cardId
      this.$emit('switch-card', cardId)
    },
    availableBalance (account) {
      return this.$store.getters['accounts/getAvailableBalance'](account)
    },
    isCardLocked (status) {
      return this.$store.getters['cards/isFreezedOrOrdered'](status)
    },
    hasExpired (status) {
      return this.$store.getters['cards/hasExpired'](status)
    }
  },
  created () {
    this.switchCard(this.$route.params.id || this.$store.getters['cards/list'][0].id)
  }
}
</script>

<style scoped>
.v-card:hover {
  cursor: pointer;
}

.selected-card {
  opacity: 1 !important;
}

.blocked {
  background: rgba(0,0,0,0.2) !important;
  opacity: 0.5
}
</style>
