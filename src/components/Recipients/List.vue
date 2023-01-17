<template>
  <v-card flat>
    <slot name="title" />

    <v-data-table
      :loading="loading"
      disable-sort
      hide-default-header
      :headers="headers"
      :items="displayItems.items"
      :page.sync="itemsPage"
      :footer-props="{ itemsPerPageOptions }"
      :items-per-page.sync="itemsPerPage"
      :server-items-length="displayItems.totalItems"
      :mobile-breakpoint="0"
      @pagination="updateRecipient($event.page, $event.itemsPerPage)"
      @click:row="$emit('select-recipient', $event)"
    >
      <template v-slot:header="{ props: { headers: tHeaders } }">
        <thead>
          <tr>
            <th v-for="header in tHeaders" :key="header.text" class="caption grey--text">
              <div :class="[{'pl-12 ml-2': header.value === 'nickname'}, header.class]">
                {{ header.text }}
              </div>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:item.nickname="{ item }">
        <div class="font-weight-bold d-flex">
          <Avatar class="mr-4 my-3" :email="item.email" :initials="item.creditor.name" />

          <div class="align-self-center">
            {{ item.name }}
          </div>
        </div>
      </template>

      <template v-slot:item.fullName="{ item }">
        <div>{{ item.creditor.name }}</div>
      </template>

      <template v-slot:item.details="{ item }" v-if="$vuetify.breakpoint.smAndUp">
        <div class="d-flex flex-row">
          <div class="col-6 px-0 mr-3">
            <div class="caption grey--text">
              {{ $t('components.recipients.list.accountNumber') }}
            </div>

            <div class="text-no-wrap">
              {{ splitTransferIdentifier(item.creditor.identifier).accountNumber }}
            </div>
          </div>

          <div class="col-6 px-0" v-if="splitTransferIdentifier(item.creditor.identifier).sortCode">
            <div class="caption grey--text">
              {{ $t('components.recipients.list.bankCode') }}
            </div>

            <div>{{ splitTransferIdentifier(item.creditor.identifier).sortCode }}</div>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Avatar from '@/components/Shared/Avatar.vue'
import { getPagedData, splitTransferIdentifier } from '@/utils/helpers.js'

export default {
  props: {
    filteredItems: {
      type: Array,
      default: () => undefined
    },
    displayedColumns: {
      type: Array,
      default: () => ['nickname', 'fullName', 'details']
    }
  },
  components: {
    Avatar
  },
  data () {
    return {
      loading: false,
      itemsPerPageOptions: [10, 50, 100],
      itemsPerPage: 10,
      itemsPage: 1,
      defaultColumnHeaders: [
        { text: this.$t('components.recipients.list.nickname'), value: 'nickname' },
        { text: this.$t('components.recipients.list.fullName'), value: 'fullName' },
        { text: this.$t('components.recipients.list.details'), value: 'details', class: 'd-none d-sm-flex' }
      ]
    }
  },
  watch: {
    filteredItems () {
      this.itemsPage = 1
      this.itemsPerPage = 10
    }
  },
  computed: {
    headers () {
      return this.defaultColumnHeaders.filter(header => this.displayedColumns.includes(header.value))
    },
    displayItems () {
      if (this.filteredItems) {
        return {
          items: getPagedData(this.filteredItems, this.itemsPage, this.itemsPerPage),
          totalItems: this.filteredItems.length
        }
      } else {
        const cache = this.$store.getters['recipients/list']
        return {
          items: getPagedData(cache, this.itemsPage, this.itemsPerPage),
          totalItems: this.$store.getters['recipients/total']
        }
      }
    }
  },
  methods: {
    async updateRecipient (page = this.itemsPage, limit = this.itemsPerPage) {
      if (this.loading) return
      try {
        this.loading = true
        await this.$store.dispatch('views/recipientList', { page, limit })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    splitTransferIdentifier
  }
}
</script>

<style scoped>
  ::v-deep table tbody tr {
    cursor: pointer
  }
</style>
