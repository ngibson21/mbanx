<template>
  <div>
    <v-flex mb-3 class="mb-4">
      <i18n path="views.login.OtpMessage.header">
        <h1 slot="info" class="text-h4 grey--text text--lighten-1 font-weight-bold">
          {{ $t('views.login.OtpMessage.info') }}
        </h1>
        <h1 slot="action" class="text-h4 primary--text font-weight-bold">
          {{ $t('views.login.OtpMessage.action') }}
        </h1>
      </i18n>
    </v-flex>

    <div class="d-flex flex-column">
      {{ $t('views.login.OtpMessage.description') }}
      <i18n slot="typeOf2FA" :path="description.path">
        <span :slot="description.slot" class="font-weight-bold">{{ $t(description.text) }}</span>
      </i18n>
    </div>

    <v-flex mb-5 xs12 sm12 md12>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="d-flex">
          <v-text-field
            autofocus
            v-model="otp"
            :error-messages="incorrectOtp"
            :rules="rules.otp"
            :label="$t('views.login.form.fields.otp.label')"
            required
            class="mb-3"
          />
          <v-btn
            class="mt-3"
            type="submit"
            color="primary"
            @click.prevent="submitOtp"
          >
            {{ $t('views.login.form.buttons.confirm') }}
          </v-btn>
        </div>

        <div class="quaternary d-flex flex-wrap my-5 pb-2" v-if="!isTotpMethod">
          <div class="d-flex align-start">
            <v-icon class="pa-2" large>
              phonelink_lock
            </v-icon>
            <div class="d-flex flex-column">
              <i18n path="views.login.OtpMessage.configMfa" class="pa-2">
                <span slot="mfa" class="font-weight-bold">{{ $t('views.login.OtpMessage.mfa') }}</span>
              </i18n>
              <div>
                <v-btn text color="primary" @click="$emit('configTOTP')">
                  start
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <v-layout justify-space-between>
          <v-btn color="primary" text @click="redirect('login')" class="ml-0 pl-1">
            <v-icon class="mr-2">
              arrow_back
            </v-icon>
            {{ $t('views.login.links.backToLogin') }}
          </v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      otp: '',
      incorrectOtp: '',
      rules: {
        otp: [
          v => !!v || this.$t('views.login.form.fields.otp.validation.required')
        ]
      }
    }
  },
  computed: {
    isTotpMethod () {
      return !!this.$store.getters['user/isTotpEnabled']
    },
    description () {
      if (this.isTotpMethod) {
        return {
          path: 'views.login.OtpMessage.deliveryMethod.totpMobile',
          slot: 'twoFacetorApp',
          text: 'views.login.OtpMessage.twoFacetorApp'
        }
      }
      return {
        path: 'views.login.OtpMessage.deliveryMethod.email',
        slot: 'emailAddress',
        text: 'views.login.OtpMessage.emailAddress'
      }
    }
  },
  methods: {
    async submitOtp () {
      if (this.$refs.form.validate()) {
        try {
          this.incorrectOtp = ''
          await this.$store.dispatch('user/submitOtp', { token: this.otp, method: this.isTotpMethod ? 'TOTP' : 'EMAIL' })
        } catch (e) {
          if (e[0] && e[0].message) {
            this.incorrectOtp = this.$t('apiResponses.errors.otp.token.incorrectOtp')
            return
          }
          this.$bus.$emit('notify-with-message', this.$t('apiResponses.errors.failedToConnect'))
        }
      }
    },
    redirect (path) {
      this.$router.push({
        name: path
      })
    }
  },
  created () {
    this.$store.dispatch('user/update', { required2FA: false })
  }
}
</script>
