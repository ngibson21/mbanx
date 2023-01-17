<template>
  <Blueprint class="card-shadow">
    <v-card class="pa-4 fill-height rounded-lg primary" outlined>
      <div class="d-flex flex-column fill-height">
        <div class="d-flex justify-end white--text pt-2">
          <div>
            <v-icon color="white">
              visibility_off
            </v-icon>
          </div>
          <div class="pl-2">
            {{ remainingSec }} {{ $t('components.cards.details.pin.sec') }}
          </div>
        </div>

        <div class="text-center mt-auto">
          <div class="white--text">
            {{ $t('components.cards.details.pin.title') }}
          </div>
          <div class="text-h6 white--text">
            {{ pin }}
          </div>
        </div>

        <div class="d-flex">
          <div class="ml-auto mt-2">
            <Network :network="network" :size="70" />
          </div>
        </div>
      </div>
    </v-card>
  </Blueprint>
</template>

<script>
import Blueprint from '@/components/Shared/CreditCard/components/Blueprint.vue'
import Network from '@/components/Shared/CreditCard/components/Network.vue'

export default {
  components: {
    Blueprint,
    Network
  },
  props: {
    pin: {
      type: String,
      required: true
    },
    network: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      remainingSec: 5,
      timeout: null
    }
  },
  methods: {
    countDownTimer () {
      if (this.remainingSec > 0) {
        this.timeout = setTimeout(() => {
          this.remainingSec -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        clearTimeout(this.timeout)
        this.$bus.$emit('hide-card-pin')
      }
    }
  },
  created () {
    this.countDownTimer()
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
  .card-shadow {
    -webkit-box-shadow: 2px 0px 20px rgba(0,0,0,0.1);
    box-shadow: 2px 0px 20px rgba(0,0,0,0.1);
  }
</style>
