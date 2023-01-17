<template>
  <Blueprint class="card-shadow">
    <v-card class="pa-4 fill-height rounded-lg" outlined>
      <div class="d-flex flex-column fill-height">
        <PAN :pan="pan" />

        <div class="d-flex justify-space-between">
          <ExpiryDate :expires-on="expiresOn" />

          <CVV :cvv="cvv" />

          <Network :network="network" :size="70" />
        </div>
      </div>
    </v-card>
    <CardStatusIcon :card-icon="checkStatusIcon" v-if="checkStatusIcon" />
  </Blueprint>
</template>

<script>
import Blueprint from '@/components/Shared/CreditCard/components/Blueprint.vue'
import CVV from '@/components/Shared/CreditCard/components/CVV.vue'
import ExpiryDate from '@/components/Shared/CreditCard/components/ExpiryDate.vue'
import Network from '@/components/Shared/CreditCard/components/Network.vue'
import PAN from '@/components/Shared/CreditCard/components/PAN.vue'
import CardStatusIcon from '@/components/Shared/CreditCard/components/CardStatusIcon.vue'

export default {
  components: {
    Blueprint,
    CVV,
    ExpiryDate,
    Network,
    PAN,
    CardStatusIcon
  },
  props: {
    pan: {
      type: String,
      default: '',
      required: false
    },
    cvv: {
      type: String,
      default: '',
      required: false
    },
    expiresOn: {
      type: String,
      default: '',
      required: false
    },
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
  .card-shadow {
    box-shadow: 2px 0px 20px rgba(0,0,0,0.1);
  }
</style>
