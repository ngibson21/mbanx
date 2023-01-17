import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/lang/en/index.js'
import enDateTime from '@/lang/en/dateTime.js'

Vue.use(VueI18n)
const messages = {
  en: en
}
const dateTimeFormats = {
  en: enDateTime,
  fr: enDateTime,
  ja: enDateTime
}

const numberFormats = {
  en: {
    currency: {
      style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
    }
  },
  'en-GB': {
    currency: {
      style: 'currency', currency: 'GBP', currencyDisplay: 'symbol'
    }
  },
  fr: {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en',
  messages,
  dateTimeFormats,
  numberFormats
})

export default i18n
