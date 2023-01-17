<template>
  <div class="col-12 offset-sm-1 col-sm-10 offset-md-3 col-md-6">
    <v-flex pl-2 xs12 mb-4 headline primary--text font-weight-bold>
      {{ $t('views.login.forgotPassword.request.header') }}
    </v-flex>
    <v-flex pl-2 xs12>
      {{ $t('views.login.forgotPassword.request.description') }}
    </v-flex>

    <v-flex xs12>
      <v-form ref="form">
        <v-text-field
          autofocus
          v-model="userIdentifier"
          :rules="[rules.required]"
          :label="$t('views.login.forgotPassword.request.user')"
          class="mb-3 pl-2"
        />
        <v-row no-gutters>
          <v-col class="text-left">
            <v-btn text @click="redirect('login')" color="primary">
              <v-icon left>
                arrow_back
              </v-icon>
              {{ $t('views.login.forgotPassword.request.backToLogin') }}
            </v-btn>
          </v-col>

          <v-col class="shrink">
            <v-btn
              type="submit"
              color="primary"
              :loading="btnLoader"
              :disabled="btnLoader"
              @click.prevent="submitIdentifier"
            >
              {{ $t('views.login.forgotPassword.request.submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-flex>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userIdentifier: '',
      rules: {
        required: v => !!v || this.$t('views.login.forgotPassword.request.required')
      },
      btnLoader: false
    }
  },
  methods: {
    async submitIdentifier () {
      if (!this.$refs.form.validate()) return
      try {
        this.btnLoader = true
        await this.$store.dispatch('user/requestForgotPassword', this.userIdentifier)
        this.btnLoader = false
        this.$emit('submitted-identifier')
      } catch (error) {
        this.btnLoader = false
        this.$bus.$emit('notify-with-message', this.$t('views.login.forgotPassword.request.error'))
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
