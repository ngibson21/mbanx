<template>
  <div class="d-flex flex-column flex-grow-1">
    <div
      class="pb-3"
      v-for="(account, index) in activeCurrentAccounts"
      :key="index"
      @click="showDetails(account)"
    >
      <ListTemplate
        :account-name="account.product.name"
        :account-number="account.accountNumber"
        :balance="$n(availableBalance(account), {key:'currency',currency: account.currency.code})"
        responsive
      />
    </div>
  </div>
</template>

<script>
import ListTemplate from '@/components/Accounts/Lists/Template/Current.vue'

export default {
  components: {
    ListTemplate
  },
  props: {
    activeCurrentAccounts: {
      type: Array,
      required: true
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
