<template>
  <div class="d-flex flex-wrap">
    <div class="col-12 col-md-4 pa-0 pr-3">
      <p class="subheading font-weight-bold">
        {{ $t('components.settings.security.totpTitle') }}
      </p>
      <p>{{ $t('components.settings.security.totpDescription') }}</p>
    </div>
    <div class="col-12 col-md-8 pa-0">
      <component :key="currentComponent" :is="currentComponent" @get-recovery-codes="getRecoveryCodes" />
    </div>
    <RecoveryKey v-if="showRecoveryCodes" :recovery-codes="recoveryCodesTOTP" />
  </div>
</template>

<script>
import Enabling from '@/components/Settings/Security/TOTP/Enabling.vue'
import Disabling from '@/components/Settings/Security/TOTP/Disabling.vue'
import RecoveryKey from '@/components/Shared/TOTP/RecoveryKey.vue'

export default {
  data () {
    return {
      successTOTP: false,
      recoveryCodesTOTP: []
    }
  },
  computed: {
    isTotpEnabled () {
      return this.$store.getters['user/isTotpEnabled']
    },
    currentComponent () {
      return this.isTotpEnabled ? 'Disabling' : 'Enabling'
    },
    showRecoveryCodes () {
      return this.isTotpEnabled && this.successTOTP
    }
  },
  components: {
    Enabling,
    Disabling,
    RecoveryKey
  },
  methods: {
    getRecoveryCodes (confirmTOTP) {
      this.successTOTP = confirmTOTP.success || false
      this.recoveryCodesTOTP = confirmTOTP.recoveryCodes || []
    }
  }
}
</script>
