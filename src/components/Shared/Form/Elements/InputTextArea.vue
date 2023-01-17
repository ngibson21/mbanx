<template>
  <ColumnWrapper>
    <v-textarea
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :rules="validation"
      :value="value"
      :error-messages="errorMessages"
      auto-grow
      background-color="quaternary"
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
      validation: []
    }
  }
}
</script>
