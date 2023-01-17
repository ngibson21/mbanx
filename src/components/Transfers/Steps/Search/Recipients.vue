<template>
  <div>
    <v-card flat color="transparent">
      <v-card-title class="px-0 pt-0">
        {{ $t('components.transfers.recipients.recipients') }}
      </v-card-title>
    </v-card>
    <List @select-recipient="initialTransfer" />
  </div>
</template>

<script>
import List from '@/components/Recipients/List.vue'

export default {
  components: {
    List
  },
  methods: {
    initialTransfer (recipient) {
      this.$emit('initialTransfer', recipient)
    }
  }
}
</script>
