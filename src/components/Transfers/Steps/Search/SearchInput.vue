<template>
  <layout-template color="transparent" class="ma-3">
    <v-autocomplete
      flat
      hide-details
      append-icon
      append-outer-icon="search"
      return-object
      autocomplete="off"
      background-color="transparent"
      item-text="keywords"
      :solo="!!search"
      :label="$t('components.transfers.searchList.makeTransfer')"
      :hide-no-data="!search"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      @change="initialTransfer"
    >
      <template slot="no-data">
        <no-data :keyword="search" />
      </template>
      <template slot="append-item">
        <search-footer :keyword="search" />
      </template>
      <template slot="item" slot-scope="{ item }">
        <search-result-items :item="item" />
      </template>
    </v-autocomplete>
    <div class="pt-4">
      {{ $t('components.transfers.searchList.search') }}
    </div>
  </layout-template>
</template>

<script>
import lazyLoad from '@/utils/lazyLoad.js'
import { getTransfers } from '@/api/views/transfers.js'
import initialTransferMixin from '@/components/Transfers/Steps/Search/initialTransferMixin.js'

export default {
  data () {
    return {
      entries: [],
      isLoading: false,
      search: null,
      recipient: {}
    }
  },
  mixins: [initialTransferMixin],
  components: {
    LayoutTemplate: lazyLoad('components/Transfers/Misc/LayoutTemplate'),
    SearchResultItems: lazyLoad('components/Transfers/Search/Item'),
    SearchFooter: lazyLoad('components/Transfers/Search/Footer'),
    NoData: lazyLoad('components/Transfers/Search/NoData')
  },
  computed: {
    items () {
      if (!this.search) { return [] }
      return this.entries.map(entry => {
        const keywords = `${entry.creditor.name} ${entry.creditor.identifier}`
        return Object.assign({}, entry, { keywords })
      })
    }
  },
  watch: {
    async search (current, previous) {
      if (!previous && current) {
      // Items have already been requested
        if (this.isLoading) return
        this.isLoading = true
        try {
          const result = await getTransfers()
          this.entries = result.data.data.Transfers.select
          this.isLoading = false
        } catch (err) {
          this.isLoading = false
        }
      }
    }
  }
}
</script>
