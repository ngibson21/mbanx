<template>
  <div class="text-center">
    <small class="text-uppercase">{{ $t('components.cards.details.validThru') }}</small>
    <div> {{ expiresDateFormat(expiresOn) || '\u2022'.repeat(3) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    expiresOn: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    expiresDateFormat (date) {
      if (!date) return null

      const month = new Date(date).getMonth() + 1
      const year = new Date(date).getFullYear().toString().slice(2, 4)

      return `${month}/${year}`
    }
  }
}
</script>
