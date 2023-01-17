<template>
  <div class="d-flex flex-column flex-wrap">
    <div>
      <p>{{ $t('components.settings.security.totpScanQr') }}</p>
    </div>

    <QrCodeTotp />

    <div class="col-12 pa-0">
      {{ $t('components.settings.security.totpConfirmation') }}

      <v-text-field
        :label="$t('components.settings.security.token')"
        v-model="confirmationToken"
        :error="errors.confirmationToken.state"
        :error-messages="errors.confirmationToken.message"
      />

      <div class="d-flex justify-space-between">
        <v-btn text @click="$router.push({name: 'dashboard'})">
          {{ $t('components.settings.security.back') }}
        </v-btn>

        <v-btn class="primary" @click="confirm" :loading="loading" :disabled="loading">
          {{ $t('components.settings.security.totpConfirm') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'

export default {
  components: {
    QrCodeTotp: lazyLoad('components/Shared/TOTP/QrCodeTotp')
  },
  data () {
    return {
      confirmationToken: null,
      loading: false,
      errors: {
        confirmationToken: {
          state: false,
          errorMessage: ''
        }
      }
    }
  },
  methods: {
    async confirm () {
      try {
        this.loading = true
        const { success, recoveryCodes } = await this.$store.dispatch('user/confirmEnableTOTP', { token: this.confirmationToken, method: 'TOTP' })
        this.$emit('get-recovery-codes', { success, recoveryCodes })
        await this.$store.dispatch('user/updateAuthenticationDetail')
        this.loading = false
        this.$emit('confirm')
      } catch (e) {
        if (e.message) {
          this.errors.confirmationToken.state = true
          this.errors.confirmationToken.message = e.message
        }
        this.loading = false
      }
    }
  }
}
</script>
