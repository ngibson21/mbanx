<template>
  <v-card>
    <v-list three-line class="px-4 pt-4">
      <div class="text-h5 pb-4">
        {{ $t('components.communications.all') }}
      </div>
      <v-data-iterator
        :items="displayCommunications.items"
        :footer-props="footerProps"
        :server-items-length="displayCommunications.totalItems"
        @pagination="updatePagination($event.page, $event.itemsPerPage)"
        :no-data-text="$t('components.communications.noDataText')"
      >
        <template v-slot:item="props" v-if="!loading">
          <v-divider />
          <v-list-item
            :class="selectedCommunication.id === props.item.id ? 'quaternary' : ''"
            v-ripple
            @click="selectCommunication(props.item)"
          >
            <v-icon left>
              {{ communicationIcon (props.item.type) }}
            </v-icon>
            <v-flex class="py-3 text-truncate">
              <v-list-item-subtitle
                class="py-1 font-weight-regular"
              >
                <DateFormat :date="props.item.createdAt" />
              </v-list-item-subtitle>
              <v-list-item-title
                class="pb-3 font-weight-regular"
              >
                {{ props.item.name }}
              </v-list-item-title>
            </v-flex>
          </v-list-item>
        </template>
        <template v-slot:header v-if="loading">
          <v-layout row wrap justify-center>
            <v-flex text-center>
              <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
              />
            </v-flex>
          </v-layout>
        </template>
      </v-data-iterator>
    </v-list>
  </v-card>
</template>

<script>
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  props: {
    selectedCommunication: {
      type: Object,
      required: true
    }
  },
  components: {
    DateFormat
  },
  data () {
    return {
      loading: false,
      pagination: {
        itemsPerPage: 5,
        totalItems: '',
        page: 1,
        descending: false,
        sortBy: null
      },
      footerProps: {
        itemsPerPageText: this.$t('components.communications.itemsPerPage'),
        itemsPerPageOptions: this.$store.state.communications.rowsPerPageItems
      }
    }
  },
  methods: {
    async updatePagination () {
      try {
        this.loading = true
        await this.$store.dispatch('views/communicationList', { page: this.pagination.page, limit: this.pagination.itemsPerPage })
        this.loading = false
        this.selectFirstMessage()
      } catch (error) {
        this.loading = false
        return error
      }
    },
    communicationIcon (type) {
      switch (type) {
        case 'statement': return 'attach_file'
      }
    },
    selectCommunication (communication) {
      this.$emit('select-communication', communication)
    },
    selectFirstMessage () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.$emit('select-communication', this.displayCommunications.items[0])
      }
    }
  },
  computed: {
    displayCommunications () {
      return {
        items: this.$store.state.communications.communications,
        totalItems: this.$store.state.communications.totalCommunications
      }
    }
  }
}
</script>
