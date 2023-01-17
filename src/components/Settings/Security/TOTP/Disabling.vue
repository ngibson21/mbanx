<template>
  <div>
    <p>{{ $t('components.settings.security.totpEnabled') }}</p>
    <v-btn color="error" outlined @click="dialog= true">
      {{ $t('components.settings.security.totpDisable') }}
    </v-btn>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ $t('components.settings.security.disableTwoFactorAuthentication') }}
        </v-card-title>

        <v-card-text>
          <div v-if="!onDisable">
            {{ $t('components.settings.security.invalidateRegisteredApplications') }}
          </div>
          <div v-else>
            {{ $t('components.settings.security.confirmWithtwoFactorApp') }}
            <v-text-field :label="$t('components.settings.security.token')" v-model="token" :error-messages="errorMessage" />
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-btn @click="dialog = false" text>
            {{ $t('components.settings.security.doNotDisable') }}
          </v-btn>

          <v-btn class="error" @click="onDisable = true" v-if="!onDisable">
            {{ $t('components.settings.security.disableItForNow') }}
          </v-btn>
          <v-btn class="error" @click="disableTOTP" v-else :loading="loading">
            {{ $t('components.settings.security.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      onDisable: false,
      token: '',
      loading: false,
      errorMessage: ''
    }
  },
  watch: {
    dialog (open) {
      if (!open) {
        this.onDisable = false
        this.errorMessage = ''
        this.token = ''
      }
    }
  },
  methods: {
    async disableTOTP () {
      try {
        this.loading = true
        await this.$store.dispatch('user/disableTOTP', this.token)
        this.loading = false
      } catch (error) {
        if (error.message) {
          this.errorMessage = error.message
        }
        this.loading = false
      }
    }
  }
}
</script>
