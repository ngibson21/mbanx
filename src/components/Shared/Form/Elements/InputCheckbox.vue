<template>
  <ColumnWrapper :md="6">
    <v-checkbox
      :label="$te(label) ? $t(label) : label"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :rules="validation"
      v-model="checked"
      @change="$emit('input', $event)"
      class="pr-4"
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
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: Boolean,
    rules: {
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
      checked: this.value,
      validation: []
    }
  },
  created () {
    if (this.hint) this.persistHint = true
  }
}
</script>
