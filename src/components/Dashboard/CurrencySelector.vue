<template>
  <v-layout
    row
    wrap
    ma-1
    class="currencyButton quaternary"
  >
    <v-flex
      v-for="(currency, index) in Object.keys(this.balances)"
      :key="currency"
      :pl-0="index !== 0"
    >
      <v-btn
        @click="updateBalance(currency)"
        :class="currency === activeCurrency ? 'primary pa-0': 'pa-0'"
        fab
        icon
        small
        :dark="currency === activeCurrency"
      >
        <strong>
          {{ currency | symbol }}
        </strong>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CurrencySelector',
  props: {
    balances: {
      type: Object,
      required: true
    }
  },
  filters: {
    symbol (currency) {
      return (0).toLocaleString('en', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).replace(/\d/g, '').trim()
    }
  },
  computed: {
    activeCurrency () {
      return this.$store.state.application.activeCurrency
    }
  },
  methods: {
    updateBalance (currency) {
      this.$store.dispatch('application/updateActiveCurrency', currency)
    }
  }
}
</script>

<style scoped>
.currencyButton {
  border-radius: 30px;
}
</style>
