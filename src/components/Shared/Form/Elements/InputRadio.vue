<template>
  <ColumnWrapper>
    {{ $te(label) ? $t(label) : label }}
    <v-radio-group
      :value="value"
      mandatory
      @change="$emit('input', $event)"
    >
      <div class="d-flex">
        <div v-for="option in options" :key="option.value" class="flex-grow-1">
          <v-radio
            :label="`${option.text}`"
            :value="options.value"
          />
        </div>
      </div>
    </v-radio-group>
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
      type: [String, Number],
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
