<template>
  <EnterNewPassword
    v-if="!showSuccessPage"
    :header="$t('views.login.resetPassword.header')"
    :change-password="submitPassword"
    @submitted-password="showSuccessPage = true"
  />

  <v-layout row wrap v-else>
    <v-flex mb-4 text-h4 primary--text font-weight-bold>
      {{ $t('views.login.resetPassword.success.header') }}
    </v-flex>
    <v-flex subheading>
      {{ $t('views.login.resetPassword.success.description') }}
    </v-flex>
    <v-btn @click="logout" text class="ml-0 px-2">
      <v-icon left>
        arrow_forward
      </v-icon>
      {{ $t('views.login.resetPassword.success.login') }}
    </v-btn>
  </v-layout>
</template>

<script>
import EnterNewPassword from '@/components/ResetPassword/EnterNewPassword.vue'

export default {
  data () {
    return {
      showSuccessPage: false,
      submitPassword: (password) => {
        return this.$store.dispatch('user/submitPasswordChanges', password)
      }
    }
  },
  components: {
    EnterNewPassword
  },
  created () {
    this.$store.dispatch('user/update', { isPasswordExpired: false })
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
