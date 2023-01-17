<template>
  <section id="new-transfer">
    <search-list v-if="navigationStep === 'SearchList'" />

    <v-row no-gutters justify="center">
      <v-col sm="10" md="7">
        <template v-if="['TransferType', 'CreditDetails', 'TransferDetails', 'SummaryPage'].includes(navigationStep)">
          <transfer-panels />
        </template>

        <sender-details-panel v-if="navigationStep === 'AccountSelection'" />

        <success-page v-if="navigationStep === 'SuccessPage'" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'

export default {
  name: 'NewTransfer',
  data () {
    return {
      page: {
        title: this.$t('views.transfers.header')
      }
    }
  },
  computed: {
    navigationStep () {
      return this.$store.state.transfers.transferStep
    }
  },
  components: {
    SearchList: lazyLoad('components/Transfers/Steps/Search/Index'),
    SuccessPage: lazyLoad('components/Transfers/Steps/Success'),
    TransferPanels: lazyLoad('components/Transfers/Panels/Index'),
    SenderDetailsPanel: lazyLoad('components/Transfers/Sender/SenderDetailsPanel')
  },
  mounted () {
    this.$emit('page-created', this.page)
  },
  beforeDestroy () {
    this.$store.dispatch('transfers/discardTransfer')
  }
}
</script>
