<template>
  <div class="text-center">
    <small class="text-uppercase">{{ $t('components.cards.details.cvc') }}</small>
    <div class="justify-center">
      {{ cvv || '\u2022'.repeat(3) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cvv: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
