<template>
  <div>
    <div v-if="!submitIdentifier">
      <v-flex>
        <UserIdentifierForm
          @submitted-identifier="submitIdentifier = true"
        />
      </v-flex>
    </div>

    <div v-else>
      <v-flex md12 mb-4 text-h5 primary--text font-weight-bold>
        {{ $t('views.login.forgotPassword.request.success.title') }}
      </v-flex>
      <v-flex md12>
        <p style="white-space: pre-wrap;">
          <i18n path="views.login.forgotPassword.request.success.reset.description">
            <b slot="emailAddress">{{ $t('views.login.forgotPassword.request.success.reset.deliveryMethod.email') }}</b>
          </i18n>
        </p>
      </v-flex>
    </div>
  </div>
</template>

<script>
import UserIdentifierForm from '@/components/ResetPassword/UserIdentifierForm.vue'

export default {
  data () {
    return {
      submitIdentifier: false
    }
  },
  components: {
    UserIdentifierForm
  }
}
</script>
