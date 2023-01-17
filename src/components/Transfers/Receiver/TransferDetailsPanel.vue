<template>
  <div id="transfer-details-panel">
    <v-form ref="transferDetailsForm">
      <v-row>
        <v-col cols="9" sm="5">
          <input-currency
            v-model.lazy="recipientDetails.amount"
            :label="$t('components.transfers.new.form.amount')"
            :rules="[rules.required, rules.minValue]"
            :form-refs="$refs"
            :currency-code="recipientDetails.currency"
            @change="valueChange"
          />
        </v-col>
        <v-col cols="3" sm="2">
          <v-text-field hide-details disabled v-model="recipientDetails.currency" />
        </v-col>
      </v-row>
      <v-text-field
        hide-details
        v-model="recipientDetails.subject"
        :label="$t('components.transfers.new.form.subject')"
        :counter="maxInput"
        :rules="[rules.limitChar, rules.required, v => validateCharactersField(v)]"
        @input="valueChange"
        @keypress="allowCharacterSet"
      />
    </v-form>

    <div class="text-right mt-3">
      <v-btn id="update" color="primary" v-if="inEdit" @click="updateTransfer">
        {{ $t('components.transfers.new.form.update') }}
      </v-btn>

      <v-btn color="primary" v-else :disabled="!ableToGoNext" @click="saveTransfer">
        {{ $t('components.transfers.new.form.next') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import InputCurrency from '@/components/Shared/Form/Elements/InputCurrency.vue'
import { allowCharacterSet, validateCharactersField } from '@/components/Transfers/Misc/charactersRules.js'

export default {
  components: {
    InputCurrency
  },
  data () {
    return {
      allowCharacterSet,
      ableToGoNext: false,
      maxInput: '120',
      rules: {
        required: v => !!v || this.$t('components.transfers.new.form.requiredRule'),
        limitChar: v => v.length <= 120 || this.$t('components.transfers.new.form.limitChar'),
        minValue: () => (this.recipientDetails.amount > 0) || this.$t('components.transfers.new.form.minValue')
      }
    }
  },
  computed: {
    savingsAccounts () {
      return this.$store.state.accounts.savingsAccounts
    },
    recipientDetails () {
      return {
        ...this.$store.getters['transfers/getTransfer'],
        currency: this.$store.getters['transfers/getTransfer'].currency || this.$store.state.application.settings.general.mainCurrency
      }
    },
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  },
  methods: {
    validateCharactersField,
    saveTransfer () {
      if (!this.$refs.transferDetailsForm.validate()) return

      const transfer = {
        subject: this.recipientDetails.subject,
        amount: this.recipientDetails.amount,
        currency: this.recipientDetails.currency
      }

      if (this.savingsAccounts.length <= 1) {
        const data = { ...transfer, debtor: this.savingsAccounts[0] }
        this.$store.dispatch('transfers/saveRecipient', { data, to: 'SummaryPage' })
        this.$store.dispatch('transfers/setCompleteStep', { step: 'debitAccountInfo' })
        this.$store.dispatch('transfers/setCompleteStep', { step: 'transferAccountInfo' })
      } else {
        this.$store.dispatch('transfers/saveRecipient', { data: transfer, to: 'AccountSelection' })
        this.$store.dispatch('transfers/setCompleteStep', { step: 'transferAccountInfo' })
      }
    },
    updateTransfer () {
      if (!this.$refs.transferDetailsForm.validate()) return
      this.$store.dispatch('transfers/updateRecipient', { data: this.recipientDetails, step: 'transferAccountInfo' })
    },
    valueChange () {
      if (this.recipientDetails.amount && this.recipientDetails.subject) {
        this.ableToGoNext = true
      } else {
        this.ableToGoNext = false
      }
    }
  }
}
</script>
