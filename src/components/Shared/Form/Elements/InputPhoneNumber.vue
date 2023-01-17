<template>
  <ColumnWrapper>
    <v-text-field
      type="tel"
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :rules="validation"
      :value="value"
      :error-messages="errorMessages"
      @input="$emit('input', $event)"
      v-cleave="{ phone: true, phoneRegionCode: 'US' }"
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
    errorMessages: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    mask: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    persistHint: Boolean
  },
  data () {
    return {
      validation: []
    }
  }
}
</script>
