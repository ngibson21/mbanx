<template>
  <div>
    <div class="text-h6 primary--text font-weight-bold mb-2">
      {{ $t('components.registration.noWorkflow.oops') }}
    </div>
    <div class="pb-5 pt-5">
      <p>
        {{ $t('components.registration.noWorkflow.message') }}
      </p>
    </div>
    <div class="d-flex justify-end">
      <v-btn block class="primary" depressed @click="$router.push({name: 'login'})">
        {{ $t('components.registration.backToLogin') }}
      </v-btn>
    </div>
  </div>
</template>
