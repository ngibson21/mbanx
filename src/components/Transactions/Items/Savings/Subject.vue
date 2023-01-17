<template>
  <span :class="truncate ? 'truncate' : ''">
    {{ subject }}
  </span>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true
    },
    truncate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    subject () {
      if (this.transaction.paymentDetail && this.transaction.paymentDetail.reference !== null) {
        const subject = this.transaction.paymentDetail.reference
        return subject === '' ? this.$t('transactionType.transfer') : subject
      }
      return this.$t(`transactionType.${this.transaction.typeOf}`)
    }
  }
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
