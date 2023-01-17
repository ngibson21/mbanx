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
      multiple
      chips
      clearable
      deletable-chips
      @input="$emit('input', $event)"
    />
  </ColumnWrapper>
</template>

<script>
import ColumnWrapper from '@/components/Shared/Form/Elements/formColumnElementSlot.vue'

export default {
  components: {
    ColumnWrapper
  },
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
      type: Array,
      default: () => []
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

    if (this.rules) {
      this.rules.map(rule => {
        if (rule instanceof Function) this.validation.push(rule)
        else if (rule === 'required') {
          this.validation.push(v => {
            return v.length > 0 || this.$t('components.shared.messages.fieldRequired')
          })
        }
      })
    }
  }
}
</script>
