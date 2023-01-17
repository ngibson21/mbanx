import i18n from '@/plugins/i18n.js'

export default {
  props: {
    parentFormData: {
      type: Object,
      required: true
    },
    focusedField: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formRules: {
        maxLength: (value, length) => {
          if (value && value.toString().length <= length) return true
          return i18n.t('components.transfers.creation.maxLength', { length })
        },
        required: value => !!value || i18n.t('components.transfers.creation.required'),
        email: value => {
          const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return emailRegex.test(value) || i18n.t('components.transfers.creation.invalidEmail')
        }
      }
    }
  },
  methods: {
    valueChanged () {
      this.$emit('data-changed', this.formData)
    },
    isFocusedField (fieldName) {
      return fieldName === this.focusedField
    }
  },
  created () {
    Object.keys(this.$data.formData).map(field => {
      if (!this.parentFormData[field]) return
      this.$data.formData[field] = this.parentFormData[field]
    })
  }
}
