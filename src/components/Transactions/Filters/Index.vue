<template>
  <v-row class="pb-1" no-gutters>
    <v-col>
      <v-card class="px-2 pb-2" :flat="!expanded">
        <v-row no-gutters>
          <v-combobox
            class="pt-0"
            v-model="filters.keywords"
            :label="$t('components.transactions.searchFilters.search')"
            chips
            deletable-chips
            single-line
            hide-details
            prepend-inner-icon="search"
            append-icon=""
            @update:search-input="input = $event"
            @change="applyFilters"
          >
            <template v-slot:selection="data">
              <v-chip
                close
                @click:close="removeChip"
              >
                {{ data.item }}
              </v-chip>
            </template>
            <template v-slot:append-outer>
              <v-btn
                class="mx-0 mt-0" small text
                :color="filters.toDate || filters.fromDate ? 'primary': ''"
                @click="expanded = !expanded"
              >
                {{ $t('components.transactions.searchFilters.moreFilters') }}
                <v-icon>
                  {{ (expanded) ? 'keyboard_arrow_up': 'keyboard_arrow_down' }}
                </v-icon>
              </v-btn>
            </template>
          </v-combobox>
        </v-row>

        <v-expand-transition>
          <v-row v-show="expanded" no-gutters>
            <v-col>
              <v-row>
                <v-col cols="12" sm="6">
                  <DatePicker
                    v-model="filters.fromDate"
                    :max-date="filters.toDate"
                    :label="$t('components.transactions.searchFilters.fromDate')"
                    :chips-label="$t('components.transactions.searchFilters.datePicker.fromDate')"
                    :apply-filter="applyFilters"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <DatePicker
                    v-model="filters.toDate"
                    :min-date="filters.fromDate"
                    :label="$t('components.transactions.searchFilters.toDate')"
                    :chips-label="$t('components.transactions.searchFilters.datePicker.toDate')"
                    :apply-filter="applyFilters"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters justify="end">
                <v-col class="shrink pr-2">
                  <v-btn text @click="clearFilters">
                    {{ $t('components.transactions.searchFilters.clear') }}
                  </v-btn>
                </v-col>
                <v-col class="shrink">
                  <v-btn depressed color="primary" @click="applyFilters">
                    {{ $t('components.transactions.searchFilters.applyFilter') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DatePicker from '@/components/Transactions/Filters/DatePicker.vue'

export default {
  components: {
    DatePicker
  },
  props: {
    accounts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      expanded: false,
      loading: false,
      input: '',
      filters: {
        keywords: null,
        toDate: null,
        fromDate: null
      }
    }
  },
  watch: {
    accounts () {
      this.applyFilters()
    }
  },
  methods: {
    async applyFilters () {
      const filtersIsActive = Object.keys(this.filters).some(key => (this.filters[key] !== null))
      if (filtersIsActive) {
        this.$emit('loading', true)
        try {
          const filterItems = await this.$store.dispatch('transactions/search', {
            accounts: this.accounts,
            filters: {
              ...this.filters,
              keywords: this.input || this.filters.keywords
            }
          })
          this.$emit('apply-filters', filterItems)
        } catch (e) {
          this.$emit('apply-filters', [])
        }
        this.$emit('loading', false)
      } else {
        this.$emit('clear-filters')
      }
    },
    clearFilters () {
      this.expanded = false
      Object.keys(this.filters).map(key => (this.filters[key] = null))
      this.$emit('clear-filters')
    },
    removeChip () {
      this.filters.keywords = null
      this.applyFilters()
    }
  }
}
</script>
