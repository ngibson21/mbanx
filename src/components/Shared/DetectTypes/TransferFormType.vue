<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        hide-details
        v-model="formData.fullName"
        :autofocus="isFocusedField('fullName')"
        :label="$t('components.transfers.creation.domesticType.fullName')"
        :rules="[formRules.required, v => formRules.maxLength(v, 40), v => validateCharactersField(v)]"
        @input="valueChanged"
        @keypress="allowCharacterSet($event)"
      />
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        hide-details
        v-model="formData.creditor.accountNo"
        :autofocus="isFocusedField('accountNo')"
        :label="$t('components.transfers.creation.domesticType.accountNo')"
        :rules="[formRules.required]"
        @input="valueChanged"
      />
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        hide-details
        v-model="formData.creditor.sortCode"
        :label="$t('components.transfers.creation.domesticType.routingNumber')"
        :rules="[formRules.required]"
        @keypress="onSortCodeKeyPress"
        @input="onSortCodeInput"
      />
    </v-col>
  </v-row>
</template>

<script>
import ShareData from '@/components/Shared/DetectTypes/ShareData.js'

export default {
  props: {
    allowCharacterSet: {
      type: Function,
      required: true
    },
    validateCharactersField: {
      type: Function,
      required: true
    }
  },
  mixins: [ShareData],
  data () {
    return {
      formData: {
        fullName: '',
        creditor: {
          accountNo: '',
          sortCode: ''
        }
      }
    }
  },
  methods: {
    onSortCodeKeyPress (e) {
      const sortCodeRegex = new RegExp('[a-z|A-Z|0-9|-]', 'g')
      if (!sortCodeRegex.test(e.key)) e.preventDefault()
    },
    onSortCodeInput (inputValue) {
      this.valueChanged()
      this.formData.creditor.sortCode = inputValue.toUpperCase()
    }
  }
}
</script>
