<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-if="!hideNickname"
            v-model="formData.nickname"
            :label="$t('components.transfers.creation.sepaType.nickname')"
            @input="valueChanged"
            :rules="[formRules.required, v => formRules.maxLength(v, 40)]"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            :autofocus="isFocusedField('fullName')"
            v-model="formData.fullName"
            :label="$t('components.transfers.creation.sepaType.fullName')"
            @input="valueChanged"
            :rules="[formRules.required, v => formRules.maxLength(v, 40)]"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            :autofocus="isFocusedField('iban')"
            v-model="formData.creditor.iban"
            :label="$t('components.transfers.creation.sepaType.iban')"
            :mask="ibanMask"
            @input="valueChanged"
            :rules="[formRules.required]"
          />
          <p class="text-xs grey--text" v-if="false">
            {{ detectBank() }}
          </p>
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="formData.creditor.bic"
            :label="$t('components.transfers.creation.sepaType.bic')"
            @input="valueChanged"
            :rules="[formRules.required]"
          />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import ShareData from '@/components/Shared/DetectTypes/ShareData.js'

export default {
  props: {
    hideNickname: {
      type: Boolean,
      default: false
    }
  },
  mixins: [ShareData],
  data () {
    return {
      formData: {
        nickname: '',
        fullName: '',
        creditor: {
          iban: '',
          bic: ''
        }
      },
      ibanMask: 'AA## NNNN #### #### #### #### NNNN NNNN'
    }
  },
  watch: {
    'formData.fullName' (newState) {
      if (/.+@.+/.test(newState)) {
        this.$emit('form-type-changed', {
          type: 'email',
          formData: {
            ...this.formData,
            fullName: '',
            email: newState
          },
          focusedField: 'email'
        })
      }
    },
    'formData.creditor.iban' (newState) {
      if (!isNaN(newState)) {
        this.$emit('form-type-changed', {
          type: 'domestic',
          formData: {
            ...this.formData,
            creditor: {
              accountNo: newState
            }
          },
          focusedField: 'accountNo'
        })
      }
    }
  },
  methods: {
    detectBank () {
      const banks = this.$store.state.application.banks
      for (const key of Object.keys(banks)) {
        if (banks[key].includes(this.formData.creditor.iban)) return key
      }
    }
  }
}
</script>
