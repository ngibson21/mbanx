<template>
  <div>
    {{ $t(`components.shared.greetings.${greeting}`) }}
  </div>
</template>

<script>
export default {
  computed: {
    greeting () {
      const date = new Date()

      const currentTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      if (currentTime >= '00:00' && currentTime < '06:00') {
        return 'night'
      }
      if (currentTime >= '06:00' && currentTime < '12:00') {
        return 'morning'
      }
      if (currentTime >= '12:00' && currentTime < '17:00') {
        return 'afternoon'
      }
      if (currentTime >= '17:00' && currentTime <= '23:59') {
        return 'evening'
      }
      return 'whatTime'
    }
  }
}
</script>
