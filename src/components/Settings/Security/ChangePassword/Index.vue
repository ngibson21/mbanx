<template>
  <div class="d-flex flex-wrap">
    <div class="col-12 col-md-4 pa-0">
      <p class="subheading font-weight-bold">
        {{ $t('components.settings.security.passwordTitle') }}
      </p>
      <p>{{ $t('components.settings.security.passwordDescription') }}</p>
    </div>
    <div class="col-12 col-md-8 pa-0">
      <v-form ref="changePassword">
        <InputPassword
          label="components.settings.security.currentPassword"
          v-model="password.current"
          :rules="['required']"
        />
        <p class="text-caption">
          {{ $t('components.settings.security.currentPasswordInfo') }}
        </p>

        <InputPassword
          label="components.settings.security.newPassword"
          v-model="password.new"
          :rules="['required', rules.validation]"
        />
        <p class="text-caption">
          {{ $t('components.settings.security.newPasswordInfo') }}
        </p>

        <InputPassword
          label="components.settings.security.confirmPassword"
          v-model="password.confirm"
          :rules="['required', rules.notMatch]"
        />
        <p class="text-caption">
          {{ $t('components.settings.security.confirmPasswordInfo') }}
        </p>

        <v-btn
          :loading="loader"
          :disabled="loader"
          class="primary"
          @click="submitPasswordChanges"
        >
          {{ $t('components.settings.security.changePasswordButton') }}
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import InputPassword from '@/components/Shared/Form/Elements/InputPassword.vue'
import { errorMessages } from '@/utils/helpers.js'

export default {
  name: 'ChangePassword',
  components: {
    InputPassword
  },
  data () {
    return {
      password: {
        current: '',
        new: '',
        confirm: '',
        policy: this.$store.state.user.details.PasswordValidationPolicies[0]
      },
      rules: {
        notMatch: v => (v === this.password.new) || this.$t('views.login.resetPassword.notMatch'),
        validation: v => new RegExp(this.password.policy.regex).test(v) || this.password.policy.description
      },
      loader: false
    }
  },
  methods: {
    async submitPasswordChanges () {
      if (!this.$refs.changePassword.validate()) return
      try {
        this.loader = true
        const result = await this.$store.dispatch('user/submitPasswordChanges', this.password)
        this.$bus.$emit('notify-with-message', this.$t('components.settings.security.passwordChanged'))
        this.$refs.changePassword.reset()
        this.loader = false
        return result
      } catch (error) {
        this.loader = false
        this.$bus.$emit('notify-with-message', errorMessages(error.message || error.extensions.code))
      }
    },
    redirect (path) {
      this.$router.push({
        name: path
      })
    }
  }
}
</script>
