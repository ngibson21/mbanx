<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-combobox
        v-model="dateFormatted"
        :label="label"
        append-outer-icon="event"
        append-icon=""
        v-on="on"
        :hint="hint"
        persistent-hint
        inputmode="none"
        :error-messages="invalidFormat"
        @change="inputDate"
        v-cleave="{date: true, datePattern: mask}"
      >
        <template v-slot:selection="data">
          <v-chip
            v-if="value"
            close
            small
            @click:close="onRemoveChip"
          >
            {{ chipsLabel }} : {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
    </template>
    <v-date-picker
      no-title
      :allowed-dates="selectableDates"
      :value="value"
      @input="emitDate"
      :max="maxDate"
      :min="minDate"
    />
  </v-menu>
</template>

<script>
import { mask, hint, parseDate } from '@/utils/localeDate.js'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: null
    },
    minDate: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    chipsLabel: {
      type: String,
      default: ''
    },
    applyFilter: {
      type: Function,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      mask,
      hint,
      parseDate,
      dateFormatted: null,
      menu: '',
      invalidFormat: []
    }
  },
  methods: {
    getTime (value) {
      return new Date(value).getTime()
    },
    inputDate (date) {
      this.invalidFormat = ''
      const isInvalidFormat = isNaN(this.getTime(this.parseDate(date))) || !(date.length > 4)
      if (isInvalidFormat || !this.selectableDates(this.parseDate(date)) || this.validDateRange(this.parseDate(date))) {
        this.$emit('input', null)
        this.menu = false
        this.invalidFormat = `${this.$t('components.transactions.searchFilters.invalidDateFormat')} ${hint}`
        return
      }
      this.emitDate(this.parseDate(date))
    },
    validDateRange (date) {
      const minDate = (this.getTime(date) < this.getTime(this.minDate))
      if (!this.maxDate) return minDate
      const maxDate = (this.getTime(date) > this.getTime(this.maxDate))
      return minDate || maxDate
    },
    emitDate (date) {
      this.invalidFormat = ''
      this.dateFormatted = this.$d(new Date(date), 'digit')
      this.$emit('input', date)
      this.menu = false
    },
    selectableDates (value) {
      return this.getTime(new Date()) > this.getTime(value)
    },
    onRemoveChip () {
      this.$emit('input', null)
      this.applyFilter()
    }
  }
}
</script>
