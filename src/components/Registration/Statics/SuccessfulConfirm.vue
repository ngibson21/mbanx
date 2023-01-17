<template>
  <div>
    <div class="text-h6 primary--text font-weight-bold mb-2">
      You successfully confirmed your application.
    </div>
    <div class="pb-5 pt-5">
      <p>
        Please give us few days to process it.
      </p>
    </div>
    <div class="d-flex justify-end">
      <v-btn block class="primary" depressed @click="$router.push({name: 'login'})">
        Finish application
      </v-btn>
    </div>
  </div>
</template>
