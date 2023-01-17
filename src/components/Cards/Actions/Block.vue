<template>
  <ItemTemplate
    :title="$t('components.cards.details.block')"
    icon="block"
    :loading="loading"
    :active="active"
    @click="blockCard"
  />
</template>

<script>
import ItemTemplate from '@/components/Cards/Actions/Templates/Button.vue'

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  components: {
    ItemTemplate
  },
  data () {
    return {
      loading: false,
      active: false
    }
  },
  methods: {
    async blockCard () {
      try {
        this.loading = true
        await this.$store.dispatch('cards/updateStatus', { id: this.card.id, status: 'TERMINATE' })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
