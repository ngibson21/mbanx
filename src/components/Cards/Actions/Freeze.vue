<template>
  <ItemTemplate
    :title="$t('components.cards.details.freeze')"
    icon="lock"
    :loading="loading"
    :active="active"
    @click="freezeCard"
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
    async freezeCard () {
      try {
        this.loading = true
        await this.$store.dispatch('cards/updateStatus', { id: this.card.id, status: 'SUSPEND' })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
