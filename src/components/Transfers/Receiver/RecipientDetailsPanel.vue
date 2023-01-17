<template>
  <div id="recipient-details-panel">
    <v-form ref="recipientDetailsForm" lazy-validation>
      <transfer-form-type
        :parent-form-data="formData"
        :focused-field="formState.focusedField"
        :allow-character-set="allowCharacterSet"
        :validate-characters-field="validateCharactersField"
        @form-type-changed="changeForm"
        @data-changed="updateFormData"
      />

      <h4 class="font-weight-medium subtitle-1">
        {{ $t('components.transfers.creation.domesticType.recipientAddressTitle') }}
        <v-btn id="btn-toggle-address" x-small text color="primary" @click="onToggleAddress" class="text-caption">
          {{ isShowAddress ? 'Hide' : 'Show' }}
        </v-btn>
      </h4>

      <v-expand-transition>
        <template v-if="isShowAddress">
          <v-row id="address-form">
            <v-col cols="12" md="6">
              <v-select
                hide-details
                v-model="formCreditorAddress.country"
                :label="$t('components.transfers.creation.domesticType.country')"
                :items="countryList"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                v-model="formCreditorAddress.address[0]"
                :label="$t('components.transfers.creation.domesticType.streetAddressLine', {lineNumber: 1})"
                :rules="[validateRecipientAddress]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                v-model="formCreditorAddress.city"
                :label="$t('components.transfers.creation.domesticType.city')"
                :rules="[validateRecipientAddress]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                v-model="formCreditorAddress.address[1]"
                :label="$t('components.transfers.creation.domesticType.streetAddressLine', {lineNumber: 2})"
                :rules="[validateRecipientAddress]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                hide-details
                v-model="formCreditorAddress.postalCode"
                :label="$t('components.transfers.creation.domesticType.postalCode')"
                :rules="[validateRecipientAddress]"
              />
            </v-col>
          </v-row>
        </template>
      </v-expand-transition>
    </v-form>

    <div class="text-right mt-3">
      <v-btn id="update" color="primary" v-if="inEdit" @click="updateRecipient">
        {{ $t('components.transfers.new.form.update') }}
      </v-btn>

      <v-btn id="next" color="primary" v-else :disabled="!ableToGoNext" @click="saveRecipient">
        {{ $t('components.transfers.new.form.next') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'
import { getCountryList } from '@/utils/countries.js'
import { allowCharacterSet, validateCharactersField } from '@/components/Transfers/Misc/charactersRules.js'

export default {
  components: {
    TransferFormType: lazyLoad('components/Shared/DetectTypes/TransferFormType')
  },
  data () {
    return {
      validateCharactersField,
      formData: this.$store.state.transfers.newTransfer,
      formState: {
        focusedField: 'fullName'
      },
      formCreditorAddress: {
        country: this.$store.state.transfers?.newTransfer?.creditor?.country || 'US',
        address: this.$store.state.transfers?.newTransfer?.creditor?.address || ['', ''],
        postalCode: this.$store.state.transfers?.newTransfer?.creditor?.postalCode || '',
        city: this.$store.state.transfers?.newTransfer?.creditor?.city || ''
      },
      isShowAddress: false,
      ableToGoNext: false,
      countryList: getCountryList()
    }
  },
  methods: {
    allowCharacterSet,
    changeForm (data) {
      this.updateFormData(data.formData)
      this.formState = {
        type: data.type,
        focusedField: data.focusedField
      }
    },
    updateFormData (data) {
      if (data.fullName && data?.creditor?.accountNo && data?.creditor?.sortCode) {
        this.ableToGoNext = true
      } else {
        this.ableToGoNext = false
      }
      Object.assign(this.formData, data)
    },
    saveRecipient () {
      if (!this.$refs.recipientDetailsForm.validate()) return
      this.formData = { ...this.formData, type: this.formState.type }
      this.formData.creditor = { ...this.formData.creditor, ...this.formCreditorAddress }
      this.$store.dispatch('transfers/saveRecipient', { data: this.formData, to: 'TransferDetails' })
      this.$store.dispatch('transfers/setCompleteStep', { step: 'recipientAccountInfo' })
    },
    onToggleAddress () {
      this.isShowAddress = !this.isShowAddress
    },
    validateRecipientAddress (value) {
      if (this.formCreditorAddress.country === 'US') {
        return true
      } else {
        return !!value || this.$t('components.transfers.creation.required')
      }
    },
    updateRecipient () {
      if (!this.$refs.recipientDetailsForm.validate()) return
      this.formData = { ...this.formData, type: this.formState.type }
      this.formData.creditor = { ...this.formData.creditor, ...this.formCreditorAddress }
      this.$store.dispatch('transfers/updateRecipient', { data: this.formData, step: 'recipientAccountInfo' })
    }
  },
  computed: {
    inEdit () {
      return this.$store.state.transfers.inEdit
    }
  }
}
</script>
