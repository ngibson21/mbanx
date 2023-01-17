<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 2 : 0">
      <div class="d-flex px-3 py-2 flex-wrap">
        <div
          :class="[
            'd-flex flex-column pa-0 justify-center',
            isResponsive ? 'col-12 col-sm-6' : 'col-6'
          ]"
        >
          <div class="title">
            {{ accountName }}
          </div>
          <div class="text-subtitle-1">
            <AccountNumber :account-number="accountNumber" />
          </div>
          <v-divider v-if="isResponsive" class="my-2" />
        </div>
        <div
          :class="[
            'd-flex flex-wrap  pa-0 align-center',
            isResponsive ? 'col-12 col-sm-6' : 'col-6'
          ]"
        >
          <div
            :class="[
              'text-body-2 grey--text text--lighten-1 pa-0',
              isResponsive ? 'col-sm-12 col-6 text-left text-sm-right' : 'col-12 text-right'
            ]"
          >
            {{ $t('views.dashboard.accounts.availableBalance') }}
          </div>
          <div
            :class="[
              'title pa-0 text-right',
              isResponsive ? 'col-sm-12 col-6' : 'col-12'
            ]"
          >
            {{ balance }}
          </div>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import AccountNumber from '@/components/Shared/AccountNumber.vue'

export default {
  props: {
    responsive: {
      type: Boolean,
      default: false
    },
    accountName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    },
    balance: {
      type: String,
      required: true
    }
  },
  components: {
    AccountNumber
  },
  computed: {
    isResponsive () {
      return this.$vuetify.breakpoint.xsOnly && this.responsive
    }
  }
}
</script>

<style scoped>
.v-card:hover {
  cursor: pointer;
}
</style>
