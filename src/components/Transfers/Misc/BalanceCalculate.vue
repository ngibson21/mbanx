<template>
  <div>
    {{ displayRate }}
    <div v-if="remainBalance >= 0">
      <p class="mb-2">
        {{ $t('components.transfers.new.summaryPage.remainBalance') }}:
        {{ $n(remainBalance , {key: 'currency', currency: account.currency.code}) }}
      </p>
    </div>
  </div>
</template>

<script>
import ExchangeRates from '@/components/Shared/ExchangeRates.js'

export default {
  methods: {
    getRate (debitCurrency, creditCurrency) {
      if (debitCurrency === creditCurrency) return
      return ExchangeRates[debitCurrency] && ExchangeRates[debitCurrency][creditCurrency]
    },
    exchange (amount, debitCurrency, creditCurrency) {
      const rate = this.getRate(debitCurrency, creditCurrency)
      if (!rate) return amount
      const result = amount * rate
      return result
    },
    isAmountPositive (value) {
      this.$store.dispatch('transfers/updateNewTransferState', { data: { remainingBalance: value } })
    },
    subtractSameCurrency () {
      const result = this.$store.getters['accounts/getAvailableBalance'](this.account) - this.recipientAmount
      this.isAmountPositive(result)
      return result
    },
    subtractDifferentCurrency () {
      const convertAmount = this.exchange(this.recipientAmount, this.recipientCurrency, this.account.currency.code)
      const result = this.$store.getters['accounts/getAvailableBalance'](this.account) - convertAmount
      this.isAmountPositive(result)
      return result
    }
  },
  computed: {
    account () {
      return this.$store.getters['accounts/getById']('savings', this.accountId)
    },
    displayRate () {
      if (this.account.currency.code === this.recipientCurrency) return
      const rate = this.getRate(this.recipientCurrency, this.account.currency.code)
      if (!rate) return
      return '1' + this.recipientCurrency + '=' + rate + this.account.currency.code
    },
    remainBalance () {
      if (this.account.currency.code === this.recipientCurrency) {
        return this.subtractSameCurrency()
      }
      return this.subtractDifferentCurrency()
    },
    accountId () {
      return this.$store.state.transfers.newTransfer.debtor.id
    },
    recipientCurrency () {
      return this.$store.state.transfers.newTransfer.currency
    },
    recipientAmount () {
      return parseFloat(this.$store.state.transfers.newTransfer.amount)
    }
  }
}
</script>
