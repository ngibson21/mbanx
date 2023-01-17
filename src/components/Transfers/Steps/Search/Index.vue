<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col sm="10" md="6">
        <search />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="mb-4">
        <recent-transfer @initialTransfer="initialTransfer" />
      </v-col>
      <v-col cols="12" class="mb-4">
        <recipients @initialTransfer="initialTransfer" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'
import initialTransferMixin from '@/components/Transfers/Steps/Search/initialTransferMixin.js'

export default {
  mixins: [initialTransferMixin],
  components: {
    Search: lazyLoad('components/Transfers/Steps/Search/SearchInput'),
    RecentTransfer: lazyLoad('components/Transfers/Steps/Search/RecentTransfer'),
    Recipients: lazyLoad('components/Transfers/Steps/Search/Recipients')
  }
}
</script>
