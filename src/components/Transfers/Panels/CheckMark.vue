<template>
  <v-icon class="mt-1" size="32" :color="isComplete ? 'success': 'grey'">
    {{ isComplete ? 'check_circle' : 'radio_button_unchecked' }}
  </v-icon>
</template>

<script>
export default {
  name: 'CheckMark',
  props: {
    isComplete: {
      type: Boolean,
      required: true
    }
  }
}
</script>
