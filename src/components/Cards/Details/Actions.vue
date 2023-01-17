<template>
  <div class="d-flex">
    <v-skeleton-loader
      :loading="loading"
      class="d-flex my-2 flex-grow-1 justify-space-around pb-4"
      type="actions@3"
      :types="{ 'actions': 'avatar, text' }"
    >
      <template v-if="card.status === 'INACTIVE' || card.status === 'ORDERED'">
        <Activate :card="card" />
        <ShowPin :card="card" />
        <ShowDetails :card="card" />
      </template>

      <template v-else-if="card.status === 'ACTIVE'">
        <Freeze :card="card" />
        <ShowPin :card="card" />
        <ShowDetails :card="card" />
      </template>

      <template v-else-if="card.status === 'SUSPENDED'">
        <Activate :card="card" />
        <Replace :card="card" />
        <Block :card="card" />
      </template>

      <template v-else-if="card.status === 'RENEWED'">
        <Block :card="card" />
        <ShowPin :card="card" />
        <ShowDetails :card="card" />
      </template>

      <!-- to make loading work -->
      <div v-else />
    </v-skeleton-loader>
  </div>
</template>

<script>
import Activate from '@/components/Cards/Actions/Activate.vue'
import ShowPin from '@/components/Cards/Actions/ShowPin.vue'
import ShowDetails from '@/components/Cards/Actions/ShowDetails.vue'
import Freeze from '@/components/Cards/Actions/Freeze.vue'
import Replace from '@/components/Cards/Actions/Replace.vue'
import Block from '@/components/Cards/Actions/Block.vue'

export default {
  components: {
    Activate,
    ShowDetails,
    ShowPin,
    Freeze,
    Replace,
    Block
  },
  props: {
    card: {
      type: Object,
      default: () => ({
        status: ''
      })
    },
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.v-skeleton-loader >>> .v-skeleton-loader__text {
    margin-top: 5px;
  }
</style>
