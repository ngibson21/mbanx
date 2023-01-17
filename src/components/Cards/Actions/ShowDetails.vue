<template>
  <ItemTemplate
    :title="$t('components.cards.details.showDetails')"
    icon="remove_red_eye"
    :loading="loading"
    :active="active"
    @click="showDetails"
  />
</template>

<script>
import ItemTemplate from '@/components/Cards/Actions/Templates/Button.vue'
import { getCvv } from '@/api/views/cards/index.js'

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
  watch: {
    card () {
      this.hideDetails()
    }
  },
  methods: {
    hideDetails () {
      this.$bus.$emit('hide-card-details')
      this.active = false
    },
    async showDetails () {
      if (this.active) return this.hideDetails()

      try {
        this.loading = true
        const result = await getCvv(this.card.id)
        this.$bus.$emit('show-card-details', result.data.data.cvv)
        this.active = true
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  },
  beforeDestroy () {
    this.hideDetails()
  }
}
</script>
