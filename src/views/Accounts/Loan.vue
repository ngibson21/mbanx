<template>
  <v-row no-gutters>
    <v-col>
      <v-card flat>
        <v-card-actions class="pb-0 px-3">
          <v-btn
            icon
            @click="$router.go(-1)"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text class="pt-0">
          <v-row>
            <v-col cols="12">
              <AccountHeader :account="account" />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <AccountDetails v-if="account.actualMaturityDate" :account="account" />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <AccountTransactions :account="account" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AccountHeader from '@/components/Accounts/Headers/Loan.vue'
import AccountDetails from '@/components/Accounts/Details/Loan.vue'
import AccountTransactions from '@/components/Accounts/Transactions/Loan.vue'

export default {
  components: {
    AccountHeader,
    AccountDetails,
    AccountTransactions
  },
  data () {
    return {
      page: {
        title: this.$t('views.accounts.header')
      }
    }
  },
  computed: {
    account () {
      return this.$store.getters['accounts/getById']('loan', this.$route.params.id)
    }
  },
  created () {
    this.$emit('page-created', this.page)
    this.$store.dispatch('views/loanAccountDetails', this.$route.params.id)
  }
}
</script>
