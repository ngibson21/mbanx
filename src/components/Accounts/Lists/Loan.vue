<template>
  <v-row no-gutters>
    <v-col>
      <v-row
        v-for="(account, index) in activeLoanAccounts"
        :key="index"
        @click="showDetails(account)"
      >
        <v-hover v-slot:default="{ hover }">
          <v-col class="pt-0">
            <v-card :elevation="hover ? 2 : 0">
              <v-row no-gutters class="pa-3">
                <v-col cols="12" sm="6">
                  <div class="title">
                    {{ account.product.name }}
                  </div>
                  <div class="text-body-2">
                    <AccountNumber :account-number="account.accountNumber" />
                  </div>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-divider v-if="$vuetify.breakpoint.xsOnly" class="my-2" />
                  <v-row align="center" no-gutters class="text-right text-h6">
                    <v-col
                      :class="$vuetify.breakpoint.smAndUp ? 'text-body-2 grey--text text--lighten-1' : 'text-left text-body-2 grey--text text--lighten-1'"
                    >
                      {{ $t(`components.accounts.list.loan.balance`) }}
                    </v-col>
                    <v-col sm="12">
                      {{ $n(account.summary.totalOutstanding, {key:'currency',currency: account.productDetail.currency.code}) }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-hover>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AccountNumber from '@/components/Shared/AccountNumber.vue'

export default {
  components: {
    AccountNumber
  },
  props: {
    activeLoanAccounts: {
      type: Array,
      required: true
    }
  },
  methods: {
    showDetails (account) {
      return this.$router.push({
        name: 'loanAccount',
        params: { id: account.id }
      })
    }
  }
}
</script>
