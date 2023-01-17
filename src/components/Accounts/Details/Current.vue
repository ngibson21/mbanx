<template>
  <Details>
    <v-row>
      <v-col class="pt-0">
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.holder') }}
          </v-list-item-subtitle>
          <v-list-item-title class="text-capitalize">
            {{ account.client.displayName }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.accountNo') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            <AccountNumber :account-number="account.accountNumber" />
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.availableBalance') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ $n(availableBalance, { key: 'currency', currency: account.currency.code }) }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.currentBalance') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ $n(account.summary.accountBalance, { key: 'currency', currency: account.currency.code }) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-col>
      <v-col class="pt-0">
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.status') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ $t(`components.accounts.savingAccountStatus.${account.status}`) }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.type') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ account.product.name }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.accountCurrency') }}
          </v-list-item-subtitle>
          <v-list-item-title class="text-capitalize">
            {{ account.currency.code }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.openingDate') }}
          </v-list-item-subtitle>
          <v-list-item-title class="text-capitalize">
            <DateFormat :date="account.approvedOnDate" />
          </v-list-item-title>
        </v-list-item-content>
      </v-col>
    </v-row>
  </Details>
</template>

<script>
import Details from '@/components/Accounts/Details/Template.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  components: {
    AccountNumber,
    DateFormat,
    Details
  },
  computed: {
    availableBalance () {
      return this.$store.getters['accounts/getAvailableBalance'](this.account)
    }
  }
}
</script>
