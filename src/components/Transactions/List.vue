<template>
  <v-row no-gutters>
    <v-col>
      <v-data-iterator
        :items="displayItems.items"
        :server-items-length="displayItems.totalItems"
        :page.sync="itemsPage"
        :footer-props="{ itemsPerPageOptions }"
        :items-per-page.sync="itemsPerPage"
        @pagination="updateTransactions(accounts, $event.page, $event.itemsPerPage)"
      >
        <template v-slot:header>
          <Filters
            :accounts="accounts"
            @loading="loading = $event"
            @apply-filters="filteredItems = $event"
            @clear-filters="filteredItems = null"
          />
        </template>
        <template v-slot:loading>
          <ItemsLoading />
        </template>
        <template v-slot:no-data>
          <NoData />
        </template>
        <template v-slot:default="props">
          <v-progress-linear v-if="loading" indeterminate />
          <Items
            :items="props.items"
            :enable-details="true"
          />
        </template>
      </v-data-iterator>
    </v-col>
  </v-row>
</template>

<script>
import Filters from '@/components/Transactions/Filters/Index.vue'
import Items from '@/components/Transactions/Items/Savings/Index.vue'
import ItemsLoading from '@/components/Transactions/Items/Loading.vue'
import NoData from '@/components/Transactions/Items/NoData.vue'
import { getPagedData } from '@/utils/helpers.js'

export default {
  props: {
    accounts: {
      type: Array,
      required: true
    }
  },
  components: {
    Items,
    ItemsLoading,
    NoData,
    Filters
  },
  data () {
    return {
      loading: false,
      itemsPerPageOptions: [20, 50, 100],
      itemsPerPage: 20,
      itemsPage: 1,
      filteredItems: null
    }
  },
  computed: {
    displayItems () {
      if (this.filteredItems) {
        return {
          items: getPagedData(this.filteredItems, this.itemsPage, this.itemsPerPage),
          totalItems: this.filteredItems.length
        }
      } else {
        const cache = this.$store.getters['transactions/list'](this.accounts, 'savings')
        const accounts = this.$store.getters['accounts/list']('savings').filter(acc => this.accounts.includes(acc.id))
        const totalItems = accounts.reduce((totalTx, acc) => totalTx + acc.totalTx, 0)

        return {
          items: getPagedData(cache, this.itemsPage, this.itemsPerPage),
          totalItems
        }
      }
    }
  },
  watch: {
    accounts () {
      this.itemsPage = 1
      this.itemsPerPage = 20
      this.updateTransactions()
    },
    filteredItems () {
      this.itemsPage = 1
      this.itemsPerPage = 20
    },
    loading (value) {
      this.$emit('loading', value)
    }
  },
  methods: {
    async updateTransactions (accounts = this.accounts, page = this.itemsPage, limit = this.itemsPerPage) {
      if (this.loading) return
      try {
        this.loading = true
        await this.$store.dispatch('views/transactionList', {
          accounts,
          page,
          limit
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>
