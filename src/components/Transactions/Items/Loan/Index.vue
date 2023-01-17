<template>
  <v-container class="py-0 px-2">
    <v-row v-for="(item, i) in items"
           :key="i"
    >
      <v-col align-self="center" class="py-4">
        <v-row no-gutters class="text-body-1 font-weight-medium">
          {{ $t(`loanTransactionType.${item.typeOf}`) }}
        </v-row>
        <v-row no-gutters class="text-body-2 grey--text">
          <DateFormat :date="item.valueDate" />
        </v-row>
      </v-col>
      <v-col class="shrink text-right font-weight-medium" align-self="center">
        {{ $n(item.amount, { key: 'currency', currency: item.loan.productDetail.currency.code }) }}
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-divider v-if="i < items.length - 1" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  name: 'TransactionListItem',
  components: {
    DateFormat
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
