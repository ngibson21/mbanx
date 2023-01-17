<template>
  <div class="d-flex flex-column my-2 flex-1">
    <div class="d-flex justify-center">
      <v-btn v-if="!active" outlined small fab @click="$emit('click')" :loading="loading">
        <v-icon dark>
          {{ icon }}
        </v-icon>
      </v-btn>
      <v-btn v-else small fab @click="$emit('click')" :loading="loading" elevation="0" dark color="primary">
        <v-icon dark>
          {{ icon }}
        </v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center text-center">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    }
  }
}
</script>
