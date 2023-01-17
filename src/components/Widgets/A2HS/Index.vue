<template>
  <v-flex xs12 v-show="showWidget">
    <Template
      :greeting="$t('views.a2hs.greeting', { name })"
      :message="$t('views.a2hs.message')"
      @clicked="dialog = !dialog"
      @closed="closeWidget"
      color="primary"
      dark
    />
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card class="text-center">
        <div v-if="isIOS" class="primary" style="height: 100vh; min-height: -webkit-fill-available;">
          <iOS @close-dialog="closeDialog" />
        </div>

        <div v-else-if="hasNativeEvent" style="height: 100vh;">
          <v-layout align-center justify-center column fill-height>
            <div class="d-block closing-btn">
              <v-card color="transparent" elevation="0">
                <v-card-text class="ma-0 pa-0 text-h6 text-right">
                  <v-btn icon x-large fab @click="closeDialog">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </div>

            <v-flex d-flex xs5>
              <v-layout align-center justify-center column fill-height>
                <v-card
                  color="transparent"
                  elevation="0"
                >
                  <v-card-text class="text-h6 text-center">
                    <img
                      :src="$appConfig.assets(`logo-full-${imageTheme}.png`)"
                      :srcset="$appConfig.assets(`logo-full-${imageTheme}@2x.png`) + ' 2x'"
                    >
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>

            <v-flex d-flex xs7>
              <v-card color="transparent" elevation="0">
                <v-card-text class="text-h5 font-weight-bold">
                  {{ $t('views.a2hs.installWebBanking') }}
                </v-card-text>

                <v-card-text>
                  <p class="text-subtitle-1">
                    {{ $t('views.a2hs.chrome.message') }}
                  </p>
                  <p class="text-subtitle-1">
                    {{ $t('views.a2hs.chrome.subMessage') }}
                  </p>
                  <v-btn large color="primary" outlined @click="promptNative">
                    {{ $t('views.a2hs.chrome.install') }}
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>

        <div v-else>
          <v-layout align-center justify-center column fill-height>
            <div class="d-block closing-btn">
              <v-card color="transparent" elevation="0">
                <v-card-text class="ma-0 pa-0 text-h6 text-right">
                  <v-btn icon x-large fab @click="closeDialog">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </div>

            <v-flex d-flex xs5>
              <v-layout align-center justify-center column fill-height>
                <v-card
                  color="transparent"
                  elevation="0"
                >
                  <v-card-text class="text-h6 text-center">
                    <img
                      :src="$appConfig.assets(`logo-full-${imageTheme}.png`)"
                      :srcset="$appConfig.assets(`logo-full-${imageTheme}@2x.png`) + ' 2x'"
                    >
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>

            <v-flex d-flex xs7>
              <v-card color="transparent" elevation="0">
                <v-card-text>
                  <p class="text-subtitle-1">
                    {{ $t('views.a2hs.others.message') }}
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import Template from '@/components/Widgets/Templates/Template.vue'
import iOS from '@/components/Widgets/A2HS/iOS.vue'

export default {
  components: {
    Template,
    iOS
  },
  data () {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return {
      dialog: false,
      name: this.$store.state.user.appUser.firstName,
      isIOS: /iphone|ipad|ipod/.test(userAgent),
      hasNativeEvent: (this.$store.state.pwa.A2HS.event !== undefined)
    }
  },
  computed: {
    imageTheme () {
      return this.$store.getters['localSettings/imageTheme']
    },
    showWidget () {
      const screenXs = this.$vuetify.breakpoint.xs
      const promptClosed = this.$store.state.pwa.A2HS.promptClosed
      const alreadyInstalled = (('standalone' in window.navigator) && (window.navigator.standalone)) ||
                                 window.matchMedia('(display-mode: standalone)').matches

      if (!screenXs || promptClosed || alreadyInstalled) return false
      if (this.isIOS || this.hasNativeEvent) return true

      return true
    }
  },
  methods: {
    promptNative () {
      if (this.$store.state.pwa.A2HS.event !== null) {
        this.$store.state.pwa.A2HS.event.prompt()
        this.$store.state.pwa.A2HS.event.userChoice.then((choiceResult) => {
          this.closeDialog()
          if (choiceResult.outcome === 'accepted') {
            this.closeWidget()
          }
        })
      }
    },
    closeDialog () {
      this.dialog = false
    },
    closeWidget () {
      this.$store.dispatch('pwa/closeA2HSPrompt')
    }
  }
}
</script>
