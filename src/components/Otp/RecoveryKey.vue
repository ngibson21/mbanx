<template>
  <div>
    <RecoveryKey small :recovery-codes="recoveryCodes" class="mb-5" />

    <div class="d-flex">
      <v-btn color="primary" text @click="redirect('login')" class="ml-0 pl-1">
        <v-icon class="mr-2">
          arrow_back
        </v-icon>
        {{ $t('views.login.links.backToLogin') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import RecoveryKey from '@/components/Shared/TOTP/RecoveryKey.vue'

export default {
  components: {
    RecoveryKey
  },
  props: {
    recoveryCodes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    redirect (path) {
      this.$router.push({
        name: path
      })
    }
  }
}
</script>
