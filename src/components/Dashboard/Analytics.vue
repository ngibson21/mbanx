<template>
  <v-card height="100%" flat>
    <v-card-text class="pb-0 text--primary">
      <div class="d-flex flex-column">
        <div class="text-subtitle-1">
          {{ $t('components.dashboard.intro.overallBalance', {currency: activeCurrency }) }}
        </div>
        <div class="d-flex flex-row flex-wrap">
          <div class="text-h4 font-weight-bold d-flex align-center">
            {{ balance }}
          </div>
          <div class="d-flex ml-auto" v-if="Object.keys(balances).length > 1">
            <CurrencySelector :balances="balances" />
          </div>
        </div>
      </div>
    </v-card-text>
    <Chart :accounts="accounts" :currency="activeCurrency" class="mx-2" />
  </v-card>
</template>

<script>
import CurrencySelector from '@/components/Dashboard/CurrencySelector.vue'
import Chart from '@/components/Dashboard/SplineChart.vue'

export default {
  components: {
    CurrencySelector,
    Chart
  },
  computed: {
    accounts () {
      return this.$store.getters['accounts/activeSavings']
    },
    activeCurrency () {
      return this.$store.state.application.activeCurrency
    },
    balances () {
      return this.$store.getters['accounts/getTotalAvailableBalanceByCurrency'](this.accounts)
    },
    balance () {
      return `${this.$n(this.balances[this.activeCurrency], {
        key: 'currency',
        currency: this.activeCurrency
      })}`
    }
  }
}
</script>
