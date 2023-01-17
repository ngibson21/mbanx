<template>
  <v-dialog
    v-model="show"
    persistent
    :max-width="width"
  >
    <v-form ref="form" lazy-validation>
      <v-card class="pa-3">
        <v-card-title>
          <v-list-item-avatar color="background" class="ma-0 mr-2">
            <v-icon color="primary">
              verified_user
            </v-icon>
          </v-list-item-avatar>
          <span class="title">{{ this.getTranslation('title', this.resourceName) }}</span>
        </v-card-title>
        <v-card-text>
          <div>
            {{ this.getTranslation('description', this.resourceName) }}
          </div>
          <v-text-field
            :rules="otpRule"
            :error-messages="errorMessage"
            v-model="otp"
            @input="otp = ($event ? $event.toUpperCase() : '')"
          />
          <div class="text-caption py-3">
            {{ this.getTranslation('subDescription', this.resourceName) }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-end>
            <v-btn text :disabled="loader" @click="cancel">
              {{ this.getTranslation('cancel', this.resourceName) }}
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loader"
              :disabled="loader"
              @click.prevent="submit"
            >
              {{ this.getTranslation('confirm', this.resourceName) }}
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { requestOTP } from '@/api/auth.js'
import axios from 'axios'

export default {
  data () {
    return {
      width: 400,
      show: false,
      loader: false,
      otp: '',
      otpRule: [v => !!v || this.getTranslation('fieldRequired', this.resourceName)],
      errorMessage: '',
      request: null,
      resourceName: 'default'
    }
  },
  computed: {
    totpIsDisabled () {
      return !this.$store.getters['user/isTotpEnabled']
    }
  },
  methods: {
    async submit () {
      this.loader = true
      if (this.$refs.form.validate()) {
        this.request.headers = {
          ...this.request.headers,
          'OTP-Token': this.otp || ''
        }

        try {
          const res = await axios(this.request)
          if (res.data.errors) {
            this.$refs.form.reset()
            this.errorMessage = res.data.errors[0].message
          } else {
            this.$bus.$emit('pass-otp', res)
            this.closeModal()
          }
        } catch (err) {
          this.$bus.$emit('fail-otp', err)
        }
      }
      this.loader = false
    },
    cancel () {
      this.closeModal()
      this.$bus.$emit('fail-otp')
    },
    closeModal () {
      this.$refs.form.reset()
      this.errorMessage = ''
      this.resourceName = 'default'
      this.show = false
    },
    getTranslation (elementName, resourceName) {
      const i18nDefault = `components.shared.confirmation.default.${elementName}`
      const i18nDefaultTOTP = `components.shared.confirmation.default.${elementName}TOTP`

      const i18nForResource = `components.shared.confirmation.${resourceName}.${elementName}`
      const i18nForResourceWithTOTP = `components.shared.confirmation.${resourceName}.${elementName}TOTP`

      const hasDefaultTranslationTOTP = this.$te(i18nDefaultTOTP)
      const hasResourceTranslation = this.$te(i18nForResource)
      const hasResourceTranslationTOTP = this.$te(i18nForResourceWithTOTP)

      if (this.totpIsDisabled) {
        return this.$t(hasResourceTranslation ? i18nForResource : i18nDefault)
      } else if (hasResourceTranslationTOTP || hasResourceTranslation) {
        return this.$t(hasResourceTranslationTOTP ? i18nForResourceWithTOTP : i18nForResource)
      } else {
        return this.$t(hasDefaultTranslationTOTP ? i18nDefaultTOTP : i18nDefault)
      }
    }
  },
  created () {
    this.$bus.$on('show-otp', async (resourceName, request) => {
      if (this.totpIsDisabled) await requestOTP()

      this.request = request
      this.resourceName = resourceName
      this.show = true
    })
  }
}
</script>
