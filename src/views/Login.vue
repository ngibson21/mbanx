<template>
  <div class="col-12 offset-sm-1 col-sm-10 offset-md-3 col-md-6">
    <v-flex>
      <h1 class="text-center text-h4 primary--text font-weight-bold">
        {{ $t('views.login.welcomeMessage') }}
      </h1>
    </v-flex>

    <v-flex
      mb-5
      xs12
      sm12
      md12
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          autofocus
          v-model="formModel.username"
          :error-messages="formErrMsg"
          :form-rules="formRules.username"
          :label="$t('views.login.form.fields.username.label')"
          :placeholder="$t('views.login.form.fields.username.placeholder')"
          autocomplete="username"
          required
          class="mb-3"
        />

        <v-text-field
          v-model="formModel.password"
          :error-messages="formErrMsg"
          :form-rules="formRules.password"
          :label="$t('views.login.form.fields.password.label')"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          @click:append="changeVisibility"
          :placeholder="$t('views.login.form.fields.password.placeholder')"
          autocomplete="current-password"
          required
          class="mb-3"
        />

        <v-layout>
          <v-flex
            align-self-center
            font-weight-bold
            class="justify-space-between"
          >
            <router-link :to="{ name: 'requestForgotPassword' }">
              {{ $t('views.login.links.forgotPassword') }}
            </router-link>
          </v-flex>
          <v-flex shrink>
            <v-btn
              class="mx-0 px-6"
              type="submit"
              color="primary"
              @click.prevent="signIn"
              :disabled="disableLoginButton"
            >
              {{ $t('views.login.form.buttons.signIn') }}
            </v-btn>
          </v-flex>
        </v-layout>
        <div class="pt-6">
          {{ $t('views.login.links.noAccount') }}
          <router-link :to="{ name: 'registration' }">
            {{ $t('views.login.links.noAccountLink') }}
          </router-link>
        </div>
      </v-form>
    </v-flex>
  </div>
</template>

<script>

export default {
  data () {
    return {
      valid: true,
      showPassword: false,
      disableLoginButton: false,
      formModel: {
        username: '',
        password: ''
      },
      formErrMsg: '',
      formRules: {
        username: [
          v => !!v || this.$t('views.login.form.fields.username.validation.required')
        ],
        password: [
          v => !!v || this.$t('views.login.form.fields.password.validation.required'),
          v => (v && v.length >= 6) || this.$t('views.login.form.fields.password.validation.characterCount', {
            charLength: 6
          })
        ]
      }
    }
  },
  methods: {
    async signIn () {
      try {
        if (!this.$refs.form.validate()) return

        this.formErrMsg = ''
        this.disableLoginButton = true
        await this.$store.dispatch('user/login', this.formModel)
      } catch (e) {
        this.disableLoginButton = false

        if (e?.response?.data?.error === 'invalid_grant') {
          this.formErrMsg = this.$t('apiResponses.errors.invalidGrant')
          return
        }

        if (e?.message === 'noPermissions') {
          this.$bus.$emit('notify-with-message', this.$t('apiResponses.errors.noPermissions'))
          return
        }

        this.$bus.$emit('notify-with-message', this.$t('apiResponses.errors.failedToConnect'))
      }
    },
    changeVisibility () {
      this.showPassword = !this.showPassword
    }
  },
  async created () {
    await this.$store.dispatch('registration/resetState')
    sessionStorage.clear()
  }
}
</script>
