<template>
  <span>
    {{ accountNumber | format }}
  </span>
</template>

<script>
export default {
  props: {
    accountNumber: {
      type: String,
      required: true
    }
  },
  filters: {
    format (value) {
      if (value.includes('ACCOUNT:')) return value.split(':')[1]

      return value
    }
  }
}
</script>
