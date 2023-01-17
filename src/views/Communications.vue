<template>
  <div>
    <slot :page="page" />
    <v-layout justify-center row wrap>
      <v-flex
        v-if="isSmallScreenNavigation"
        shrink xs12 sm12 md6
      >
        <Empty v-if="!hasCommunications" />

        <List
          v-else
          :selected-communication="selectedCommunication"
          @select-communication="selectCommunication"
        />
      </v-flex>
      <v-flex v-if="detailsComponent" xs12 sm12 md6>
        <component
          :is="detailsComponent"
          :communication="selectedCommunication"
          @back="selectedCommunication = {}"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import List from '@/components/Communications/List.vue'
import StatementsDetails from '@/components/Communications/Details/Statements.vue'
import Empty from '@/components/Communications/Empty.vue'

export default {
  components: {
    List,
    StatementsDetails,
    Empty
  },
  data () {
    return {
      page: {
        title: this.$t('views.communications.header')
      },
      selectedCommunication: {}
    }
  },
  computed: {
    detailsComponent () {
      switch (this.selectedCommunication.type) {
        case 'statement': return 'StatementsDetails'
        default: return false
      }
    },
    isSmallScreenNavigation () {
      const isCommunicationSelected = Object.values(this.selectedCommunication).length
      return !(isCommunicationSelected && this.$vuetify.breakpoint.smAndDown)
    },
    hasCommunications () {
      return this.$store.state.communications.communications.length > 0
    }
  },
  methods: {
    selectCommunication (communication) {
      const { accountNumber } = this.$store.getters['accounts/getById'](communication.entityType, communication.entityId)
      this.selectedCommunication = { ...communication, accountNumber }
    }
  },
  created () {
    this.$emit('page-created', this.page)
    this.$store.dispatch('views/communicationList', { page: 1, limit: 20 })
  }
}
</script>
