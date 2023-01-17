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
      validate-on-blur
      @input="$emit('input', $event)"
    />
  </ColumnWrapper>
</template>

<script>
import Base from '@/components/Shared/Form/Elements/Base.js'
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
    }
  },
  data () {
    return {
      validation: [
        v => /^\d{5}(?:[-\s]\d{4})?$/.test(v) || this.$t('components.shared.messages.patternNotMatch')
      ],
      error: false,
      errorMessagesLocal: ''
    }
  }
}
</script>
