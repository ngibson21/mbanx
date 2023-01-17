<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex flex-column" v-for="(card, index) in cardsList" :key="index" @click="showDetails(card.id)">
      <Detail :card="card" class="mb-3 mx-3" />
    </div>
  </div>
</template>

<script>
import Detail from '@/components/Dashboard/Cards/Detail.vue'

export default {
  components: {
    Detail
  },
  props: {
    size: {
      type: Number,
      default: 3
    },
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    cardsList () {
      return this.cards.slice(0, this.size)
    }
  },
  methods: {
    showDetails (id) {
      return this.$router.push({
        name: 'cards',
        params: { id }
      })
    }
  }
}
</script>
