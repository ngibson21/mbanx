<template>
  <v-container class="py-0 px-4">
    <div v-for="(item, index) in items" :key="index">
      <v-list-item two-line class="py-1">
        <v-list-item-content>
          <v-list-item-title class="text-body-1 font-weight-medium">
            {{ subject(item) }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-body-2 grey--text">
            <DateFormat :date="item.valueDate" v-if="item.valueDate" />
          </v-list-item-subtitle>
        </v-list-item-content>
        <Amount :transaction="accountCurrency(item)" show-color class="font-weight-medium" />
      </v-list-item>
      <v-divider class="mx-3" />
    </div>
  </v-container>
</template>

<script>
import DateFormat from '@/components/Shared/DateFormat.vue'
import Amount from '@/components/Transactions/Items/Amount.vue'

export default {
  components: {
    DateFormat,
    Amount
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    subject (item) {
      return item?.reference?.join(' ') || this.$t('transactionType.transfer')
    },
    accountCurrency (transfer) {
      const debitAccount = this.$store.getters['accounts/getByAccountNumber'](transfer.debtor.identifier.split('/')[3]) || { currency: { code: 'USD' } }
      return { amount: transfer.amount, account: { currency: { code: debitAccount.currency.code } } }
    }
  }
}
</script>
