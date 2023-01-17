<template>
  <div class="card-pan mt-auto pb-5">
    {{ pan || '\u2022'.repeat(16).replace(/(.{4})/g, '$1 ') }}
  </div>
</template>

<script>
export default {
  props: {
    pan: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style scoped>
  .card-pan {
    font-size: 1rem !important;
    letter-spacing: 0.17em !important;
    line-height: 1rem;
  }
</style>
