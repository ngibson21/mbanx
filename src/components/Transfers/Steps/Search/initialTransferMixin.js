export default {
  methods: {
    initialTransfer (recipient) {
      this.recipient = {
        fullName: recipient.creditor.name,
        creditor: {
          accountNo: recipient.creditor.identifier?.split('/')[3] || recipient.creditor.identifier?.split(':')[1] || '',
          sortCode: recipient.creditor.identifier?.split('/')[2] || process.env.VUE_APP_BANK_CODE || ''
        },
        email: recipient.email
      }
      this.$store.dispatch('transfers/saveRecipient', { data: this.recipient, to: 'TransferDetails' })
      this.$store.dispatch('transfers/setCompleteStep', { step: 'recipientAccountInfo' })
    }
  }
}
