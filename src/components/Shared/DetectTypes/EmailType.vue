<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-if="!hideNickname"
            v-model="formData.nickname"
            :label="$t('components.transfers.creation.emailType.nickname')"
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
            :autofocus="isFocusedField('email')"
            v-model="formData.email"
            :label="$t('components.transfers.creation.emailType.email')"
            @input="valueChanged"
            :rules="[formRules.required, formRules.email]"
          />
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            v-model="formData.fullName"
            :label="$t('components.transfers.creation.emailType.fullName')"
            @input="valueChanged"
            :rules="[formRules.required, v => formRules.maxLength(v, 40)]"
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
        email: '',
        fullName: ''
      }
    }
  },
  watch: {
    'formData.email' (newState) {
      if (!/.+@.+/.test(newState)) {
        this.$emit('form-type-changed', {
          type: 'domestic',
          formData: {
            ...this.formData,
            fullName: newState
          },
          focusedField: 'fullName'
        })
      }
    }
  }
}
</script>
