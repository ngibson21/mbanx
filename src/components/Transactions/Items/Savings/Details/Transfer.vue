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
          <AccountNumber
            :account-number="transaction.paymentDetail.creditor.identifier"
            v-if="!isDeposit && !isWithdrawal"
          />
          <AccountNumber
            :account-number="transaction.account.accountNumber"
            v-else
          />
        </div>
      </div>

      <div class="pa-0 col-12 pb-6" v-if="!isDeposit && !isWithdrawal">
        <div class="text-caption grey--text">
          {{ $t("components.transactions.detail.nameAndAddress") }}
        </div>
        <div>
          {{ transaction.paymentDetail.creditor.name }}
        </div>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap mb-auto">
      <div class="pa-0 col-12 font-weight-bold pb-3">
        {{ $t("components.transactions.detail.txDetail") }}
      </div>

      <div class="pa-0 col-12 pb-3">
        <div class="text-caption grey--text">
          {{ $t("components.transactions.detail.subject") }}
        </div>
        <div>
          <Subject :transaction="transaction" :truncate="false" />
        </div>
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

        <div class="pr-6 pb-3" v-if="!isDeposit && !isWithdrawal">
          <div class="text-caption grey--text">
            {{ $t("components.transactions.detail.type") }}
          </div>
          <div>
            {{ transaction.paymentDetail.paymentType.name }}
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

      <div class="pa-0 col-12" v-if="!isDeposit && !isWithdrawal">
        <div class="text-caption grey--text">
          {{ $t("components.transactions.detail.fromAcc") }}
        </div>
        <div>
          <AccountNumber
            :account-number="transaction.paymentDetail.debtor.identifier"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Amount from '@/components/Transactions/Items/Amount.vue'
import AccountNumber from '@/components/Shared/AccountNumber.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import Subject from '@/components/Transactions/Items/Savings/Subject.vue'

export default {
  name: 'TransactionsDetailsTransfer',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  components: {
    AccountNumber,
    Amount,
    DateFormat,
    Subject
  },
  computed: {
    isDeposit () {
      return this.transaction.typeOf === 1 && !this.transaction.paymentDetail?.reference
    },
    isWithdrawal () {
      return this.transaction.typeOf === 2 && !this.transaction.paymentDetail?.reference
    }
  }
}
</script>
