<template>
  <div>
    <div class="pb-3">
      <Search
        @show-filter="filteredItems = $event"
        @hide-filter="filteredItems = null"
      />
    </div>

    <div class="d-flex flex-row pb-3">
      <div class="pl-4">
        <v-btn class="accent elevation-3" fab small @click="createRecipient">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center font-weight-bold pl-4">
        {{ $t('views.recipients.add') }}
      </div>
    </div>

    <List
      :filtered-items="filteredItems"
      @select-recipient="selectRecipient($event)"
    >
      <template v-slot:title>
        <p class="title pl-12 ml-6 mb-0 pt-4">
          {{ $t('components.recipients.list.allRecipients') }}
        </p>
      </template>
    </List>
  </div>
</template>

<script>
import List from '@/components/Recipients/List.vue'
import Search from '@/components/Recipients/Search.vue'

export default {
  components: {
    List,
    Search
  },
  data () {
    return {
      page: {
        title: this.$t('views.recipients.header')
      },
      filteredItems: null
    }
  },
  created () {
    this.$emit('page-created', this.page)
  },
  methods: {
    selectRecipient (recipient) {
      this.$emit('show-action-drawer', {
        props: { recipientId: recipient.id },
        path: 'components/Recipients/Details/Index'
      })
    },
    createRecipient () {
      this.$emit('show-action-drawer', {
        path: 'components/Recipients/New'
      })
    }
  }
}
</script>
