<template>
  <div class="d-flex flex-wrap">
    <div class="pa-0 pr-3 pb-3 d-flex justify-center flex-grow-1" v-if="$vuetify.breakpoint.smAndUp">
      <QRCode :value="qrValue" :options="{ margin: 1, width: 200 }" />
    </div>

    <div class="quaternary mb-4 pa-3 flex-grow-1">
      <div class="guide-wrapper" v-if="$vuetify.breakpoint.smAndUp" key="displayGuideQrCode">
        <p>{{ $t('components.settings.security.totpCantScanQr') }}</p>

        <p>{{ $t('components.settings.security.totpManualKey') }}</p>
      </div>

      <div class="guide-wrapper" v-else key="displayGuideQrCode">
        <p>{{ $t('components.settings.security.totpManualKeyMobile') }}</p>
      </div>

      <v-card outlined class="d-flex">
        <v-card-text id="secret-key">
          <span v-if="secretKey">{{ secretKey }}</span>

          <v-progress-circular indeterminate color="primary" v-else />
        </v-card-text>

        <input type="hidden" id="secret-key-hidden" :value="secretKey" readonly="readonly">

        <v-card-actions>
          <v-btn icon @click="onCopyText">
            <v-icon>content_copy</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QrCodeTotp',
  data () {
    return {
      secretKey: '',
      loading: false
    }
  },
  computed: {
    qrValue () {
      const accountName = this.$store.getters['user/email'] || this.$store.state.user.username
      const webSiteName = process.env.VUE_APP_CLIENT || 'Mbanq Cloud'
      return encodeURI(`otpauth://totp/${accountName}?secret=${this.secretKey}&issuer=${webSiteName}&algorithm=SHA1&digits=6&period=30`)
    }
  },
  components: {
    QRCode: () => import('@chenfengyuan/vue-qrcode')
  },
  methods: {
    onCopyText () {
      // ref: https://codepen.io/PJCHENder/pen/jamJpj?editors=1010
      const secretKeyHidden = this.$el.querySelector('#secret-key-hidden')
      secretKeyHidden.setAttribute('type', 'text')
      secretKeyHidden.select()

      try {
        const successCopied = document.execCommand('copy')
        if (successCopied) {
          this.$bus.$emit('notify-with-message', this.$t('components.settings.security.copiedSuccess'))
        } else {
          throw new Error(this.$t('components.settings.security.copiedFail'))
        }
      } catch (err) {
        this.$bus.$emit('notify-with-message', err.message)
      }

      secretKeyHidden.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  },
  async mounted () {
    try {
      this.loading = true
      this.secretKey = (await this.$store.dispatch('user/enableTOTP')).data.data.requestTOTP.secretKey
      this.loading = false
    } catch (e) {
      this.loading = false
    }
  }
}
</script>

<style>
#secret-key {
  font-family: monospace;
}
</style>
