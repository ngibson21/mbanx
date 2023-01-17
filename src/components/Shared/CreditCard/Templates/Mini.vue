<template>
  <Blueprint class="mini-card">
    <v-card class="pa-1 fill-height rounded-lg" outlined>
      <div class="d-flex align-end justify-end fill-height">
        <Network :network="network" />
      </div>
    </v-card>
    <CardStatusIcon :card-icon="checkStatusIcon" v-if="checkStatusIcon" />
  </Blueprint>
</template>

<script>
import Blueprint from '@/components/Shared/CreditCard/components/Blueprint.vue'
import Network from '@/components/Shared/CreditCard/components/Network.vue'
import CardStatusIcon from '@/components/Shared/CreditCard/components/CardStatusIcon.vue'

export default {
  components: {
    Blueprint,
    Network,
    CardStatusIcon
  },
  props: {
    network: {
      type: String,
      default: '',
      required: false
    },
    locked: {
      type: Boolean,
      required: false
    },
    expired: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    checkStatusIcon () {
      let iconName = ''
      if (this.locked) iconName = 'lock'
      else if (this.expired) iconName = 'timer_off'

      return iconName
    }
  }
}
</script>

<style scoped>
  .mini-card {
    min-width: 90px;
    max-width: 90px;
  }
</style>
