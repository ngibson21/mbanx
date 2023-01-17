<template>
  <div class="pb-8" v-if="currentStep.groupName && stepToDisplay.length > 0">
    <v-divider />
    <div class="d-flex justify-center pt-5">
      <div v-for="step of stepToDisplay" :key="step.stepName" class="flex-grow-1 text-center px-5">
        <p class="text-h6">
          {{ step.stepName }}
        </p>
        <v-progress-linear :value="(step.totalCompletedSubStep / step.totalSubStep) * 100" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    configuration () {
      return this.$store.state.registration.configuration
    },
    currentStep () {
      return this.$store.getters['registration/currentStep']
    },
    steps () {
      return this.configuration
        .map(step => step.groupName)
        .reduce((steps, stepName) => {
          if (stepName && stepName !== '') {
            const existingStepIndex = steps.findIndex(v => v.stepName === stepName)

            if (existingStepIndex >= 0) {
              steps[existingStepIndex].totalSubStep += 1
            } else {
              steps.push({
                stepName,
                totalSubStep: 1,
                totalCompletedSubStep: 0
              })
            }
          }
          return steps
        }, [])
    },
    stepToDisplay () {
      const result = this.steps

      this.configuration.find(step => {
        const isCurrentStep = (step.stepId === this.currentStep.stepId)

        if (!isCurrentStep) {
          this.steps.map(({ stepName }, index) => {
            if (stepName === step.groupName) result[index].totalCompletedSubStep += 1
          })
        }

        return isCurrentStep
      })

      return result
    }
  }
}
</script>
