<template>
  <ColumnWrapper>
    <v-text-field
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :rules="validation"
      :value="value"
      :error-messages="errorMessages || errorMessagesLocal"
      @input="$emit('input', $event)"
    />
  </ColumnWrapper>
</template>

<script>
import Base from '@/components/Shared/Form/Elements/Base.js'
import RandExp from 'randexp'
import ColumnWrapper from '@/components/Shared/Form/Elements/formColumnElementSlot.vue'

export default {
  components: {
    ColumnWrapper
  },
  mixins: [Base],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: ''
    },
    persistHint: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: String,
      default: null
    },
    regex: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      validation: [],
      error: false,
      errorMessagesLocal: '',
      regexExample: ''
    }
  },
  watch: {
    value (val) {
      if (this.regex) {
        const regex = new RegExp(this.regex.replace(/^\/+|\/+$/g, ''))

        if (regex.test(val)) {
          this.error = false
          this.errorMessagesLocal = ''
        } else {
          this.error = true
          this.errorMessagesLocal = this.$t('components.shared.messages.patternNotMatch')
        }
      }
    },
    regex () {
      this.setRegexExample()
    }
  },
  methods: {
    setRegexExample () {
      if (this.regex) {
        const regex = new RegExp(this.regex.replace(/^\/+|\/+$/g, ''))
        const exGen = new RandExp(regex)
        exGen.max = 10

        this.regexExample = exGen.gen()
      }
    }
  },
  created () {
    this.setRegexExample()
  }
}
</script>
