<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card color="transparent" elevation="0">
        <v-card-text class="ma-0 pa-0 text-h6 text-right">
          <v-btn dark icon x-large fab @click="$emit('close-dialog')">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12>
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

    <v-flex xs12>
      <v-card class="bubble ma-4">
        <v-card-text class="text-h6 text-center">
          {{ $t('views.a2hs.ios.message') }}
        </v-card-text>
        <v-divider class="mx-5" />
        <v-card-text class="mb4">
          <img
            :src="$appConfig.assets(`logo-bright.png`)"
            :srcset="$appConfig.assets(`logo-bright@2x.png`) + ' 2x'"
          >
          <div class="text-h4 font-weight-bold">
            Mbanq
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="text-center text-h6 font-weight-regular pb-3">
          <i18n path="views.a2hs.ios.subMessage">
            <img
              class="a2hs-ios"
              slot="image"
              width="30" height="30"
              :src="$appConfig.assets('a2hs/ios-pwa.png')"
              :srcset="$appConfig.assets('a2hs/ios-pwa.png') + ' 2x, ' + $appConfig.assets('a2hs/ios-pwa.png') + ' 3x'"
            >
            <span class="font-weight-bold" slot="subMessageBold">{{ $t('views.a2hs.ios.subMessageBold') }}</span>
          </i18n>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    imageTheme () {
      return this.$store.getters['localSettings/imageTheme']
    }
  }
}

</script>
<style>
  img.a2hs-ios {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .closing-btn {
    width: 100%;
  }

  .bubble {
    margin-bottom: 40px;
  }

  .bubble:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-top-color: var(--v-quaternary-base);
    border-width: 20px;
    margin-left: -20px;
  }
</style>
