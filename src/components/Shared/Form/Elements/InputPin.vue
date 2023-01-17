<template>
  <ColumnWrapper>
    <v-text-field
      :ref="name"
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :rules="validation"
      :value="value"
      :type="showPin ? 'text' : 'password'"
      :append-icon="showPin ? 'visibility' : 'visibility_off'"
      :mask="mask"
      @click:append="changeVisibility"
      @input="$emit('input', $event)"
      :error-messages="errorMessage"
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
    name: {
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
    length: {
      type: Number,
      default: 6
    },
    hint: {
      type: String,
      default: ''
    },
    persistHint: Boolean
  },
  data () {
    return {
      mask: '######',
      errorMessage: '',
      pinRegex: /[0-9]{6}/,
      showPin: false,
      validation: []
    }
  },
  created () {
    if (this.length !== 6) {
      this.pinRegex = new RegExp(`[0-9]{${this.length}}`)

      let newMask = ''
      for (let i = 0; i < this.length; i++) {
        newMask = newMask + '#'
      }
      this.mask = newMask
    }

    this.validation.push(v =>
      this.pinRegex.test(v) || this.$t('components.shared.messages.pinLengthInvalid', { length: this.length })
    )
  },
  methods: {
    changeVisibility () {
      this.showPin = !this.showPin
    },
    pinNotMatch () {
      this.errorMessage = this.$t('components.shared.messages.pinNotMatch')
    }
  }
}
</script>
