<template>
  <div class="layout">
    <v-hover
      v-for="(account, index) in activeAccounts" :key="index"
      v-slot:default="{ hover }"
    >
      <v-card
        :class="cardClass(account, hover)"
        @click="updatedSelectedAccounts([account])"
      >
        <v-row no-gutters align="center" class="pa-2">
          <v-col class="shrink px-2">
            <v-icon
              small
              :color="selectedAccounts.includes(account.id) ? 'primary' : 'quaternary'"
            >
              fiber_manual_record
            </v-icon>
          </v-col>
          <v-col>
            <div class="font-weight-bold text-caption">
              {{ account.product.name }}
            </div>
            <div class="text-caption">
              <AccountNumber :account-number="account.accountNumber" />
            </div>
            <div class="font-weight-medium text-body-2">
              {{ $n(availableBalance(account), {key: 'currency', currency: account.currency.code}) }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>

    <v-hover v-slot:default="{ hover }" v-if="closedAccounts.length > 0">
      <v-card
        class="d-flex"
        :class="cardClass(closedAccounts[0], hover)"
        @click="updatedSelectedAccounts(closedAccounts)"
      >
        <v-row no-gutters align="center" class="pa-2">
          <v-col class="shrink px-2">
            <v-icon
              small
              :color="selectedAccounts.includes(closedAccounts[0].id) ? 'primary' : 'quaternary'"
            >
              fiber_manual_record
            </v-icon>
          </v-col>
          <v-col>
            <div class="font-weight-bold text-caption">
              {{ $t('components.transactions.accountSelection.includeClosedAccounts') }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import AccountNumber from '@/components/Shared/AccountNumber.vue'

export default {
  components: {
    AccountNumber
  },
  props: {
    selectedAccounts: {
      type: Array,
      required: true
    },
    txLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    accounts () {
      return this.$store.getters['accounts/list']('savings')
    },
    closedAccounts () {
      return this.accounts.filter(account => account.status === 600)
    },
    activeAccounts () {
      return this.accounts.filter(account => account.status === 300)
    }
  },
  methods: {
    cardClass (account, hover) {
      const shadowLvl = this.$vuetify.breakpoint.mdAndUp ? `elevation-${hover ? 2 : 0}` : 'elevation-0'
      const selectedAccount = `ma-1 quaternary ${shadowLvl}`
      const deselectedAccount = `ma-1 transparent ${shadowLvl}`

      return this.selectedAccounts.includes(account.id) ? selectedAccount : deselectedAccount
    },
    updatedSelectedAccounts (accounts) {
      if (this.txLoading) return

      let result = this.selectedAccounts
      accounts.forEach(account => {
        if (this.selectedAccounts.includes(account.id)) {
          result = result.filter(id => id !== account.id)
        } else {
          result.push(account.id)
        }
      })
      result.sort((a, b) => a - b)

      this.$emit('updated-selected-accounts', result)
    },
    availableBalance (account) {
      return this.$store.getters['accounts/getAvailableBalance'](account)
    }
  }
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
}
</style>
