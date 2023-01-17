<template>
  <div class="d-flex pt-5 flex-column flex-sm-row">
    <div class="d-flex flex-row flex-wrap mb-auto">
      <div class="pa-0 col-12 font-weight-bold pb-3">
        {{ $t("components.transactions.detail.receiver") }}
      </div>

      <div class="pa-0 col-12 pb-3">
        <div class="text-caption grey--text">
          {{ $t("components.transactions.detail.accDetails") }}
        </div>
        <div>
          <AccountNumber :account-number="transaction.account.accountNumber" />
        </div>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap mb-auto">
      <div class="pa-0 col-12 font-weight-bold pb-3">
        {{ $t("components.transactions.detail.txDetail") }}
      </div>

      <div class="d-flex flex-row flex-wrap">
        <div class="pr-6 pb-3">
          <div class="text-caption grey--text">
            {{ $t("components.transactions.detail.booking") }}
          </div>
          <div>
            <DateFormat :date="transaction.bookingDate" exact-date />
          </div>
        </div>

        <div class="pr-6 pb-3">
          <div class="text-caption grey--text">
            {{ $t("components.transactions.detail.amount") }}
          </div>
          <div>
            <Amount :transaction="transaction" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Amount from '@/components/Transactions/Items/Amount.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'

export default {
  name: 'TransactionDetailsOther',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  components: {
    Amount,
    DateFormat,
    AccountNumber
  }
}
</script>
