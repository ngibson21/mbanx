<template>
  <div class="d-flex pa-5">
    <h3 class="text-subtitle-1 font-italic mr-auto align-self-center">
      {{ $t('components.transfers.new.summaryPage.debitBalance') }}
      {{ $n(recipient.amount, { key: 'currency', currency: 'USD' }) }}
    </h3>
    <div class="align-self-center">
      <v-btn
        id="next" color="primary" :loading="createBtnLoader" @click="submitDraft()"
        :disabled="disabledButton || createBtnLoader"
      >
        {{ $t('components.transfers.new.summaryPage.confirm') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabledButton: false,
      transferId: '',
      createBtnLoader: false,
      draftError: ''
    }
  },
  computed: {
    recipient () {
      return this.$store.getters['transfers/getTransfer']
    }
  },
  watch: {
    recipient: {
      handler (val) {
        this.draftError = ''
        this.disabledButton = val.remainingBalance < 0
        if (val.remainingBalance >= 0) return
        this.showInsufficientFunds()
      },
      deep: true
    }
  },
  methods: {
    showInsufficientFunds () {
      const accountAmount = this.$n(this.$store.getters['accounts/getAvailableBalance'](this.recipient.debtor), { key: 'currency', currency: this.recipient.currency })
      this.draftError = this.$t('components.transfers.new.summaryPage.exceededBalance', { accountAmount })
    },
    async checkBalance () {
      try {
        await this.$store.dispatch('views/dashboard')
      } catch (error) {
        throw error
      }
    },
    async validateDraft () {
      try {
        await this.checkBalance()
        if (this.recipient.remainingBalance < 0) {
          this.showInsufficientFunds()
          throw new Error()
        }
        const result = await this.$store.dispatch('transfers/createTransfer', this.recipient)
        this.transferId = result.data.data.createTransfer.id
      } catch (error) {
        throw error
      }
    },
    async submitDraft () {
      if (this.draftError) return
      try {
        this.createBtnLoader = true
        await this.validateDraft()
        await this.submitConfirmation()
        this.createBtnLoader = false
      } catch (error) {
        this.createBtnLoader = false
        if (this.draftError) return
        if (error.message === 'canceled-otp') return
        this.draftError = error[error.length - 1]
        this.$bus.$emit('notify-with-message', this.draftError)
      }
    },
    async submitConfirmation () {
      try {
        await this.$store.dispatch('transfers/submitTransfer', {
          transferId: this.transferId,
          account: this.recipient.debtor.id
        })
      } catch (errors) {
        throw errors
      }
    }
  }
}
</script>
