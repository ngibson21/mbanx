export default {
  data () {
    return {
      validation: []
    }
  },
  created () {
    if (this.rules) {
      this.rules.map(rule => {
        if (rule instanceof Function) this.validation.unshift(rule)
        else if (rule === 'required') this.validation.unshift(v => !!v || this.$t('components.shared.messages.fieldRequired'))
      })
    }
  }
}
