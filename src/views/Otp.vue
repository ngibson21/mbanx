<template>
  <div v-if="!showRecoveryCodes">
    <EnterToken v-if="!isConfig" @configTOTP="isConfig = true" />
    <EnableTOTP v-else @confirm="confirm" @get-recovery-codes="showCodes" />
  </div>

  <div v-else>
    <RecoveryKey :recovery-codes="recoveryCodesTOTP" />
  </div>
</template>

<script>
import EnterToken from '@/components/Otp/EnterToken.vue'
import EnableTOTP from '@/components/Shared/TOTP/EnableTOTP.vue'
import RecoveryKey from '@/components/Otp/RecoveryKey.vue'

export default {
  components: {
    EnterToken,
    EnableTOTP,
    RecoveryKey
  },
  data () {
    return {
      isConfig: false,
      showRecoveryCodes: false,
      recoveryCodesTOTP: []
    }
  },
  methods: {
    showCodes ({ success, recoveryCodes }) {
      this.showRecoveryCodes = success
      this.recoveryCodesTOTP = recoveryCodes
    },
    confirm () {
      this.$router.push({ name: 'dashboard' })
      this.$bus.$emit('notify-with-message', this.$t('views.login.OtpMessage.deliveryMethod.enableTOTPSuccessfully'))
    }
  }
}
</script>
