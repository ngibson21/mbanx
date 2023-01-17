<template>
  <ItemTemplate
    :title="$t('components.cards.details.showPin')"
    icon="dialpad"
    :loading="loading"
    :active="active"
    @click="showPin"
  />
</template>

<script>
import ItemTemplate from '@/components/Cards/Actions/Templates/Button.vue'
import { getPin } from '@/api/views/cards/index.js'

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
      this.hidePin()
    }
  },
  methods: {
    hidePin () {
      this.$bus.$emit('hide-card-pin')
      this.active = false
    },
    async showPin () {
      if (this.active) return this.hidePin()

      try {
        this.loading = true
        const result = await getPin(this.card.id)
        this.$bus.$emit('show-card-pin', result.data.data.pin)
        this.active = true
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  },
  created () {
    this.$bus.$on('hide-card-pin', () => {
      this.active = false
    })
  },
  beforeDestroy () {
    this.hidePin()
  }
}
</script>
