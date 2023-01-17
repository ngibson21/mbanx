<template>
  <ItemTemplate
    :title="$t('components.cards.details.activate')"
    icon="check_circle"
    :loading="loading"
    :active="active"
    @click="activateCard"
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
    async activateCard () {
      try {
        this.loading = true
        await this.$store.dispatch('cards/updateStatus', { id: this.card.id, status: 'ACTIVATE' })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
