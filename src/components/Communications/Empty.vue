<template>
  <v-card class="px-4 py-3">
    <h3 class="pa-3 pb-4 text-h5 text-center">
      {{ $t('components.communications.emptyMessages.title') }}
    </h3>
    <v-divider />
    <div class="pt-3 text-center">
      {{ $t('components.communications.emptyMessages.body1') }}
    </div>
    <div class="pb-3 text-center">
      {{ $t('components.communications.emptyMessages.body2') }}
    </div>
  </v-card>
</template>
