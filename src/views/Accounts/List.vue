<template>
  <v-row no-gutters>
    <v-col>
      <div v-if="activeCurrentAccounts.length">
        <v-row no-gutters>
          <Current :active-current-accounts="activeCurrentAccounts" />
        </v-row>
      </div>

      <div v-if="activeLoanAccounts.length">
        <v-row class="text-h6 pb-2 pl-7" v-if="activeLoanAccounts.length">
          {{ $t('views.accounts.loan.header') }}
        </v-row>
        <v-row no-gutters>
          <Loans :active-loan-accounts="activeLoanAccounts" />
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Loans from '@/components/Accounts/Lists/Loan.vue'
import Current from '@/components/Accounts/Lists/Current.vue'

export default {
  components: {
    Loans,
    Current
  },
  data () {
    return {
      page: {
        title: this.$t('views.accounts.header')
      }
    }
  },
  computed: {
    activeCurrentAccounts () {
      return this.$store.getters['accounts/activeSavings']
    },
    activeLoanAccounts () {
      return this.$store.getters['accounts/activeLoans']
    }
  },
  created () {
    this.$emit('page-created', this.page)
    this.$store.dispatch('views/accountList')
  }
}
</script>
