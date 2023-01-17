<template>
  <v-list subheader>
    <v-list-item>
      <v-list-item-content>
        <div class="text-h6 font-weight-bold">
          {{ $t('components.accounts.lastTransactions.title') }}
        </div>
      </v-list-item-content>
    </v-list-item>
    <Transactions
      class="px-3"
      :accounts="[accountId]"
      :limit="transactionLimit"
      type="savings"
    />
  </v-list>
</template>

<script>
import Transactions from '@/components/Transactions/ListCompact.vue'

export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      accountId: this.$route.params.id,
      transactionLimit: 5
    }
  },
  components: {
    Transactions
  }
}
</script>
