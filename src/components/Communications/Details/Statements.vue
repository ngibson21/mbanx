<template>
  <v-card>
    <v-card-text>
      <v-layout v-if="!$vuetify.breakpoint.mdAndUp">
        <v-btn small text icon
               @click="$emit('back')"
        >
          <v-icon>
            chevron_left
          </v-icon>
        </v-btn>
      </v-layout>
      <v-layout justify-space-between class="pb-2" wrap>
        <v-flex title>
          {{ communication.name }}
        </v-flex>
        <v-flex text-right>
          <div class="text-caption">
            {{ $t('components.communications.received') }}
          </div>
          <DateFormat :date="communication.createdAt" />
        </v-flex>
      </v-layout>
      <v-divider />
      <v-list subheader two-line>
        <v-list-item>
          <v-list-item-content>
            {{ communication.description }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $t('components.communications.date') }}:
            </v-list-item-subtitle>
            <v-list-item-title>
              <DateFormat :date="communication.createdAt" type="monthYear" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $t('components.communications.statementOfAccount') }}:
            </v-list-item-subtitle>
            <v-list-item-title>{{ communication.accountNumber }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $t('components.communications.fileName') }}:
            </v-list-item-subtitle>
            <v-list-item-title>{{ communication.fileName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
        @click="download(communication.id)"
        color="primary"
      >
        {{ $t('components.communications.download') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import DateFormat from '@/components/Shared/DateFormat.vue'

export default {
  props: {
    communication: {
      type: Object,
      required: true
    }
  },
  components: {
    DateFormat
  },
  methods: {
    download (id) {
      this.$store.dispatch('communications/download', id)
    }
  }
}
</script>
