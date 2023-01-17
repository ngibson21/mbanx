<template>
  <div>
    <EnableTOTP v-if="isAwaitingConfirmation" @get-recovery-codes="getRecoveryCodes" />

    <div v-else>
      <p>{{ $t('components.settings.security.totpDisableStatus') }}</p>
      <v-btn
        class="primary"
        @click="enable"
        :loading="loading"
        :disabled="loading"
      >
        {{ $t('components.settings.security.totpEnable') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import EnableTOTP from '@/components/Shared/TOTP/EnableTOTP.vue'

export default {
  components: {
    EnableTOTP
  },
  data () {
    return {
      isAwaitingConfirmation: false,
      secretKey: null,
      loading: false
    }
  },
  methods: {
    enable () {
      this.isAwaitingConfirmation = true
    },
    getRecoveryCodes (codes) {
      this.$emit('get-recovery-codes', codes)
    }
  }
}
</script>
