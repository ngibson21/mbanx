<template>
  <div>
    <v-progress-linear
      v-if="isLoading"
      class="mt-5"
      indeterminate
      color="primary"
    />
    <div v-else>
      <v-expand-transition>
        <div v-if="transaction.typeOf === 7 ">
          <Charge :transaction="transaction" />
        </div>
        <div v-else-if="transaction.paymentDetail">
          <Transfer :transaction="transaction" />
        </div>
        <div v-else>
          <Other :transaction="transaction" />
        </div>
      </v-expand-transition>
    </div>
  </div>
</template>

// Types mapping
// 7 - Charge

<script>
import Transfer from '@/components/Transactions/Items/Savings/Details/Transfer.vue'
import Charge from '@/components/Transactions/Items/Savings/Details/Charge.vue'
import Other from '@/components/Transactions/Items/Savings/Details/Other.vue'

export default {
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  components: {
    Transfer,
    Other,
    Charge
  },
  data () {
    return {
      isLoading: true
    }
  },
  async created () {
    try {
      await this.$store.dispatch('views/transactionDetails', this.transaction.id)
    } catch (e) {
      throw e
    } finally {
      this.isLoading = false
    }
  }
}
</script>
