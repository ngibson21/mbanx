<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex flex-column" v-for="(account, index) in savingsAccounts" :key="index" @click="showDetails(account)">
      <div class="pb-3">
        <ListTemplate
          :class="{ 'quaternary': $vuetify.breakpoint.xsOnly }"
          :account-name="account.product.name"
          :account-number="account.accountNumber"
          :balance="$n(availableBalance(account), { key: 'currency', currency: account.currency.code })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ListTemplate from '@/components/Accounts/Lists/Template/Current.vue'

export default {
  props: {
    size: {
      type: Number,
      default: 3
    },
    accounts: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  components: {
    ListTemplate
  },
  computed: {
    savingsAccounts () {
      return this.accounts.slice(0, this.size)
    }
  },
  methods: {
    showDetails (account) {
      return this.$router.push({
        name: 'currentAccount',
        params: { id: account.id }
      })
    },
    availableBalance (account) {
      return this.$store.getters['accounts/getAvailableBalance'](account)
    }
  }
}
</script>
