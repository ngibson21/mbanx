<template>
  <ColumnWrapper>
    <v-text-field
      :autofocus="autofocus"
      :label="$te(label) ? $t(label) : label"
      :placeholder="$t(placeholder)"
      :hint="$t(hint)"
      :persistent-hint="persistHint"
      :error-messages="errorMessages"
      :rules="validation"
      :value="value"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
      @click:append="changeVisibility"
      @input="$emit('input', $event)"
      :autocomplete="autocomplete"
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
    persistHint: Boolean,
    autofocus: Boolean,
    autocomplete: {
      type: String,
      default: () => 'off'
    },
    errorMessages: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPassword: false,
      validation: [],
      policy: null
    }
  },
  methods: {
    changeVisibility () {
      this.showPassword = !this.showPassword
    }
  },
  async created () {
    await this.$store.dispatch('user/getPasswordPolicy')
    this.policy = this.$store.state.user.details.PasswordValidationPolicies[0]
    this.validation.push(v => new RegExp(this.policy?.regex).test(v) || this.policy.description)
  }
}
</script>
