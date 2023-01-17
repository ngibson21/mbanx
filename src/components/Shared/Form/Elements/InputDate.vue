<template>
  <ColumnWrapper>
    <v-dialog
      ref="menu"
      :close-on-content-click="false"
      v-model="menu"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-on="on"
          v-model="date"
          :label="$t(label)"
          :prepend-icon="prepend"
          :append-icon="append"
          :rules="validation"
          readonly
          :hint="hint"
          :persistent-hint="persistHint"
        />
      </template>
      <v-date-picker
        ref="picker"
        :locale="locale"
        v-model="date"
        :type="type"
        no-title
        scrollable
        @input="$emit('input', $event)"
        :min="minDate"
        :max="maxDate"
        @change="save"
      />
    </v-dialog>
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
    minDate: {
      type: String,
      default: ''
    },
    maxDate: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    prepend: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    },
    locale: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['month', 'date'].includes(value)
      }
    },
    hint: {
      type: String,
      default: ''
    },
    persistHint: Boolean
  },
  data () {
    return {
      date: this.value,
      menu: false,
      modal: false,
      validation: []
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
