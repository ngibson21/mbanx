<template>
  <ItemTemplate
    :title="$t('components.cards.details.replace')"
    icon="redo"
    :loading="loading"
    :active="active"
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
  }
}
</script>
