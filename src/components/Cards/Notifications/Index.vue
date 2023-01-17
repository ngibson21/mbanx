<template>
  <div class="card-notifications-wrapper">
    <template v-show="cards.length">
      <section v-for="card in cards" :key="card.id" class="card-notification-wrapper">
        <Notification :card="card" />
      </section>
    </template>
  </div>
</template>

<script>
import Notification from './Notification.vue'

export default {
  name: 'CardNotification',
  computed: {
    cards () {
      return this.$store.state.cards.items.filter(item => ['CREATED', 'ORDERED', 'INACTIVE'].includes(item.status))
    }
  },
  components: {
    Notification
  }
}
</script>
