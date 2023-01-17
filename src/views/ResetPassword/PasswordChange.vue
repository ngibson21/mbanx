<template>
  <EnterNewPassword
    v-if="!showSuccessPage"
    hide-current-password
    :header="$t('views.login.forgotPassword.header')"
    :change-password="submitPassword"
    @submitted-password="showSuccessPage = true"
  />

  <v-layout row wrap v-else>
    <v-flex pl-3 mb-4 text-h4 primary--text font-weight-bold>
      {{ $t('views.login.resetPassword.success.header') }}
    </v-flex>
    <v-flex pl-3>
      {{ $t('views.login.resetPassword.success.description') }}
    </v-flex>
    <v-layout>
      <v-flex class="pt-4" text-xs-right>
        <v-btn @click="$router.push({name: 'login'})" text class="ml-0" color="primary">
          <v-icon left>
            arrow_forward
          </v-icon>
          {{ $t('views.login.resetPassword.success.login') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import EnterNewPassword from '@/components/ResetPassword/EnterNewPassword.vue'

export default {
  data () {
    return {
      showSuccessPage: false,
      submitPassword: (password) => {
        return this.$store.dispatch('user/resetPassword', {
          newPassword: password.new,
          token: this.$route.params.token
        })
      }
    }
  },
  components: {
    EnterNewPassword
  }
}
</script>
