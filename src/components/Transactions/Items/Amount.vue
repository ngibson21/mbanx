<template>
  <div :class="[showColor ? amountStyle.color : '', 'transaction-amount']">
    <span small>{{ amountStyle.sign }}</span>
    {{ $n(transaction.amount, { key: 'currency', currency: transaction.account.currency.code }) }}
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true
    },
    showColor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    amountStyle () {
      const txType = this.transaction.typeOf
      const usePositiveStyle = (txType === 1 || txType === 3 || txType === 8)
      const useNeutralStyle = (txType === 20)

      const positiveStyle = { sign: '+', color: 'transaction-positive-amount' }
      const neutralStyle = { sign: '', color: 'transaction-neutral-amount' }
      const negativeStyle = { sign: '-', color: 'transaction-negative-amount' }

      if (usePositiveStyle) return positiveStyle
      if (useNeutralStyle) return neutralStyle

      return negativeStyle
    }
  }
}
</script>

<style lang="scss">
  .transaction-amount {
    white-space: nowrap;
  }

  .transaction-positive-amount {
    color: #508f3d;
    background-color: #e4fce0;
    border-radius: 10px;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .transaction-neutral-amount {
    background-color: transparent;
  }
  .transaction-negative-amount {
    background-color: transparent;
  }
</style>
