<template>
  <v-data-iterator
    :loading="loading"
    :items="loading ? [] : transactions"
    hide-default-footer
  >
    <template v-slot:loading>
      <ItemsLoading />
    </template>
    <template v-slot:no-data>
      <NoData />
    </template>
    <template v-slot:default="props">
      <component :is="currentComponent" :items="props.items" />
    </template>
  </v-data-iterator>
</template>

<script>
import SavingsItems from '@/components/Transactions/Items/Savings/Index.vue'
import LoanItems from '@/components/Transactions/Items/Loan/Index.vue'
import RecipientsItems from '@/components/Transactions/Items/Recipients/Index.vue'
import ItemsLoading from '@/components/Transactions/Items/Loading.vue'
import NoData from '@/components/Transactions/Items/NoData.vue'
import { getPagedData } from '@/utils/helpers.js'

export default {
  components: {
    SavingsItems,
    LoanItems,
    RecipientsItems,
    ItemsLoading,
    NoData
  },
  props: {
    accounts: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 10
    },
    items: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['savings', 'loan', 'recipients'].includes(value)
      }
    }
  },
  data () {
    return {
      loading: false,
      page: 1
    }
  },
  computed: {
    currentComponent () {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Items`
    },
    transactions () {
      if (this.type === 'recipients') return this.items
      const cache = this.$store.getters['transactions/list'](this.accounts, this.type)
      return getPagedData(cache, this.page, this.limit)
    }
  }
}
</script>
