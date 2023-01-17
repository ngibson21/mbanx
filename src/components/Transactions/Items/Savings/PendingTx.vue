<template>
  <v-expansion-panel-header
    hide-actions
  >
    <v-row
      no-gutters
      class="py-2"
    >
      <v-col align-self="center">
        <v-row
          no-gutters
          class="body-1 font-weight-medium"
        >
          <v-icon small>
            lock
          </v-icon> {{ $t('transactionType.pending') }}
        </v-row>
        <v-row
          no-gutters
          class="body-2 grey--text"
        >
          <DateFormat :date="item.createdAt" />
        </v-row>
      </v-col>
      <v-col
        class="shrink text-right font-weight-medium"
        align-self="center"
      >
        <div class="transaction-amount transaction-negative-amount">
          <span small>-</span>
          {{ $n(item.amount, { key: 'currency', currency: item.account.currency.code }) }}
        </div>
      </v-col>
    </v-row>
  </v-expansion-panel-header>
</template>

<script>
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    DateFormat
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
