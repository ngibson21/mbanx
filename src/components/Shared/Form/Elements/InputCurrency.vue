<template>
  <v-text-field
    hide-details
    v-money="money"
    v-bind="displaySymbol"
    ref="money"
    :class="classStyle"
    :label="$te(label) ? $t(label) : label"
    :rules="rules"
    :value="newValue"
    :disabled="disabled"
    :error-messages="errorMessages"
    @input="$emit('input', formattedValue($event))"
    @change="$emit('change', formattedValue($event))"
    inputmode="decimal"
  />
</template>

<script>
import { VMoney } from 'v-money'
import unformat from '@/utils/vMoney.js'
import {
  sampleNumber,
  getDecimal,
  getThousands,
  getPrecision,
  getCurrencySymbol
} from '@/utils/localizedFormat.js'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    formRefs: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    rules: {
      type: Array,
      default: () => []
    },
    displayCurrency: {
      type: Boolean,
      default: false
    },
    currencyCode: {
      type: String,
      default () {
        return this.$store.state.application.settings.general.mainCurrency
      }
    },
    errorMessages: {
      type: String,
      default: ''
    },
    classStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      money: {
        decimal: getDecimal(this.currencyCode),
        thousands: getThousands(this.currencyCode),
        precision: getPrecision(this.currencyCode)
      },
      newValue: ''
    }
  },
  directives: { money: VMoney },

  beforeMount () {
    this.newValue = this.formattedValue(this.value)
    this.clearValidation()
  },
  computed: {
    displaySymbol () {
      if (!this.displayCurrency) return
      if (isNaN(sampleNumber(this.currencyCode).charAt(0))) {
        return {
          prefix: getCurrencySymbol(this.currencyCode)
        }
      }
      return { suffix: getCurrencySymbol(this.currencyCode) }
    }
  },
  watch: {
    value (newValue) {
      // this function is to workaround v-money reactivity due to it is not working properly
      this.$refs.money.$el.getElementsByTagName('input')[0].value = newValue
      this.newValue = newValue
    }
  },
  methods: {
    clearValidation () {
      if (this.isEmptyObject(this.formRefs)) return
      this.formRefs.form.resetValidation()
    },
    isEmptyObject (obj) {
      return Object.entries(obj).length === 0 && obj.constructor === Object
    },
    formattedValue (newValue) {
      if (typeof newValue === 'string') {
        return unformat(newValue, this.money.precision).toFixed(this.money.precision)
      }
      return newValue.toFixed(this.money.precision)
    }
  }
}
</script>
