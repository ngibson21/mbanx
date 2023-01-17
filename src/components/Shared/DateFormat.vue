<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'short'
    },
    exactDate: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    formattedDate () {
      const isoDate = new Date(this.date)

      if (this.exactDate) { return this.$d(isoDate, this.type) }
      const isToday = isoDate.toDateString() === new Date().toDateString()
      const isYesterday = new Date(Date.now() - 864e5).toDateString() === isoDate.toDateString()
      switch (true) {
        case (isToday):
          return this.$t('components.shared.dateFormat.today')
        case (isYesterday):
          return this.$t('components.shared.dateFormat.yesterday')
        default: return this.$d(isoDate, this.type)
      }
    }
  }
}
</script>
