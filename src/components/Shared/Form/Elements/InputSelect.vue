<template>
  <ColumnWrapper>
    <v-autocomplete
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :rules="validation"
      :no-data-text="noDataText"
      :items="options"
      :value="value"
      :hint="hint"
      :persistent-hint="persistHint"
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
    options: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      persistHint: false,
      noDataText: this.$t('components.shared.messages.noData'),
      validation: []
    }
  },
  created () {
    if (this.hint) this.persistHint = true
  }
}
</script>
