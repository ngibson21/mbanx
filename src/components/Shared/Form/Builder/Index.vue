<template>
  <v-form ref="form">
    <v-row no-gutters>
      <component
        v-for="(field, index) in schema"
        :form-name="name"
        :ref="field.name"
        :key="index + field.name"
        :is="field.element"
        :value="formData[field.name]"
        :regex="field.regex"
        :error-messages="formErrors[field.name]"
        @input="updateForm(field.name, $event)"
        v-bind="field"
      />
    </v-row>
  </v-form>
</template>

<script>
import InputText from '@/components/Shared/Form/Elements/InputText.vue'
import InputTextArea from '@/components/Shared/Form/Elements/InputTextArea.vue'
import InputSelect from '@/components/Shared/Form/Elements/InputSelect.vue'
import InputMultiSelect from '@/components/Shared/Form/Elements/InputMultiSelect.vue'
import InputDate from '@/components/Shared/Form/Elements/InputDate.vue'
import InputEmail from '@/components/Shared/Form/Elements/InputEmail.vue'
import InputPassword from '@/components/Shared/Form/Elements/InputPassword.vue'
import InputPhoneNumber from '@/components/Shared/Form/Elements/InputPhoneNumber.vue'
import InputPin from '@/components/Shared/Form/Elements/InputPin.vue'
import InputCheckbox from '@/components/Shared/Form/Elements/InputCheckbox.vue'
import InputFile from '@/components/Shared/Form/Elements/InputFile.vue'
import InputRadio from '@/components/Shared/Form/Elements/InputRadio.vue'
import InputZipCode from '@/components/Shared/Form/Elements/InputZipCode.vue'
import EventBus from '@/components/Shared/Form/Elements/eventBus.js'

export default {
  props: {
    name: {
      // Form name is used as key for form element, so they behave correctly
      type: String,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    formErrors: {
      /**
       * {
       *    [field name]: [error message]
       * }
       */
      type: Object,
      default: () => { }
    }
  },
  components: {
    InputText,
    InputTextArea,
    InputSelect,
    InputMultiSelect,
    InputDate,
    InputEmail,
    InputPassword,
    InputPhoneNumber,
    InputCheckbox,
    InputPin,
    InputFile,
    InputRadio,
    InputZipCode
  },
  data () {
    return {
      formData: this.value
    }
  },
  methods: {
    updateForm (fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit('input', this.formData)
    },
    validate () {
      EventBus.$emit('form-validate')
      return this.$refs.form.validate()
    }
  }
}
</script>
