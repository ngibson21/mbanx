<template>
  <v-expansion-panels
    tile
    accordion
    :class="enableDetails ? '' : 'no-pointer'"
  >
    <v-expansion-panel
      v-for="(item, i) in items"
      :key="i"
    >
      <v-expansion-panel-header v-if="!item.hold">
        <v-row no-gutters class="py-2 flex-nowrap overflow-hidden">
          <v-col
            align-self="center"
            style="min-width: 100px; max-width: 100%;"
            class="flex-grow-1 flex-shrink-0 pr-2 overflow-hidden"
          >
            <v-row no-gutters class="text-body-1 font-weight-medium">
              <Subject :transaction="item" />
            </v-row>
            <v-row no-gutters class="text-body-2 grey--text">
              <DateFormat :date="item.createdAt" />
            </v-row>
          </v-col>
          <v-col
            class="text-right font-weight-medium flex-grow-0 flex-shrink-1"
            align-self="center"
          >
            <Amount :transaction="item" show-color />
          </v-col>
        </v-row>
        <template v-slot:actions>
          <v-icon v-if="!enableDetails" />
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="no-pointer surface2" v-if="!item.hold">
        <Details :transaction="item" />
      </v-expansion-panel-content>
      <PendingTx v-if="item.hold" :item="item" />
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Details from '@/components/Transactions/Items/Savings/Details'
import Amount from '@/components/Transactions/Items/Amount.vue'
import Subject from '@/components/Transactions/Items/Savings/Subject.vue'
import DateFormat from '@/components/Shared/DateFormat.vue'
import PendingTx from '@/components/Transactions/Items/Savings/PendingTx.vue'

export default {
  name: 'TransactionListItem',
  components: {
    Details,
    Amount,
    Subject,
    DateFormat,
    PendingTx
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    enableDetails: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: none !important;
}
.no-pointer {
  pointer-events: none;
}

.v-expansion-panel {
  border-left: 3px solid transparent;
}

.v-expansion-panel-header {
  cursor: default;
}

.v-item--active {
  border-left-color: var(--v-primary-base);
}
</style>
