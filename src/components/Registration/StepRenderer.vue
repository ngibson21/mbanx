<template>
  <div v-if="!resetting">
    <slot name="top" />
    <div class="text-h4 primary--text font-weight-bold mb-4 px-6">
      {{ schema.stepName }}
    </div>
    <div v-if="schema.stepDescription" class="px-6 mb-4">
      {{ schema.stepDescription }}
    </div>
    <v-card v-for="row of totalRow" :key="row" class="py-4 px-6 mt-4 mb-4 rounded-lg" elevation="2">
      <div v-for="section of schema.sections" :key="section.sectionNumber">
        <div class="text-h6 primary--text font-weight-bold mb-2">
          {{ section.title }}
        </div>
        <form-creator
          :name="`form_${row}_section_${section.sectionNumber}`"
          :ref="section.sectionNumber"
          :value="getFormModel(row)"
          :schema="section.schema"
          :form-errors="getFormErrorModel(section.schema)"
          @input="updateValue"
        />
      </div>
      <div class="d-flex justify-end" v-if="row !== 1 || totalRow > 1">
        <v-btn
          text
          icon
          color="accent"
          @click="deleteRow"
        >
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <div class="px-6">
      <v-btn
        text
        icon
        color="success"
        v-if="step.isMultiRow" @click="addRow"
      >
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import FormCreator from '@/components/Shared/Form/Builder/Index.vue'
import stepCreator from '@/components/Registration/stepCreator.js'
import { formErrorsModel } from '@/components/Shared/Form/Builder/errorHandling.js'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    step: {
      type: Object,
      required: true
    }
  },
  components: {
    FormCreator
  },
  data () {
    return {
      schema: {},
      formError: {},
      totalRow: 1,
      resetting: false
    }
  },
  watch: {
    step (newStep, oldStep) {
      if (newStep.position !== oldStep.position) { this.reset() }
    }
  },
  methods: {
    async configToSchema () {
      await this.$store.dispatch('registration/getStepConfiguration', this.step.position)
      this.schema = stepCreator(this.step)
      this.schema.sections = this.schema.sections.filter(section => section.schema.length > 0)
    },
    getFormErrorModel (schema) {
      return formErrorsModel(schema)
    },
    validate () {
      const formsValidity = this.schema.sections.map(({ sectionNumber }) => {
        return this.$refs[sectionNumber][0].validate()
      })

      return formsValidity.reduce((acc, val) => (acc && val), true)
    },
    updateValue () {
      this.$emit('input', this.value)
    },
    addRow () {
      this.totalRow += 1
      this.value[`stepId${this.schema.stepId}`].push({})
    },
    deleteRow () {
      this.totalRow -= 1
      this.value[`stepId${this.schema.stepId}`].pop()
    },
    getFormModel (row) {
      if (this.step.isMultiRow) return this.value[`stepId${this.schema.stepId}`][row - 1]

      return this.value
    },
    async reset () {
      this.resetting = true
      try {
        await this.configToSchema()
        this.totalRow = 1

        if (this.step.isMultiRow) {
          if (!this.value[`stepId${this.schema.stepId}`]) {
            this.value[`stepId${this.schema.stepId}`] = [{}]
            this.updateValue()
          }
          this.totalRow = this.value[`stepId${this.schema.stepId}`].length
        }
      } catch (e) {
        throw e
      } finally {
        this.resetting = false
      }
    }
  },
  mounted () {
    this.reset()
  }
}
</script>
