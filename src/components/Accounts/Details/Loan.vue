<template>
  <Details>
    <v-row>
      <v-col class="pt-0">
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.noOfRepay') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ account.productDetail.numberOfRepayments }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.interestRate') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ account.productDetail.annualNominalInterestRate }}%
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.diburseDate') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            <DateFormat :date="account.actualDisbursementDate" />
          </v-list-item-title>
        </v-list-item-content>
      </v-col>
      <v-col class="pt-0">
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.penalties') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ account.charges[0].penaltyCharge }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.fees') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            {{ $n(account.summary.totalFeeChargesCharged, { key: 'currency', currency: account.productDetail.currency.code }) }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-subtitle class="text-caption grey--text">
            {{ $t('components.accounts.details.matureOn') }}
          </v-list-item-subtitle>
          <v-list-item-title>
            <DateFormat :date="account.actualMaturityDate" />
          </v-list-item-title>
        </v-list-item-content>
      </v-col>
    </v-row>
  </Details>
</template>

<script>
import Details from '@/components/Accounts/Details/Template.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  components: {
    DateFormat,
    Details
  }
}
</script>
