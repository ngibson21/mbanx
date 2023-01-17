<template>
  <v-card color="quaternary" class="pa-5" flat>
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <div class="text-body-1">
          {{ account.product.shortName }}
        </div>
        <div class="text-h5 font-weight-bold">
          {{ account.product.name }}
        </div>
        <div class="text-subtitle-1">
          <AccountNumber :account-number="account.accountNumber" />
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <v-divider v-if="$vuetify.breakpoint.xsOnly" class="my-2" />
        <v-row align="center" no-gutters class="text-right text-h6">
          <v-col
            :class="$vuetify.breakpoint.smAndUp ? 'text-body-1 grey--text text--lighten-1' : 'text-left text-body-1 grey--text  text--lighten-1'"
          >
            {{ $t(`components.accounts.list.loan.balance`) }}
          </v-col>
          <v-col sm="12" class="text-h5 font-weight-bold">
            {{ $n(account.summary.totalOutstanding, {key:'currency',currency: account.productDetail.currency.code}) }}
          </v-col>
          <v-col cols="12" class="pa-0 grey--text text-body-1">
            {{ account.productDetail.currency.code }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AccountNumber from '@/components/Shared/AccountNumber.vue'

export default {
  name: 'AccountDetailsHeader',
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  components: {
    AccountNumber
  }
}
</script>
