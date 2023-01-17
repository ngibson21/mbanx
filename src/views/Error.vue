<template>
  <v-container fill-height>
    <v-layout>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="8">
          <v-img
            class="mb-2"
            contain
            :aspect-ratio="16/9"
            :src="$appConfig.assets('donut-broken.jpg')"
            :srcset="$appConfig.assets('donut-broken.jpg') + ' 2x, ' + $appConfig.assets('donut-broken.jpg') + ' 3x'"
          />
          <div class="text-h4 primary--text font-weight-bold text-center">
            {{ $t('views.error.somethingwentwrong') }}
          </div>
          <div class="text-subtitle-1 py-5 text-center">
            {{ $t('views.error.technicalDifficulties') }} <br> {{ $t('views.error.tryAgainLater') }}
          </div>
          <div class="text-center">
            <v-btn color="primary" @click="back">
              {{ $t('views.error.goBack') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  methods: {
    back () {
      this.$store.dispatch('application/toggleErrorPage')
      this.$router.push('/')
    }
  }
}
</script>
