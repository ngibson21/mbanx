<template>
  <v-layout row wrap>
    <v-flex mb-4 text-h4 primary--text font-weight-bold>
      {{ header }}
    </v-flex>

    <v-flex>
      {{ $t('views.login.forgotPassword.description') }}
    </v-flex>

    <v-flex md12>
      <v-form ref="form" @submit.prevent>
        <InputPassword
          v-if="!hideCurrentPassword"
          autofocus
          label="views.login.resetPassword.currentPassword"
          v-model="password.current"
          :rules="['required']"
          class="pb-3"
        />
        <InputPassword
          :autofocus="hideCurrentPassword"
          v-model="password.new"
          :rules="['required']"
          label="views.login.forgotPassword.newPassword"
        />
        <InputPassword
          v-model="password.confirmation"
          :rules="['required', rules.notMatch]"
          label="views.login.forgotPassword.confirmPassword"
        />
        <v-row no-gutters>
          <v-col>
            <v-btn text class="ml-0 pl-1" @click="redirect('login')" color="primary">
              <v-icon left>
                arrow_back
              </v-icon>
              {{ $t('views.login.forgotPassword.backToLogin') }}
            </v-btn>
          </v-col>

          <v-col class="shrink">
            <v-btn
              class="mr-0"
              type="submit"
              color="primary"
              :loading="loader"
              :disabled="loader"
              @click="submitPasswordChanges"
            >
              {{ $t('views.login.forgotPassword.changePassword') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import InputPassword from '@/components/Shared/Form/Elements/InputPassword.vue'
import { errorMessages } from '@/utils/helpers.js'

export default {
  props: {
    hideCurrentPassword: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: () => { return this.$t('views.login.forgotPassword.header') }
    },
    changePassword: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      password: {
        current: '',
        new: '',
        confirmation: '',
        policy: ''
      },
      loader: false,
      rules: {
        notMatch: v => (v === this.password.new) || this.$t('views.login.forgotPassword.notMatch')
      }
    }
  },
  components: {
    InputPassword
  },
  async created () {
    await this.$store.dispatch('user/getPasswordPolicy')
    this.password.policy = this.$store.state.user.details?.PasswordValidationPolicies[0]
  },
  methods: {
    async submitPasswordChanges () {
      if (!this.$refs.form.validate()) return
      try {
        this.loader = true
        const result = await this.changePassword(this.password)
        this.$emit('submitted-password')
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
